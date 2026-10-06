#!/usr/bin/env python3
"""
Repeated hard-reset bench trial for the PUF/RoT handshake on the real ESP32
(SMG_NODE_01). For each iteration: reset the chip via RTS/DTR (same sequence
esptool uses for a "hard reset", no bootloader entry), capture the full
serial log for a bounded window, parse out every PUF reconstruction attempt
(success/failure + hw%/errors% diagnostic when it fails) and every handshake
phase timestamp (ms since boot, from the ESP-IDF log prefix), then append one
row to summary.csv. The complete raw serial log for every single run is also
kept (logs/run_XXXX.log) so the underlying data is fully re-analyzable later,
not just the derived summary row.

Usage: python run_bench.py --port COM5 --runs 30
"""
import argparse
import csv
import json
import os
import re
import time
from datetime import datetime, timezone

import serial

LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logs")
SUMMARY_CSV = os.path.join(os.path.dirname(os.path.abspath(__file__)), "summary.csv")

TS_RE = re.compile(r"^[IEW] \((\d+)\)")
RECON_OK_RE = re.compile(r"PUF response reconstructed \((\d+) bytes\)")
RECON_FAIL_RE = re.compile(
    r"get_puf_response: FAILED thresholds -- hw=([\d.]+)% \(need >([\d.]+)%\), "
    r"errors=([\d.]+)% \[(\d+) bits\] \(need <([\d.]+)%\)"
)
SHS_A_RE = re.compile(r"shs_a_ref=([0-9a-f]+)")
WIFI_CONNECTING_RE = re.compile(r"connecting to SSID")
WIFI_CONNECTED_RE = re.compile(r"wifi_station: connected")
SERVER_CONNECTED_RE = re.compile(r"connected to server")
SERVER_AUTH_RE = re.compile(r"handshake: server authenticated")
DEVICE_AUTH_RE = re.compile(r"handshake: device authenticated, session established")
SESSION_OK_RE = re.compile(r"mutual authentication OK, session key derived")
DEMO_SENT_RE = re.compile(r"demo encrypted message sent")
HANDSHAKE_FAIL_RE = re.compile(r"Root of Trust handshake FAILED")
DEVICE_REJECTED_RE = re.compile(r"device authentication rejected by server")


def hard_reset(ser):
    ser.setDTR(False)
    ser.setRTS(True)
    time.sleep(0.1)
    ser.setRTS(False)


def parse_run(lines):
    row = {
        "puf_bytes": None,
        "reconstruction_attempts": 0,
        "reconstruction_failures": [],
        "shs_a_ref": None,
        "t_wifi_connecting_ms": None,
        "t_wifi_connected_ms": None,
        "t_server_connected_ms": None,
        "t_server_auth_ms": None,
        "t_device_auth_ms": None,
        "t_session_ok_ms": None,
        "t_demo_sent_ms": None,
        "result": "TIMEOUT",
    }
    for line in lines:
        m = TS_RE.match(line)
        ts = int(m.group(1)) if m else None

        if RECON_FAIL_RE.search(line):
            fm = RECON_FAIL_RE.search(line)
            row["reconstruction_attempts"] += 1
            row["reconstruction_failures"].append({
                "hw_pct": float(fm.group(1)), "hw_threshold_pct": float(fm.group(2)),
                "errors_pct": float(fm.group(3)), "error_bits": int(fm.group(4)),
                "errors_threshold_pct": float(fm.group(5)),
            })
        if RECON_OK_RE.search(line):
            row["reconstruction_attempts"] += 1
            row["puf_bytes"] = int(RECON_OK_RE.search(line).group(1))
        if SHS_A_RE.search(line):
            row["shs_a_ref"] = SHS_A_RE.search(line).group(1)
        if WIFI_CONNECTING_RE.search(line) and ts is not None:
            row["t_wifi_connecting_ms"] = ts
        if WIFI_CONNECTED_RE.search(line) and ts is not None:
            row["t_wifi_connected_ms"] = ts
        if SERVER_CONNECTED_RE.search(line) and ts is not None:
            row["t_server_connected_ms"] = ts
        if SERVER_AUTH_RE.search(line) and ts is not None:
            row["t_server_auth_ms"] = ts
        if DEVICE_AUTH_RE.search(line) and ts is not None:
            row["t_device_auth_ms"] = ts
        if SESSION_OK_RE.search(line) and ts is not None:
            row["t_session_ok_ms"] = ts
        if DEMO_SENT_RE.search(line) and ts is not None:
            row["t_demo_sent_ms"] = ts
            row["result"] = "SUCCESS"
        if HANDSHAKE_FAIL_RE.search(line):
            row["result"] = "HANDSHAKE_FAIL_DEVICE_REJECTED" if row.get("_rejected") else "HANDSHAKE_FAIL"
        if DEVICE_REJECTED_RE.search(line):
            row["_rejected"] = True

    row.pop("_rejected", None)
    row["reconstruction_failures"] = json.dumps(row["reconstruction_failures"])

    # Derived latencies (None-safe)
    def delta(a, b):
        return (row[b] - row[a]) if (row[a] is not None and row[b] is not None) else None

    row["wifi_connect_latency_ms"] = delta("t_wifi_connecting_ms", "t_wifi_connected_ms")
    row["server_to_session_latency_ms"] = delta("t_server_connected_ms", "t_session_ok_ms")
    row["session_to_demo_latency_ms"] = delta("t_session_ok_ms", "t_demo_sent_ms")
    return row


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", default="COM5")
    ap.add_argument("--baud", type=int, default=115200)
    ap.add_argument("--runs", type=int, default=30)
    ap.add_argument("--window", type=float, default=6.0, help="seconds to capture per run")
    args = ap.parse_args()

    os.makedirs(LOG_DIR, exist_ok=True)
    new_file = not os.path.isfile(SUMMARY_CSV)

    ser = serial.Serial(args.port, args.baud, timeout=0.2)
    time.sleep(0.3)
    ser.reset_input_buffer()

    fieldnames = None
    for i in range(1, args.runs + 1):
        ser.reset_input_buffer()
        hard_reset(ser)

        t0 = time.time()
        raw_lines = []
        buf = b""
        settle_until = None
        while time.time() - t0 < args.window:
            chunk = ser.read(4096)
            if chunk:
                buf += chunk
                while b"\n" in buf:
                    line, buf = buf.split(b"\n", 1)
                    text = line.decode("utf-8", errors="replace").rstrip("\r")
                    raw_lines.append(text)
                    if DEMO_SENT_RE.search(text) or HANDSHAKE_FAIL_RE.search(text):
                        settle_until = time.time() + 0.3  # drain any trailing lines briefly
            if settle_until is not None and time.time() > settle_until:
                break

        run_id = f"{i:04d}"
        log_path = os.path.join(LOG_DIR, f"run_{run_id}.log")
        with open(log_path, "w", encoding="utf-8") as f:
            f.write("\n".join(raw_lines) + "\n")

        row = parse_run(raw_lines)
        row["run_id"] = run_id
        row["timestamp_utc"] = datetime.now(timezone.utc).isoformat()
        row["raw_log"] = os.path.relpath(log_path, os.path.dirname(SUMMARY_CSV))

        if fieldnames is None:
            fieldnames = ["run_id", "timestamp_utc", "result", "puf_bytes",
                          "reconstruction_attempts", "reconstruction_failures",
                          "shs_a_ref", "wifi_connect_latency_ms",
                          "server_to_session_latency_ms", "session_to_demo_latency_ms",
                          "t_wifi_connecting_ms", "t_wifi_connected_ms",
                          "t_server_connected_ms", "t_server_auth_ms",
                          "t_device_auth_ms", "t_session_ok_ms", "t_demo_sent_ms",
                          "raw_log"]

        write_header = new_file and i == 1
        with open(SUMMARY_CSV, "a", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=fieldnames)
            if write_header:
                w.writeheader()
            w.writerow({k: row.get(k) for k in fieldnames})

        print(f"run {run_id}: result={row['result']} puf_bytes={row['puf_bytes']} "
              f"attempts={row['reconstruction_attempts']} "
              f"handshake_ms={row['server_to_session_latency_ms']}")

    ser.close()
    print(f"\nDone. Summary: {SUMMARY_CSV}")
    print(f"Raw per-run logs: {LOG_DIR}")


if __name__ == "__main__":
    main()
