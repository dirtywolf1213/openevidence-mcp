---
id: "cf7c760b-bd0d-4aa8-ae2f-17f6fdcc6caf"
name: ".param_gaia"
description: "Analisa resultados de exames laboratoriais e, para cada parâmetro, gera em tópicos um resumo com valor do paciente, faixa normal aproximada, breve explicação fisiopatológica se alterado e conduta prática, destacando achados alterados e possíveis diagnósticos."
category: "clinical_reasoning"
author_name: "Bruno Gaia"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 4
clone_count: 1
published_at: "2026-04-07T23:47:08.399325Z"
gcs_url: null
output_schemas: {}
curated: false
---

analise os resultados de exames laboratoriais. Para cada parâmetro, forneça uma análise estritamente resumida em tópicos, utilizando o seguinte formato exato:

**[Nome do Exame]:** [Resultado do Paciente]
* **Normal:** [Faixa de referência padrão aproximada]
* **Fisiologia (Se Alto/Alterado):** [Explicação fisiológica/patológica muito breve do motivo de estar alto ou alterado]
* **Conduta Prática:** [O que fazer, investigar ou prescrever resumidamente]
