# case study SMG/Implementation

Raw data and measurement scripts for the PUF-based Root of Trust's real-hardware validation
(paper Section "CSQ3: Root of Trust Verifiability"). The firmware and server **source code**
that produced this data lives in the companion code repository
(https://github.com/RazielCS/smg-secure-microgrid, `smg_puf_rot_node/` and the PUF-related
files in `smg_primary_server/`), not here — this repository holds artifacts (data,
manuscript, errata), not implementation source, per the overall Materials Availability split.

- `smg_puf_rot_node/bench_results_20261016_hdm2/` — the $N=30$ hard-reset bench round reported
  in the paper: raw per-trial serial logs (`logs/run_0001.log`-`run_0030.log`), the parsed
  `summary.csv`, and the bench script (`run_bench.py`). Collected on SMG_NODE_01 after
  re-enrolling under firmware where the helper-data-manipulation (HDM) mitigation's hash binding
  was extended to cover all four stable-bit-mask/ECC helper-data blobs (both the first-attempt/RTC
  pair and the deep-sleep-retry pair), after a review found the first-generation binding covered
  only the first pair (see the code repository's
  `smg_puf_rot_node/components/esp32_puflib/README.md`) — this change derives a new key pair, so
  a fresh enrollment was required: 30/30 success, every trial on the first attempt. Also
  includes `reenrollment/` (serial log of the enrollment itself, plus NVS-dump evidence
  confirming no `PUF_FREQUENCY` entry remained in the "Written" state afterward),
  `hash_coverage_tamper_test/` (a direct single-bit-flip test on each of the two deep-sleep-retry
  blobs, confirming both are bound into the derived key: 2/2 rejected), and `ft06/` (a fourth
  cross-chip cloning re-run against this new identity, 3/3 rejected).
- `smg_puf_rot_node/bench_results_20261015_hdm/` — the $N=30$ round immediately before the one
  above: same `PUF_FREQUENCY` fix, but the first-generation (two-blob) HDM binding. 30/30
  success, every trial on the first attempt; superseded once the HDM binding was extended to all
  four blobs, which required re-enrollment again, kept for provenance.
- `smg_puf_rot_node/bench_results_20261015_fixed/` — the $N=30$ round immediately before the one
  above: same relaxed reliability gate, but the pre-HDM-mitigation identity. 30/30 success,
  every trial on the first attempt; superseded once the HDM mitigation required re-enrollment,
  kept for provenance.
- `smg_puf_rot_node/bench_results_20261015/` — an intermediate $N=30$ round collected under the
  original, unrelaxed gate immediately before the fix above: 0/30 success (all trials timed
  out), kept as the negative-result evidence motivating that fix.
- `smg_puf_rot_node/bench_results_20261013/` — an earlier $N=30$ round, forward-secrecy
  (ephemeral ECDH) already added but the gate above not yet enforced on the retry path;
  superseded by the round above, kept for provenance.
- `smg_puf_rot_node/bench_results_20261005/` — an earlier $N=30$ round under the pre-forward-secrecy
  protocol, superseded by the rounds above; kept for provenance, not cited as current evidence.
- `smg_puf_rot_node/c4_negative_test/` — the cross-chip NVS-cloning negative test
  (FT-06 in the paper): device and server logs, and a README describing the method and result
  across all four firmware generations it was run against (11/11 rejected).

See the companion code repository's `smg_puf_rot_node/README.md` for build/flash/
provisioning/reproduction instructions.
