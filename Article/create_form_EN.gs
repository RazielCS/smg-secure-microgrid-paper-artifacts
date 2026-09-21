/**
 * create_form_EN.gs
 * Creates the expert validation questionnaire (English) as a Google Form.
 *
 * HOW TO USE:
 *   1. Go to https://script.google.com  (sign in with your Google account)
 *   2. Click "New project"
 *   3. Delete the default code and paste this entire file
 *   4. Click Run > createExpertQuestionnaireEN
 *   5. Authorise the script when prompted (it needs Google Forms access)
 *   6. Check the Execution log (View > Logs) for the shareable form URL
 *   7. The form is saved in your Google Drive root
 *
 * NOTE: Share the expert_overview PDF with respondents alongside the form URL.
 */

function createExpertQuestionnaireEN() {

  // ── Create form ────────────────────────────────────────────────────────────
  var form = FormApp.create(
    'Expert Validation — Security-by-Design Methodology for IoT Ecosystems'
  );

  form.setDescription(
    'This questionnaire is part of a doctoral research project at INAOE ' +
    '(Instituto Nacional de Astrofísica, Óptica y Electrónica, Mexico). ' +
    'It requests your expert assessment of a security-by-design methodology ' +
    'for developing centralized IoT ecosystems.\n\n' +
    'Before completing this form, please read the accompanying Expert Overview ' +
    'document sent to you by email. It summarises the methodology, the identity ' +
    'model, the Root of Trust process, and the Smart Microgrid case study.\n\n' +
    'The questionnaire has four sections:\n' +
    '  A — Respondent Profile (6 items)\n' +
    '  B — Likert-scale evaluation (14 items, ~10 min)\n' +
    '  C — Open questions (3 items, ~5 min)\n' +
    '  D — Consent and attribution\n\n' +
    'Participation is voluntary. Your name will appear in the Acknowledgements ' +
    'section of the manuscript unless you prefer to remain anonymous.\n\n' +
    'Contact: Rodrigo Campos-Sánchez | rcampos@inaoe.mx | INAOE, Tonantzintla, Mexico'
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);

  // ── SECTION A — Respondent Profile ────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle('Section A — Respondent Profile');

  form.addTextItem()
    .setTitle('A1. Full name')
    .setRequired(true);

  form.addTextItem()
    .setTitle('A2. Institution / Organisation')
    .setRequired(true);

  form.addTextItem()
    .setTitle('A3. Country')
    .setRequired(true);

  var a4 = form.addCheckboxItem();
  a4.setTitle('A4. Primary area of expertise (select all that apply)');
  a4.setChoices([
    a4.createChoice('IoT systems design or development'),
    a4.createChoice('Cybersecurity / Information security'),
    a4.createChoice('Embedded systems / Firmware'),
    a4.createChoice('Industrial control systems / SCADA / ICS'),
    a4.createChoice('Smart grid / Energy management systems'),
    a4.createChoice('Software engineering methodologies')
  ]);
  a4.showOtherOption(true);
  a4.setRequired(true);

  var a5 = form.addMultipleChoiceItem();
  a5.setTitle('A5. Years of professional or research experience in your primary area');
  a5.setChoices([
    a5.createChoice('1–3 years'),
    a5.createChoice('4–7 years'),
    a5.createChoice('8–15 years'),
    a5.createChoice('More than 15 years')
  ]);
  a5.setRequired(true);

  var a6 = form.addMultipleChoiceItem();
  a6.setTitle('A6. Highest academic degree');
  a6.setChoices([
    a6.createChoice('B.Sc. / B.Eng.'),
    a6.createChoice('M.Sc. / M.Eng.'),
    a6.createChoice('Ph.D. / D.Sc.')
  ]);
  a6.showOtherOption(true);
  a6.setRequired(true);

  // ── SECTION B — Likert Items ───────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section B — Methodology Evaluation')
    .setHelpText(
      'For each statement below, select the number that best represents your level of agreement.\n\n' +
      '1 = Strongly Disagree\n' +
      '2 = Disagree\n' +
      '3 = Neutral / No opinion\n' +
      '4 = Agree\n' +
      '5 = Strongly Agree\n\n' +
      'An optional comments field follows each item.'
    );

  // B.1 — Methodology Structure and Guidance (CSQ1)
  form.addSectionHeaderItem()
    .setTitle('B.1 — Methodology Structure and Guidance (CSQ1)');

  var b1 = form.addScaleItem();
  b1.setTitle(
    'B1.  The four-phase, seven-stage structure provides sufficient guidance to ' +
    'develop a complete, secure IoT ecosystem without requiring external ' +
    'methodological references.'
  );
  b1.setBounds(1, 5);
  b1.setLabels('Strongly Disagree', 'Strongly Agree');
  b1.setRequired(true);
  form.addTextItem().setTitle('B1 — Comments (optional)');

  var b2 = form.addScaleItem();
  b2.setTitle(
    'B2.  The organizational phase (Stage 1) adds practical value by formally ' +
    'capturing cybersecurity constraints before any architectural or technology ' +
    'decisions are made.'
  );
  b2.setBounds(1, 5);
  b2.setLabels('Strongly Disagree', 'Strongly Agree');
  b2.setRequired(true);
  form.addTextItem().setTitle('B2 — Comments (optional)');

  var b3 = form.addScaleItem();
  b3.setTitle(
    'B3.  The stage-by-stage artifact requirements make it verifiable whether a ' +
    'development team has correctly applied the methodology.'
  );
  b3.setBounds(1, 5);
  b3.setLabels('Strongly Disagree', 'Strongly Agree');
  b3.setRequired(true);
  form.addTextItem().setTitle('B3 — Comments (optional)');

  var b4 = form.addScaleItem();
  b4.setTitle(
    'B4.  The TRL-guided iterative development model (ITER cycles with maintenance ' +
    'points M1–M3) is a practical mechanism for progressively maturing an IoT ' +
    'ecosystem from proof-of-concept to production deployment.'
  );
  b4.setBounds(1, 5);
  b4.setLabels('Strongly Disagree', 'Strongly Agree');
  b4.setRequired(true);
  form.addTextItem().setTitle('B4 — Comments (optional)');

  // B.2 — Identity Model (CSQ2)
  form.addSectionHeaderItem()
    .setTitle('B.2 — Identity Model (CSQ2)');

  var b5 = form.addScaleItem();
  b5.setTitle(
    'B5.  The entity-based identity model — decomposing identity into public, ' +
    'private, and authentication parameter subsets — provides clearer security ' +
    'specification than role-based or policy-based approaches commonly used in ' +
    'IoT frameworks.'
  );
  b5.setBounds(1, 5);
  b5.setLabels('Strongly Disagree', 'Strongly Agree');
  b5.setRequired(true);
  form.addTextItem().setTitle('B5 — Comments (optional)');

  var b6 = form.addScaleItem();
  b6.setTitle(
    'B6.  The 12-parameter identity model is sufficiently general to be applied to ' +
    'IoT entity types beyond those in the SMG case study (e.g., cloud services, ' +
    'user devices, sensors in different domains).'
  );
  b6.setBounds(1, 5);
  b6.setLabels('Strongly Disagree', 'Strongly Agree');
  b6.setRequired(true);
  form.addTextItem().setTitle('B6 — Comments (optional)');

  var b7 = form.addScaleItem();
  b7.setTitle(
    'B7.  Treating the Root of Trust as a process (rather than a static hardware ' +
    'component) is a useful abstraction that accommodates heterogeneous device ' +
    'capabilities, including resource-constrained microcontrollers.'
  );
  b7.setBounds(1, 5);
  b7.setLabels('Strongly Disagree', 'Strongly Agree');
  b7.setRequired(true);
  form.addTextItem().setTitle('B7 — Comments (optional)');

  // B.3 — Root of Trust Verifiability (CSQ3)
  form.addSectionHeaderItem()
    .setTitle('B.3 — Root of Trust Verifiability (CSQ3)');

  var b8 = form.addScaleItem();
  b8.setTitle(
    'B8.  The dynamic Root of Trust execution process (Stage 6, Process 6.1.3) ' +
    'provides a verifiable mechanism for establishing cryptographic identity across ' +
    'all ecosystem entities before any operational communication begins.'
  );
  b8.setBounds(1, 5);
  b8.setLabels('Strongly Disagree', 'Strongly Agree');
  b8.setRequired(true);
  form.addTextItem().setTitle('B8 — Comments (optional)');

  var b9 = form.addScaleItem();
  b9.setTitle(
    'B9.  The six-phase authentication and data-exchange protocol (P1–P6) is ' +
    'logically complete for the security requirements of a critical IoT infrastructure.'
  );
  b9.setBounds(1, 5);
  b9.setLabels('Strongly Disagree', 'Strongly Agree');
  b9.setRequired(true);
  form.addTextItem().setTitle('B9 — Comments (optional)');

  var b10 = form.addScaleItem();
  b10.setTitle(
    'B10.  The continuous hash-chain mechanism (P4/P6) provides meaningful session ' +
    'integrity guarantees that are feasible to implement on resource-constrained ' +
    'IoT devices.'
  );
  b10.setBounds(1, 5);
  b10.setLabels('Strongly Disagree', 'Strongly Agree');
  b10.setRequired(true);
  form.addTextItem().setTitle('B10 — Comments (optional)');

  // B.4 — Threat Coverage (CSQ4)
  form.addSectionHeaderItem()
    .setTitle('B.4 — Threat Coverage (CSQ4)');

  var b11 = form.addScaleItem();
  b11.setTitle(
    'B11.  Mapping methodology stages to STRIDE threat categories independently of ' +
    'implementation technology is more useful to practitioners than ' +
    'technology-specific threat models.'
  );
  b11.setBounds(1, 5);
  b11.setLabels('Strongly Disagree', 'Strongly Agree');
  b11.setRequired(true);
  form.addTextItem().setTitle('B11 — Comments (optional)');

  var b12 = form.addScaleItem();
  b12.setTitle(
    'B12.  Achieving 90% OWASP IoT Top 10 coverage (9/10 items fully addressed at ' +
    'TRL 3) is sufficient evidence of a security-by-design approach for a ' +
    'proof-of-concept validation.'
  );
  b12.setBounds(1, 5);
  b12.setLabels('Strongly Disagree', 'Strongly Agree');
  b12.setRequired(true);
  form.addTextItem().setTitle('B12 — Comments (optional)');

  // B.5 — Cross-domain Applicability and Overall Assessment
  form.addSectionHeaderItem()
    .setTitle('B.5 — Cross-domain Applicability and Overall Assessment');

  var b13 = form.addScaleItem();
  b13.setTitle(
    'B13.  The methodology\'s parameterized, technology-agnostic design makes it ' +
    'applicable to IoT development projects in domains other than energy management ' +
    '(e.g., healthcare, industrial automation, smart buildings).'
  );
  b13.setBounds(1, 5);
  b13.setLabels('Strongly Disagree', 'Strongly Agree');
  b13.setRequired(true);
  form.addTextItem().setTitle('B13 — Comments (optional)');

  var b14 = form.addScaleItem();
  b14.setTitle(
    'B14.  Compared to existing IoT development methodologies, this approach ' +
    'provides more systematic integration of cybersecurity from the earliest ' +
    'organizational stage.'
  );
  b14.setBounds(1, 5);
  b14.setLabels('Strongly Disagree', 'Strongly Agree');
  b14.setRequired(true);
  form.addTextItem().setTitle('B14 — Comments (optional)');

  // ── SECTION C — Open Questions ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section C — Open Questions')
    .setHelpText(
      'Please provide a brief response (3–10 sentences) for each question. ' +
      'Quality of insight is more valuable than length.'
    );

  form.addParagraphTextItem()
    .setTitle(
      'C1.  In your assessment, what is this methodology\'s most significant ' +
      'strength compared to existing IoT security frameworks or development methodologies?'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle(
      'C2.  What is the most important limitation or practical risk you identify ' +
      'in applying this methodology to a real-world IoT development project?'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle(
      'C3.  What single addition or modification would most improve the ' +
      'methodology\'s practical applicability or its theoretical contribution to ' +
      'the field?'
    )
    .setRequired(true);

  // ── SECTION D — Consent and Attribution ───────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section D — Consent and Attribution');

  var d1 = form.addMultipleChoiceItem();
  d1.setTitle(
    'D1.  I consent to my responses being used as expert validation evidence in ' +
    'a peer-reviewed publication.'
  );
  d1.setChoices([
    d1.createChoice('Yes'),
    d1.createChoice('Yes, but please keep my responses anonymous (do not cite my name)'),
    d1.createChoice('No')
  ]);
  d1.setRequired(true);

  form.addTextItem()
    .setTitle(
      'D2.  If you consent to attribution, please indicate how your name should ' +
      'appear in the Acknowledgements section. (Name / Title / Institution)'
    );

  // ── Confirmation message ───────────────────────────────────────────────────
  form.setConfirmationMessage(
    'Thank you for your valuable contribution to this research.\n\n' +
    'If you have any questions or would like to receive a preprint of the ' +
    'manuscript, please contact: rcampos@inaoe.mx\n\n' +
    'Rodrigo Campos-Sánchez | INAOE, Tonantzintla, Mexico'
  );

  // ── Print URLs to execution log ───────────────────────────────────────────
  Logger.log('=== FORM CREATED SUCCESSFULLY ===');
  Logger.log('Share URL (send this to experts):');
  Logger.log(form.getPublishedUrl());
  Logger.log('Edit URL (your editor link):');
  Logger.log(form.getEditUrl());
}
