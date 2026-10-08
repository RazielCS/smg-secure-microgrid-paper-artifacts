# case study SMG/Implementation

Raw data and measurement scripts for the PUF-based Root of Trust's real-hardware validation
(paper Section "CSQ3: Root of Trust Verifiability"). The firmware and server **source code**
that produced this data lives in the companion code repository
(https://github.com/RazielCS/smg-secure-microgrid, `smg_puf_rot_node/` and the PUF-related
files in `smg_primary_server/`), not here — this repository holds artifacts (data,
manuscript, errata), not implementation source, per the overall Materials Availability split.

- `smg_puf_rot_node/bench_results_20261005/` — the $N=30$ hard-reset bench round reported in
  the paper: raw per-trial serial logs (`logs/run_0001.log`-`run_0030.log`), the parsed
  `summary.csv`, the bench script (`run_bench.py`), and the server-side log captured during
  the run.
- `smg_puf_rot_node/c4_negative_test/` — the cross-chip NVS-cloning negative test
  (FT-06 in the paper): device and server logs, and a README describing the method and result.

See `../../ERRATA.md` for the full remediation history, and the companion code repository's
`smg_puf_rot_node/README.md` for build/flash/provisioning/reproduction instructions.
