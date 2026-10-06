# case study SMG/Implementation

Raw data and measurement scripts for the PUF-based Root of Trust redesign's real-hardware
validation (paper Section "PUF-Based Root of Trust: Real-Hardware Validation (SMG_NODE_01)").
The firmware and server **source code** that produced this data lives in the companion code
repository (https://github.com/RazielCS/smg-secure-microgrid, `smg_puf_rot_node/` and the
PUF-related files in `smg_primary_server/`), not here — this repository holds artifacts
(data, manuscript, errata), not implementation source, per the overall Materials
Availability split.

- `smg_puf_rot_node/bench_results_20261005/` — the N=30 hard-reset bench round reported in
  the paper (2026-10-06): raw per-trial serial logs (`logs/run_0001.log`–`run_0030.log`),
  the parsed `summary.csv`, the bench script (`run_bench.py`), and the server-side log
  captured during the run (`server_log_20261005.txt`).

An earlier (2026-10-02) N=30 round exists but is **not published here**: a firmware debug
print active at the time (removed 2026-10-05, see `ERRATA.md` item PR-m2) recorded the
node's real session verifier in its raw serial logs — a value that, as of this repository
update, is still the one pinned on the live device. That round is superseded (its numbers
are not the ones reported in the paper) and is retained only in the authors' private
working copy for internal audit purposes.

See `../../ERRATA.md` (Section F) for the full remediation history, and the companion code
repository's `smg_puf_rot_node/README.md` for build/flash/provisioning/reproduction
instructions.
