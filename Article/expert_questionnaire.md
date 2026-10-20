# Expert Questionnaire — Security-by-Design Methodology for Centralized IoT Ecosystems

---

## Email subject line

> Expert Validation Request — IoT Security-by-Design Methodology (15-min questionnaire)

---

## Email body (copy-paste below this line)

---

Dear [Name],

I am a doctoral researcher at INAOE (Instituto Nacional de Astrofísica, Óptica y Electrónica, Tonantzintla, Mexico) working on the design and validation of a security-by-design methodology for the development of centralized IoT ecosystems. The methodology integrates cybersecurity from the earliest organizational stage through a four-phase, seven-stage process, and has been validated through a confirmatory case study implementing a DC Smart Microgrid (SMG) with three ESP32-based secondary control nodes and a Raspberry Pi 4B primary coordination agent.

I am writing to request your expert assessment of the methodology. This questionnaire consists of 14 Likert-scale items and 3 open questions, and requires approximately 15 minutes to complete. Your responses will be cited as expert validation evidence in a manuscript under preparation for submission to Computers & Security (Elsevier, Q1).

Participation is entirely voluntary. Your name and institution will appear in the Acknowledgements section unless you prefer to remain anonymous — please indicate your preference in Section D.

Please reply to this email with your completed responses by **[DEADLINE DATE]**.

Thank you for your time and expertise.

Rodrigo Campos-Sánchez
Doctoral Candidate, Electronics/Cybersecurity
INAOE — Tonantzintla, Puebla, Mexico
rcampos@inaoe.mx

---

## SECTION A — Respondent Profile

**A1. Full name:** _______________________________________________

**A2. Institution / Organization:** _______________________________________________

**A3. Country:** _______________________________________________

**A4. Primary area of expertise** (select all that apply):

- [ ] IoT systems design or development
- [ ] Cybersecurity / Information security
- [ ] Embedded systems / Firmware
- [ ] Industrial control systems / SCADA / ICS
- [ ] Smart grid / Energy management systems
- [ ] Software engineering methodologies
- [ ] Other: _______________________________________________

**A5. Years of professional or research experience in your primary area:**

- [ ] 1–3 years
- [ ] 4–7 years
- [ ] 8–15 years
- [ ] More than 15 years

**A6. Highest academic degree:**

- [ ] B.Sc. / B.Eng.
- [ ] M.Sc. / M.Eng.
- [ ] Ph.D. / D.Sc.
- [ ] Other: _______________________________________________

---

## SECTION B — Likert Items

**Instructions:** For each statement, indicate your level of agreement using the following scale. Write the number (1–5) in the space provided.

```
1 = Strongly Disagree
2 = Disagree
3 = Neutral / No opinion
4 = Agree
5 = Strongly Agree
```

---

### B.1 Methodology Structure and Guidance (CSQ1)

**B1.** The four-phase, seven-stage structure provides sufficient guidance to develop a complete, secure IoT ecosystem without requiring external methodological references.

**Rating: _____**   Comments (optional): _______________________________________________

---

**B2.** The organizational phase (Stage 1) adds practical value by formally capturing cybersecurity constraints before any architectural or technology decisions are made.

**Rating: _____**   Comments (optional): _______________________________________________

---

**B3.** The stage-by-stage artifact requirements make it verifiable whether a development team has correctly applied the methodology.

**Rating: _____**   Comments (optional): _______________________________________________

---

**B4.** The TRL-guided iterative development model (ITER cycles with maintenance points M1–M3) is a practical mechanism for progressively maturing an IoT ecosystem from proof-of-concept to production deployment.

**Rating: _____**   Comments (optional): _______________________________________________

---

### B.2 Identity Model (CSQ2)

**B5.** The entity-based identity model — decomposing identity into public, private, and authentication parameter subsets — provides clearer security specification than role-based or policy-based approaches commonly used in IoT frameworks.

**Rating: _____**   Comments (optional): _______________________________________________

---

**B6.** The 12-parameter identity model is sufficiently general to be applied to IoT entity types beyond those in the SMG case study (e.g., cloud services, user devices, sensors in different domains).

**Rating: _____**   Comments (optional): _______________________________________________

---

**B7.** Treating the Root of Trust as a process (rather than a static hardware component) is a useful abstraction that accommodates heterogeneous device capabilities, including resource-constrained microcontrollers.

**Rating: _____**   Comments (optional): _______________________________________________

---

### B.3 Root of Trust Verifiability (CSQ3)

**B8.** The dynamic Root of Trust execution process (Stage 6, Process 6.1.3) provides a verifiable mechanism for establishing cryptographic identity across all ecosystem entities before any operational communication begins.

**Rating: _____**   Comments (optional): _______________________________________________

---

**B9.** The six-phase authentication and data-exchange protocol (P1–P6) is logically complete for the security requirements of a critical IoT infrastructure.

**Rating: _____**   Comments (optional): _______________________________________________

---

**B10.** The continuous hash-chain mechanism (P4/P6) provides meaningful session integrity guarantees that are feasible to implement on resource-constrained IoT devices.

**Rating: _____**   Comments (optional): _______________________________________________

---

### B.4 Threat Coverage (CSQ4)

**B11.** Mapping methodology stages to STRIDE threat categories independently of implementation technology is more useful to practitioners than technology-specific threat models.

**Rating: _____**   Comments (optional): _______________________________________________

---

**B12.** Achieving 90% OWASP IoT Top 10 coverage (9/10 items fully addressed at TRL 3) is sufficient evidence of a security-by-design approach for a proof-of-concept validation.

**Rating: _____**   Comments (optional): _______________________________________________

---

### B.5 Cross-domain Applicability and Overall Assessment

**B13.** The methodology's parameterized, technology-agnostic design makes it applicable to IoT development projects in domains other than energy management (e.g., healthcare, industrial automation, smart buildings).

**Rating: _____**   Comments (optional): _______________________________________________

---

**B14.** Compared to existing IoT development methodologies, this approach provides more systematic integration of cybersecurity from the earliest organizational stage.

**Rating: _____**   Comments (optional): _______________________________________________

---

## SECTION C — Open Questions

**Instructions:** Please provide a brief response (3–10 sentences) for each question. Quality of insight is more valuable than length.

---

**C1.** In your assessment, what is this methodology's most significant strength compared to existing IoT security frameworks or development methodologies?

*Response:*

_______________________________________________
_______________________________________________
_______________________________________________

---

**C2.** What is the most important limitation or practical risk you identify in applying this methodology to a real-world IoT development project?

*Response:*

_______________________________________________
_______________________________________________
_______________________________________________

---

**C3.** What single addition or modification would most improve the methodology's practical applicability or its theoretical contribution to the field?

*Response:*

_______________________________________________
_______________________________________________
_______________________________________________

---

## SECTION D — Consent and Attribution

**D1.** I consent to my responses being used as expert validation evidence in a peer-reviewed publication.

- [ ] Yes
- [ ] Yes, but please keep my responses anonymous (do not cite my name)
- [ ] No

**D2.** If you consent to attribution, how would you like your name to appear in the Acknowledgements?

Name / Title / Institution: _______________________________________________

---

*Thank you for your valuable contribution. Please reply to rcampos@inaoe.mx with this completed form.*

*If you have questions about the research or would like to receive a preprint of the manuscript, please do not hesitate to contact me.*

---

## Questionnaire metadata (for internal reference — remove before sending)

| Field | Value |
|---|---|
| Target respondents | 6–10 experts (IoT security, embedded systems, industrial control, smart grid) |
| Likert items | 14 (B1–B14) |
| Open questions | 3 (C1–C3) |
| Estimated completion time | 15 minutes |
| Response deadline | [DEADLINE DATE] |
| Contact | rcampos@inaoe.mx |
| Purpose | External validity mitigation for single-domain case study; Computers & Security submission |
| CSQ mapping | B1–B4 → CSQ1 | B5–B7 → CSQ2 | B8–B10 → CSQ3 | B11–B12 → CSQ4 | B13–B14 → Cross-domain |
