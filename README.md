# SMG Secure Microgrid — Paper Artifacts

Manuscript source, case-study documentation, and raw bench-trial measurement data for:

> R. Campos-Sanchez, L. Hernandez-Martinez, C. Feregrino-Uribe, A. Penuelas-Angulo, D. Cruz-Aguilar. *Closing the Security Activation Gap: A Security-by-Design Methodology for IoT Ecosystems and Its Empirical Validation in a DC Smart Microgrid.* Submitted to *Computers & Security* (Elsevier).

Companion implementation (ESP32 secondary-node firmware + RPi4 primary-agent software): <https://github.com/RazielCS/smg-secure-microgrid>

## Contents

| Path | Contents |
|---|---|
| `Article/` | Manuscript LaTeX source (`main.tex`, `supplementary_material.tex`, `references.bib`, `figures/`), compiled PDFs, and the expert-validation instruments: questionnaire (EN/ES), the reference document distributed to evaluators (`expert_overview`), and the Google Apps Scripts that generated the forms |
| `case study SMG/Implementation/` | Raw bench-trial data for the PUF-based Root of Trust's real-hardware validation (see its own `README.md`) |

## Bench-trial data

The $N=30$ real hard-reset bench round reported in the paper's Table "PUF-based RoT
real-hardware bench trial" (Section "CSQ3: Root of Trust Verifiability") is at
`case study SMG/Implementation/smg_puf_rot_node/bench_results_20261016_hdm2/`: raw per-trial
serial logs, the parsed `summary.csv`, and the bench script. This round is for SMG_NODE_01 only.
Five earlier rounds on SMG_NODE_01 (`bench_results_20261015_hdm/`, `bench_results_20261015_fixed/`,
`bench_results_20261015/`, `bench_results_20261013/`, `bench_results_20261005/`) are superseded
and kept for provenance — see `case study SMG/Implementation/README.md` for what changed between
rounds.

A separate, independent $N=30$ round on SMG_NODE_02 — the SMG's second physical node, registered
and validated after a per-device-identifier provisioning gap was closed (paper Limitations) — is
at `bench_results_20261019_node02/`; it uses a firmware build several days newer than
`bench_results_20261016_hdm2/` and is not intended to be read as the same dataset, only as
independent cross-chip confirmation of the same reliability profile (see the paper's Limitations
for the exact comparison).

The cross-chip NVS-cloning negative test (Table "Functional test results", FT-06) is at
`case study SMG/Implementation/smg_puf_rot_node/c4_negative_test/`.

## Expert validation

The questionnaire instruments (EN/ES), the evaluator reference document
(`Article/expert_overview.*`), and the form-generation scripts are published here. **Raw
per-evaluator responses are withheld** to honor the anonymity requests of six of the fourteen
evaluators; aggregate statistics are reported in the paper (Section "Expert Validation").

## Security notes

- Device and server secrets (PUF verifiers, NVS images, WiFi credentials) are provisioned at
  deployment time and are **absent from all published files**; see the companion code
  repository's `.example.json` templates for the expected (placeholder) shapes.

## License

CC BY 4.0 (Creative Commons Attribution 4.0 International) -- see `LICENSE`. The companion code repository is Apache-2.0, except for the vendored `esp32_puflib` component, which retains its own upstream MIT license.
