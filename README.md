# SMG Secure Microgrid — Paper Artifacts

Manuscript source, case-study documentation, and raw bench-trial measurement data for:

> R. Campos-Sanchez, L. Hernandez-Martinez, C. Feregrino-Uribe, A. Penuelas-Angulo, D. Cruz-Aguilar. *Closing the Security Activation Gap: A Security-by-Design Methodology for IoT Ecosystems and Its Empirical Validation in a DC Smart Microgrid.* Submitted to *Computers & Security* (Elsevier).

Companion implementation (ESP32 secondary-agent firmware + RPi4 primary-agent software): <https://github.com/RazielCS/smg-secure-microgrid>

## Contents

| Path | Contents |
|---|---|
| `Article/` | Manuscript LaTeX source (`main.tex`, `references.bib`, `figures/`), compiled `main.pdf`, and the expert-validation instruments: questionnaire (EN/ES), the condensed reference document distributed to evaluators (`expert_overview`), and the Google-Apps-Scripts that generated the forms |
| `case study SMG/case_study_SMG.md` | Full case-study documentation: stage-by-stage traceability, identity model, protocol phases, measurements, OWASP analysis |
| `case study SMG/measurements/` | Raw bench-trial data backing the paper's Table 9 (see data map below) |
| `ERRATA.md` | Remediation log documenting the pre-submission review: data-provenance corrections, quarantines, and limitation disclosures applied to the manuscript |
| `phase3_plan.md` | Pre-execution bench-trial plan (2026-06-20). The planned 3-node / 1-hour configuration was **never executed**; the paper reports the 2-node bench trials that were actually run (see `ERRATA.md` items C1-C2) |

## Measurement data map (paper Table 9 provenance)

**Canonical CSVs — the data reported in the paper's Table 9:**

| Paper column | Source |
|---|---|
| NODE_01 (120 bench sends) | `case study SMG/measurements/NODE_01_run_rec/methodology.csv` |
| NODE_02 (196 pooled sends: 108 + 88) | `case study SMG/measurements/NODE_02_run_1/methodology.csv` + `NODE_02_run_2/methodology.csv` |
| Chain integrity / security errors | `case study SMG/measurements/server_log.txt` (P6 server-side audit) |
| NODE_02 pooling formulas | Paper Table 9 caption; `CROSS_BOARD_SUMMARY.md` |

**Provenance and remediation records:**

- `measurements/README.md` — PC-client (CPython) bench-test provenance: the P4 lock-contention root-cause analysis cited in the paper's CSQ3 discussion. Retained for audit; **not** ESP32 data.
- `CROSS_BOARD_SUMMARY.md` — cross-board comparison from the canonical runs.
- `EXECUTION_PLAN.md`, `phase1_results.md`, `bench_test_session_status_2026-07-10.md` — bench execution, firmware-fix, and power-dependency session records.
- `projected/_superseded_synthetic/` — synthetic placeholder datasets from an early draft, quarantined; **not measurements** (see `ERRATA.md` C1).
- `archive_20260714/` — invalidated pre-calibration runs, retained for audit (see `ERRATA.md` S6).
- `node02_frozen_firmware/` — the exact frozen-firmware snapshot that produced the bench CSVs.
- Packet captures: `NODE_01_run_rec/traffic.pcap`, `NODE_02_run_3/traffic.pcap` (crashed run, no CSV), `SIMUL_run_1/traffic.pcap` (concurrent run, excluded from averages — CSV under `SIMUL_run_1/NODE_02/`).
- Root-level development CSVs from the bring-up iterations were intentionally excluded from this published set; every number in the paper traces to the canonical CSVs above.

## Expert validation

The questionnaire instruments (EN/ES), the evaluator reference document (`Article/expert_overview.*`), and the form-generation scripts are published here. **Raw per-evaluator responses are withheld** to honor the anonymity requests of six of the fourteen evaluators; aggregate statistics are reported in the paper (Section 6.5, Table 7).

## Security notes

- All node secrets (`node_key`, `node_salt`, WiFi credentials) were provisioned to ESP32 NVS at deployment time and are **absent from all published files**; every published `config.json` contains placeholders only.
- `node02_frozen_firmware/boot.py` configures a bench-mode debug access point with a lab-only bring-up credential; it is not a deployment secret.

## License

To be confirmed by the authors (the companion code repository is Apache-2.0).
