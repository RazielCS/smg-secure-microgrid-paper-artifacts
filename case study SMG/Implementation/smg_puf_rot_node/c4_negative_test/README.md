# C4 negative test: physical NVS cloning across chips

**Date:** 2026-10-07
**Question:** does copying a device's entire NVS (PUF helper data, server reference) onto a *different physical ESP32* let that second chip impersonate the original device?

## Method

1. Dumped SMG_NODE_01's NVS partition (`0x9000`, 0x50000 bytes) via `esptool read_flash` (read-only; no change to SMG_NODE_01). MAC confirmed: `f0:24:f9:45:13:a8`.
2. Backed up SMG_NODE_02's own NVS the same way before touching it. MAC confirmed: `08:d1:f9:d3:02:e8` (a genuinely different physical chip from NODE_01).
3. Flashed the `smg_puf_rot_node` firmware onto SMG_NODE_02 (it had none previously; at the time of this test, WiFi credentials were still a compile-time firmware constant -- later moved to NVS provisioning, see the paper's Limitations -- so both nodes already shared the same value from this build), then overwrote its NVS partition with SMG_NODE_01's dump verbatim — i.e. SMG_NODE_02 now held SMG_NODE_01's `mask_A`/`ecc_A` helper data, `id_a`, and pinned server reference (`id_b`/`V_B`), on different silicon.
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

## Re-run: 2026-10-15, after the reliability-gate fix

The original run above used the library's unrelaxed raw-bit-error-rate threshold (0.15%), which
was later found to be a non-security diagnostic rather than a pass/fail gate and relaxed
accordingly (see the main paper's Section on RoT verifiability and Limitations, and the code
repository's `components/esp32_puflib/README.md`). This test was repeated against the corrected
firmware to confirm the security outcome is unchanged.

**Method:** same procedure as above, with fresh dumps taken for this run (the original run's
dumps were deleted per step 5 above, consistent with this project's secret-handling policy):
SMG_NODE_01's NVS was dumped again (its enrollment is unchanged since the original run, so the
response length is the same 422 bytes the current bench round reports -- the 421-byte figure
in the original run above reflects an earlier enrollment, since superseded; see the main
paper's PUF-reliability Limitations bullet for that history), and SMG_NODE_02's own NVS was
backed up again before being overwritten. The firmware flashed onto SMG_NODE_02 before the
clone-and-reset was the corrected build (hamming-weight-only local gate). Repeated across 4
separate resets of the cloned device during this validation, not just one.

**Result:** under the corrected firmware, the device's local gate no longer rejects the
measurement outright: `get_puf_response` passes the hamming-weight sanity check on the first
attempt (no retry needed) and proceeds despite a 29.8% raw error rate, exactly as the relaxed
gate is designed to do --- `errors=29.831% [9775 bits] above the 0.15% diagnostic figure,
proceeding anyway`. The device then completes server authentication (again expected, since
`V_B`/`id_b` are a direct copy) but is rejected identically to the original run:

- Device log: `E (5174) rot_session: handshake: device authentication rejected by server`
- Server log (4/4 reset attempts): `device authentication FAILED (signature invalid)
  node=SMG_NODE_01`

Relaxing the local diagnostic changed *when* the device finds out it is wrong (now locally
accepted, previously locally rejected on the first attempt and accepted after a 29.8%-error
retry that was never actually checked) but did not change the outcome: the server's ECDSA
verification is, and was, the only check that actually determines whether a reconstruction is
accepted. Raw logs: `device_log_smg_node02_with_stolen_smg_node01_nvs_20261015.txt`,
`server_log_20261015.txt`.
