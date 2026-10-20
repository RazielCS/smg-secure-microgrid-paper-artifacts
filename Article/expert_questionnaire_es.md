# Cuestionario de Validación por Expertos — Metodología de Seguridad por Diseño para Ecosistemas IoT Centralizados

---

## Línea de asunto del correo

> Solicitud de validación por experto — Metodología de Seguridad por Diseño para IoT (cuestionario ~15 min)

---

## Cuerpo del correo (copiar y pegar a partir de esta línea)

---

Estimado/a [Nombre]:

Soy investigador doctoral en el INAOE (Instituto Nacional de Astrofísica, Óptica y Electrónica, Tonantzintla, México), y trabajo en el diseño y validación de una metodología de seguridad por diseño para el desarrollo de ecosistemas IoT centralizados. La metodología integra la ciberseguridad desde la etapa organizacional más temprana mediante un proceso de cuatro fases y siete etapas, y ha sido validada a través de un estudio de caso confirmatorio que implementa una Microrred de Corriente Directa (SMG) con tres nodos de control secundario basados en ESP32 y un agente de coordinación primario en Raspberry Pi 4B.

Le escribo para solicitar su evaluación experta de esta metodología. El cuestionario consta de 14 ítems en escala Likert y 3 preguntas abiertas, y requiere aproximadamente 15 minutos para completarse. Sus respuestas serán citadas como evidencia de validación por expertos en un manuscrito en preparación para su envío a *Computers & Security* (Elsevier, Q1).

La participación es completamente voluntaria. Su nombre e institución aparecerán en la sección de Agradecimientos, a menos que prefiera permanecer en el anonimato — indique su preferencia en la Sección D.

Por favor responda a este correo con el cuestionario completado antes del **[FECHA LÍMITE]**.

Agradezco de antemano su tiempo y su aportación.

Rodrigo Campos-Sánchez
Candidato a Doctor, Electrónica/Ciberseguridad
INAOE — Tonantzintla, Puebla, México
rcampos@inaoe.mx

---

## SECCIÓN A — Perfil del Respondente

**A1. Nombre completo:** _______________________________________________

**A2. Institución / Organización:** _______________________________________________

**A3. País:** _______________________________________________

**A4. Área principal de experiencia** (seleccione todas las que apliquen):

- [ ] Diseño o desarrollo de sistemas IoT
- [ ] Ciberseguridad / Seguridad de la información
- [ ] Sistemas embebidos / Firmware
- [ ] Sistemas de control industrial / SCADA / ICS
- [ ] Redes eléctricas inteligentes / Sistemas de gestión de energía
- [ ] Metodologías de ingeniería de software
- [ ] Otra: _______________________________________________

**A5. Años de experiencia profesional o de investigación en su área principal:**

- [ ] 1–3 años
- [ ] 4–7 años
- [ ] 8–15 años
- [ ] Más de 15 años

**A6. Grado académico más alto:**

- [ ] Licenciatura / Ingeniería
- [ ] Maestría
- [ ] Doctorado
- [ ] Otro: _______________________________________________

---

## SECCIÓN B — Ítems en Escala Likert

**Instrucciones:** Para cada afirmación, indique su nivel de acuerdo utilizando la siguiente escala. Escriba el número (1–5) en el espacio indicado.

```
1 = Totalmente en desacuerdo
2 = En desacuerdo
3 = Neutral / Sin opinión
4 = De acuerdo
5 = Totalmente de acuerdo
```

---

### B.1 Estructura y Suficiencia de Guía de la Metodología (CSQ1)

**B1.** La estructura de cuatro fases y siete etapas proporciona orientación suficiente para desarrollar un ecosistema IoT completo y seguro sin requerir referencias metodológicas externas.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

**B2.** La fase organizacional (Etapa 1) aporta valor práctico al formalizar las restricciones de ciberseguridad antes de tomar cualquier decisión arquitectónica o tecnológica.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

**B3.** Los requisitos de artefactos por etapa hacen verificable si un equipo de desarrollo ha aplicado correctamente la metodología.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

**B4.** El modelo de desarrollo iterativo guiado por TRL (ciclos ITER con puntos de mantenimiento M1–M3) es un mecanismo práctico para madurar progresivamente un ecosistema IoT desde prueba de concepto hasta despliegue en producción.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

### B.2 Modelo de Identidad (CSQ2)

**B5.** El modelo de identidad basado en entidades — que descompone la identidad en subconjuntos de parámetros públicos, privados y de autenticación — ofrece una especificación de seguridad más clara que los enfoques basados en roles o en políticas comúnmente utilizados en marcos de IoT.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

**B6.** El modelo de identidad de 12 parámetros es suficientemente general para aplicarse a tipos de entidades IoT más allá de los del caso de estudio SMG (p. ej., servicios en la nube, dispositivos de usuario, sensores en distintos dominios).

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

**B7.** Tratar la Raíz de Confianza como un proceso (en lugar de un componente de hardware estático) es una abstracción útil que se adapta a capacidades heterogéneas de dispositivos, incluyendo microcontroladores con recursos limitados.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

### B.3 Verificabilidad de la Raíz de Confianza (CSQ3)

**B8.** El proceso dinámico de ejecución de la Raíz de Confianza (Etapa 6, Proceso 6.1.3) proporciona un mecanismo verificable para establecer identidad criptográfica en todas las entidades del ecosistema antes de que comience cualquier comunicación operacional.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

**B9.** El protocolo de seis fases de autenticación e intercambio de datos (P1–P6) es lógicamente completo para los requisitos de seguridad de una infraestructura IoT crítica.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

**B10.** El mecanismo continuo de cadena de hash (P4/P6) ofrece garantías de integridad de sesión significativas y es viable de implementar en dispositivos IoT con recursos limitados.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

### B.4 Cobertura de Amenazas (CSQ4)

**B11.** Mapear las etapas de la metodología a las categorías de amenazas STRIDE de forma independiente a la tecnología de implementación es más útil para los profesionales que los modelos de amenazas específicos de tecnología.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

**B12.** Alcanzar el 90% de cobertura del OWASP IoT Top 10 (9/10 ítems completamente cubiertos en TRL 3) es evidencia suficiente de un enfoque de seguridad por diseño para una validación en prueba de concepto.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

### B.5 Aplicabilidad Interdisciplinaria y Evaluación General

**B13.** El diseño parametrizado e independiente de tecnología de la metodología la hace aplicable a proyectos de desarrollo IoT en dominios distintos a la gestión de energía (p. ej., salud, automatización industrial, edificios inteligentes).

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

**B14.** En comparación con metodologías de desarrollo IoT existentes, este enfoque proporciona una integración más sistemática de la ciberseguridad desde la etapa organizacional más temprana.

**Calificación: _____**   Comentarios (opcional): _______________________________________________

---

## SECCIÓN C — Preguntas Abiertas

**Instrucciones:** Por favor proporcione una respuesta breve (3–10 oraciones) para cada pregunta. La calidad del análisis es más valiosa que la extensión.

---

**C1.** En su valoración, ¿cuál es la fortaleza más significativa de esta metodología en comparación con marcos de seguridad IoT o metodologías de desarrollo existentes?

*Respuesta:*

_______________________________________________
_______________________________________________
_______________________________________________

---

**C2.** ¿Cuál es la limitación más importante o el riesgo práctico más relevante que identifica al aplicar esta metodología a un proyecto de desarrollo IoT en el mundo real?

*Respuesta:*

_______________________________________________
_______________________________________________
_______________________________________________

---

**C3.** ¿Qué adición o modificación única mejoraría más la aplicabilidad práctica de la metodología o su aportación teórica al campo?

*Respuesta:*

_______________________________________________
_______________________________________________
_______________________________________________

---

## SECCIÓN D — Consentimiento y Atribución

**D1.** Doy mi consentimiento para que mis respuestas sean utilizadas como evidencia de validación por expertos en una publicación revisada por pares.

- [ ] Sí
- [ ] Sí, pero por favor mantenga mis respuestas en el anonimato (no cite mi nombre)
- [ ] No

**D2.** Si otorga su consentimiento para la atribución, ¿cómo desea que aparezca su nombre en los Agradecimientos?

Nombre / Título / Institución: _______________________________________________

---

*Agradezco su valiosa contribución. Por favor responda a rcampos@inaoe.mx con este formulario completado.*

*Si tiene preguntas sobre la investigación o desea recibir un preprint del manuscrito, no dude en contactarme.*

---

## Metadatos del cuestionario (referencia interna — eliminar antes de enviar)

| Campo | Valor |
|---|---|
| Respondentes objetivo | 6–10 expertos (seguridad IoT, sistemas embebidos, control industrial, redes inteligentes) |
| Ítems Likert | 14 (B1–B14) |
| Preguntas abiertas | 3 (C1–C3) |
| Tiempo estimado de respuesta | 15 minutos |
| Fecha límite de respuesta | [FECHA LÍMITE] |
| Contacto | rcampos@inaoe.mx |
| Propósito | Mitigación de validez externa para estudio de caso de dominio único; envío a Computers & Security |
| Mapeo CSQ | B1–B4 → CSQ1 \| B5–B7 → CSQ2 \| B8–B10 → CSQ3 \| B11–B12 → CSQ4 \| B13–B14 → Interdisciplinario |
