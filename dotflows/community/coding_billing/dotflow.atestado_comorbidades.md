---
id: "927c67b5-fdaa-4230-90c4-b66c516474f8"
name: ".atestado_comorbidades"
description: "Gera um atestado médico em português para um paciente, com texto padrão informando acompanhamento cardiológico e listando comorbidades/diagnósticos com seus códigos CID-10 e CID-11 quando aplicáveis."
category: "coding_billing"
author_name: ""
specialty: null
is_anonymous: true
is_featured: false
invocation_count: 0
clone_count: 0
published_at: "2026-03-28T18:11:49.171714Z"
gcs_url: null
output_schemas: { "Atestado comorbidades": "document" }
curated: false
---

Gere um documento, contendo um atestado médico que informe as comorbidades, com seus respectivos códigos CID-10 e CID-11 quando aplicáveis. 

O Atestado deve vir com essa construção textual:

'Atesto, para os devidos fins, que [PACIENTE] realiza acompanhamento cardiológico regular comigo e possui os seguintes diagnósticos:'

Após o texto acima, seguirão os diagnósticos e códigos aplicáveis.
