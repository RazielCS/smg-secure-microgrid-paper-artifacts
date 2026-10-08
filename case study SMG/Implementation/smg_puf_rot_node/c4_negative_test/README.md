# C4 negative test: physical NVS cloning across chips

**Date:** 2026-10-07
**Question:** does copying a device's entire NVS (PUF helper data, server reference) onto a *different physical ESP32* let that second chip impersonate the original device?

## Method

1. Dumped SMG_NODE_01's NVS partition (`0x9000`, 0x50000 bytes) via `esptool read_flash` (read-only; no change to SMG_NODE_01). MAC confirmed: `f0:24:f9:45:13:a8`.
2. Backed up SMG_NODE_02's own NVS the same way before touching it. MAC confirmed: `08:d1:f9:d3:02:e8` (a genuinely different physical chip from NODE_01).
3. Flashed the `smg_puf_rot_node` firmware onto SMG_NODE_02 (it had none previously; WiFi credentials are a compile-time firmware constant, so both nodes already shared the same value from this build), then overwrote its NVS partition with SMG_NODE_01's dump verbatim — i.e. SMG_NODE_02 now held SMG_NODE_01's `mask_A`/`ecc_A` helper data, `node_uuid`, and pinned server reference (`id_b`/`V_B`), on different silicon.
4. Started `rot_challenge_service.py` on the RPi4 and reset SMG_NODE_02, capturing both the device's serial boot log and the server's log.
5. Restored SMG_NODE_02's original NVS from the step-2 backup afterward. The raw NVS dumps themselves (containing real server verifiers) were deleted after the test, consistent with this project's secret-handling policy; only the boot/server logs are kept.

## Result

- Attempt 1: `get_puf_response` failed the library's own reliability threshold outright — `hw=50.177% (need >48.5%), errors=29.880% (need <0.15%)` — applying NODE_01's helper data to NODE_02's physical RTC-SRAM produced close to 30% raw bit errors, two orders of magnitude over the library's acceptance threshold.
- Attempt 2 (automatic retry) passed the library's statistical check and produced a 421-byte response — but on different silicon, which the library's own enrollment-length distribution (Limitations, main paper) already shows is chip-dependent.
- The device then completed server authentication (expected: `V_B`/`id_b` are a direct copy of NODE_01's, so that half is unaffected by which chip is running), but the server **rejected the device's ECDSA proof**:
  - Device log: `E rot_session: handshake: device authentication rejected by server`
  - Server log: `device authentication FAILED (signature invalid) node=SMG_NODE_01`

The (sk_A, pk_A) key pair HKDF-derived from SMG_NODE_02's physical reconstruction of "NODE_01's" PUF response does not match the public key SMG_NODE_01 itself registered, because the PUF response is a property of the specific silicon, not of the helper data alone. The server's registered public key therefore rejects the signature. **Physically cloning a device's entire NVS onto different hardware does not allow impersonation under this scheme.**

This confirms the claim in OWASP I9 (Table~`tab:owasp_b`, main paper) and the Spoofing residual-risk rating (Table~`tab:stride_a`) that forging a device's identity requires the enrolled chip's own physical PUF response, not just its stored helper data.
