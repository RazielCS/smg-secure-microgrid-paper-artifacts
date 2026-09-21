// create_form_ES.gs
// Crea el cuestionario de validacion experta (espanol) como un Google Form.
//
// COMO USAR:
//   1. Ir a https://script.google.com (iniciar sesion con tu cuenta de Google)
//   2. Clic en "Nuevo proyecto"
//   3. Borrar el codigo por defecto y pegar este archivo completo
//   4. Clic en Ejecutar > crearCuestionarioES
//   5. Autorizar el script cuando se solicite (necesita acceso a Google Forms)
//   6. Ver > Registros para obtener la URL del formulario
//   7. El formulario se guarda en la raiz de tu Google Drive
//
// NOTA: Compartir el PDF del documento de contexto junto con la URL del formulario.

function crearCuestionarioES() {

  var form = FormApp.create(
    'Validación Experta — Metodología de Seguridad por Diseño para Ecosistemas IoT'
  );

  form.setDescription(
    'Este cuestionario forma parte de un proyecto de investigación doctoral en el INAOE ' +
    '(Instituto Nacional de Astrofísica, Óptica y Electrónica, Tonantzintla, México). ' +
    'Se solicita su evaluación experta de una metodología de seguridad por diseño para el ' +
    'desarrollo de ecosistemas IoT centralizados.\n\n' +
    'Antes de responder, lea el documento de contexto para expertos enviado por correo. ' +
    'En él se resumen la metodología, el modelo de identidad, el proceso de ' +
    'Raíz de Confianza y el caso de estudio de la Microrred de CD.\n\n' +
    'El cuestionario tiene cuatro secciones:\n' +
    '  A — Perfil del respondente (6 ítems)\n' +
    '  B — Evaluación Likert (14 ítems, ~10 min)\n' +
    '  C — Preguntas abiertas (3 ítems, ~5 min)\n' +
    '  D — Consentimiento y atribución\n\n' +
    'La participación es voluntaria. Su nombre aparecerá en los Agradecimientos del ' +
    'manuscrito a menos que prefiera permanecer en el anonimato.\n\n' +
    'Contacto: Raziel Campos-Sánchez | rcampos@inaoe.mx | INAOE, Tonantzintla, México'
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);

  // -- SECCION A ----------------------------------------------------------
  form.addSectionHeaderItem()
    .setTitle('Sección A — Perfil del respondente');

  form.addTextItem()
    .setTitle('A1. Nombre completo')
    .setRequired(true);

  form.addTextItem()
    .setTitle('A2. Institución / Organización')
    .setRequired(true);

  form.addTextItem()
    .setTitle('A3. País')
    .setRequired(true);

  var a4 = form.addCheckboxItem();
  a4.setTitle('A4. Área principal de experiencia (seleccione todas las que apliquen)');
  a4.setChoices([
    a4.createChoice('Diseño o desarrollo de sistemas IoT'),
    a4.createChoice('Ciberseguridad / Seguridad de la información'),
    a4.createChoice('Sistemas embebidos / Firmware'),
    a4.createChoice('Sistemas de control industrial / SCADA / ICS'),
    a4.createChoice('Red inteligente / Sistemas de gestión de energía'),
    a4.createChoice('Metodologías de ingeniería de software')
  ]);
  a4.showOtherOption(true);
  a4.setRequired(true);

  var a5 = form.addMultipleChoiceItem();
  a5.setTitle('A5. Años de experiencia profesional o de investigación en su área principal');
  a5.setChoices([
    a5.createChoice('1–3 años'),
    a5.createChoice('4–7 años'),
    a5.createChoice('8–15 años'),
    a5.createChoice('Más de 15 años')
  ]);
  a5.setRequired(true);

  var a6 = form.addMultipleChoiceItem();
  a6.setTitle('A6. Máximo grado académico');
  a6.setChoices([
    a6.createChoice('Licenciatura / Ingeniería'),
    a6.createChoice('Maestría'),
    a6.createChoice('Doctorado (Ph.D. / D.Sc.)')
  ]);
  a6.showOtherOption(true);
  a6.setRequired(true);

  // -- SECCION B ----------------------------------------------------------
  form.addPageBreakItem()
    .setTitle('Sección B — Evaluación de la metodología')
    .setHelpText(
      'Para cada enunciado, seleccione el número que mejor represente su nivel de acuerdo.\n\n' +
      '1 = Totalmente en desacuerdo\n' +
      '2 = En desacuerdo\n' +
      '3 = Neutral / Sin opinión\n' +
      '4 = De acuerdo\n' +
      '5 = Totalmente de acuerdo\n\n' +
      'Después de cada ítem hay un campo opcional para comentarios.'
    );

  // B.1 Estructura y orientacion (CSQ1)
  form.addSectionHeaderItem()
    .setTitle('B.1 — Estructura y orientación de la metodología (CSQ1)');

  var b1 = form.addScaleItem();
  b1.setTitle(
    'B1.  La estructura de cuatro fases y siete etapas proporciona orientación ' +
    'suficiente para desarrollar un ecosistema IoT completo y seguro sin necesidad ' +
    'de referencias metodológicas externas.'
  );
  b1.setBounds(1, 5);
  b1.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b1.setRequired(true);
  form.addTextItem().setTitle('B1 — Comentarios (opcional)');

  var b2 = form.addScaleItem();
  b2.setTitle(
    'B2.  La fase organizacional (Etapa 1) agrega valor práctico al capturar ' +
    'formalmente las restricciones de ciberseguridad antes de tomar cualquier ' +
    'decisión arquitectónica o tecnológica.'
  );
  b2.setBounds(1, 5);
  b2.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b2.setRequired(true);
  form.addTextItem().setTitle('B2 — Comentarios (opcional)');

  var b3 = form.addScaleItem();
  b3.setTitle(
    'B3.  Los requisitos de artefactos por etapa permiten verificar si un equipo ' +
    'de desarrollo ha aplicado correctamente la metodología.'
  );
  b3.setBounds(1, 5);
  b3.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b3.setRequired(true);
  form.addTextItem().setTitle('B3 — Comentarios (opcional)');

  var b4 = form.addScaleItem();
  b4.setTitle(
    'B4.  El modelo de desarrollo iterativo guiado por TRL (ciclos ITER con puntos ' +
    'de mantenimiento M1–M3) es un mecanismo práctico para madurar progresivamente ' +
    'un ecosistema IoT desde prueba de concepto hasta despliegue en producción.'
  );
  b4.setBounds(1, 5);
  b4.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b4.setRequired(true);
  form.addTextItem().setTitle('B4 — Comentarios (opcional)');

  // B.2 Modelo de identidad (CSQ2)
  form.addSectionHeaderItem()
    .setTitle('B.2 — Modelo de identidad (CSQ2)');

  var b5 = form.addScaleItem();
  b5.setTitle(
    'B5.  El modelo de identidad basado en entidades — que descompone la identidad ' +
    'en subconjuntos de parámetros públicos, privados y de autenticación — ' +
    'proporciona una especificación de seguridad más clara que los enfoques basados ' +
    'en roles o políticas utilizados habitualmente en marcos IoT.'
  );
  b5.setBounds(1, 5);
  b5.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b5.setRequired(true);
  form.addTextItem().setTitle('B5 — Comentarios (opcional)');

  var b6 = form.addScaleItem();
  b6.setTitle(
    'B6.  El modelo de identidad de 12 parámetros es suficientemente general para ' +
    'aplicarse a tipos de entidades IoT más allá de los del caso de estudio de la ' +
    'Microrred (p. ej., servicios en la nube, dispositivos de usuario, sensores en ' +
    'dominios distintos).'
  );
  b6.setBounds(1, 5);
  b6.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b6.setRequired(true);
  form.addTextItem().setTitle('B6 — Comentarios (opcional)');

  var b7 = form.addScaleItem();
  b7.setTitle(
    'B7.  Tratar la Raíz de Confianza como un proceso (en lugar de un componente ' +
    'de hardware estático) es una abstracción útil que acomoda capacidades ' +
    'heterogéneas de los dispositivos, incluidos los microcontroladores con recursos ' +
    'limitados.'
  );
  b7.setBounds(1, 5);
  b7.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b7.setRequired(true);
  form.addTextItem().setTitle('B7 — Comentarios (opcional)');

  // B.3 Verificabilidad de la Raiz de Confianza (CSQ3)
  form.addSectionHeaderItem()
    .setTitle('B.3 — Verificabilidad de la Raíz de Confianza (CSQ3)');

  var b8 = form.addScaleItem();
  b8.setTitle(
    'B8.  El proceso dinámico de ejecución de la Raíz de Confianza (Etapa 6, ' +
    'Proceso 6.1.3) proporciona un mecanismo verificable para establecer la ' +
    'identidad criptográfica de todas las entidades del ecosistema antes de que ' +
    'comience cualquier comunicación operacional.'
  );
  b8.setBounds(1, 5);
  b8.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b8.setRequired(true);
  form.addTextItem().setTitle('B8 — Comentarios (opcional)');

  var b9 = form.addScaleItem();
  b9.setTitle(
    'B9.  El protocolo de autenticación e intercambio de datos de seis fases (P1–P6) ' +
    'es lógicamente completo para los requisitos de seguridad de una infraestructura ' +
    'IoT crítica.'
  );
  b9.setBounds(1, 5);
  b9.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b9.setRequired(true);
  form.addTextItem().setTitle('B9 — Comentarios (opcional)');

  var b10 = form.addScaleItem();
  b10.setTitle(
    'B10.  El mecanismo de cadena de hash continua (P4/P6) proporciona garantías ' +
    'de integridad de sesión significativas que son factibles de implementar en ' +
    'dispositivos IoT con recursos limitados.'
  );
  b10.setBounds(1, 5);
  b10.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b10.setRequired(true);
  form.addTextItem().setTitle('B10 — Comentarios (opcional)');

  // B.4 Cobertura de amenazas (CSQ4)
  form.addSectionHeaderItem()
    .setTitle('B.4 — Cobertura de amenazas (CSQ4)');

  var b11 = form.addScaleItem();
  b11.setTitle(
    'B11.  Mapear las etapas de la metodología a las categorías de amenazas STRIDE ' +
    'de forma independiente de la tecnología de implementación es más útil para ' +
    'los profesionales que los modelos de amenazas específicos de tecnología.'
  );
  b11.setBounds(1, 5);
  b11.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b11.setRequired(true);
  form.addTextItem().setTitle('B11 — Comentarios (opcional)');

  var b12 = form.addScaleItem();
  b12.setTitle(
    'B12.  Alcanzar el 90% de cobertura del OWASP IoT Top 10 (9/10 ítems ' +
    'completamente abordados en TRL 3) es evidencia suficiente de un enfoque de ' +
    'seguridad por diseño para una validación en prueba de concepto.'
  );
  b12.setBounds(1, 5);
  b12.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b12.setRequired(true);
  form.addTextItem().setTitle('B12 — Comentarios (opcional)');

  // B.5 Aplicabilidad interdisciplinaria y evaluacion general
  form.addSectionHeaderItem()
    .setTitle('B.5 — Aplicabilidad interdisciplinaria y evaluación general');

  var b13 = form.addScaleItem();
  b13.setTitle(
    'B13.  El diseño parametrizado y agnóstico a la tecnología de la metodología ' +
    'la hace aplicable a proyectos de desarrollo IoT en dominios distintos a la ' +
    'gestión de energía (p. ej., salud, automatización industrial, edificios ' +
    'inteligentes).'
  );
  b13.setBounds(1, 5);
  b13.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b13.setRequired(true);
  form.addTextItem().setTitle('B13 — Comentarios (opcional)');

  var b14 = form.addScaleItem();
  b14.setTitle(
    'B14.  En comparación con las metodologías de desarrollo IoT existentes, este ' +
    'enfoque proporciona una integración más sistemática de la ciberseguridad desde ' +
    'la etapa organizacional más temprana.'
  );
  b14.setBounds(1, 5);
  b14.setLabels('Totalmente en desacuerdo', 'Totalmente de acuerdo');
  b14.setRequired(true);
  form.addTextItem().setTitle('B14 — Comentarios (opcional)');

  // -- SECCION C ----------------------------------------------------------
  form.addPageBreakItem()
    .setTitle('Sección C — Preguntas abiertas')
    .setHelpText(
      'Por favor proporcione una respuesta breve (3–10 oraciones) para cada pregunta. ' +
      'La calidad del análisis es más valiosa que la extensión.'
    );

  form.addParagraphTextItem()
    .setTitle(
      'C1.  En su evaluación, ¿cuál es la fortaleza más significativa de esta ' +
      'metodología en comparación con los marcos de seguridad IoT o metodologías ' +
      'de desarrollo existentes?'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle(
      'C2.  ¿Cuál es la limitación más importante o el riesgo práctico que identifica ' +
      'al aplicar esta metodología a un proyecto de desarrollo IoT en el mundo real?'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle(
      'C3.  ¿Qué adición o modificación única mejoraría más la aplicabilidad ' +
      'práctica de la metodología o su contribución teórica al campo?'
    )
    .setRequired(true);

  // -- SECCION D ----------------------------------------------------------
  form.addPageBreakItem()
    .setTitle('Sección D — Consentimiento y atribución');

  var d1 = form.addMultipleChoiceItem();
  d1.setTitle(
    'D1.  Doy mi consentimiento para que mis respuestas sean utilizadas como ' +
    'evidencia de validación experta en una publicación revisada por pares.'
  );
  d1.setChoices([
    d1.createChoice('Sí'),
    d1.createChoice('Sí, pero prefiero permanecer en el anonimato (no citar mi nombre)'),
    d1.createChoice('No')
  ]);
  d1.setRequired(true);

  form.addTextItem()
    .setTitle(
      'D2.  Si consiente la atribución, indique cómo desea que aparezca su nombre ' +
      'en los Agradecimientos. (Nombre / Título / Institución)'
    );

  form.setConfirmationMessage(
    'Muchas gracias por su valiosa contribución a esta investigación.\n\n' +
    'Si tiene alguna pregunta o desea recibir un preprint del manuscrito, ' +
    'por favor contácteme: rcampos@inaoe.mx\n\n' +
    'Raziel Campos-Sánchez | INAOE, Tonantzintla, México'
  );

  Logger.log('=== FORMULARIO CREADO EXITOSAMENTE ===');
  Logger.log('URL para compartir con los expertos:');
  Logger.log(form.getPublishedUrl());
  Logger.log('URL de edición (solo para ti):');
  Logger.log(form.getEditUrl());
}
