---
id: "8e498e73-d938-4695-8804-dcb901ebc6e0"
name: ".laudo_circunstanciado"
description: "Gera um relatório médico detalhado com diagnóstico completo (incluindo códigos CID-10/CID-11), prescrição atual, indicação ou não de cirurgias/procedimentos, alternativas terapêuticas medicamentosas e avaliação da urgência e riscos do atraso no tratamento."
category: "clinical_reasoning"
author_name: ""
specialty: null
is_anonymous: true
is_featured: false
invocation_count: 1
clone_count: 1
published_at: "2026-03-28T18:12:25.514392Z"
gcs_url: null
output_schemas: { "Relatório": "document" }
curated: false
---

Produza um relatório médico detalhado, a partir dos dados fornecidos sobre o paciente. 
O relatório deve conter a seguinte estrutura abaixo:

1. Diagnóstico completo, com códigos CID-10 / CID-11 de todas as doenças descritas.
2. Prescrição atual
3. Indicação (ou não) de cirurgias e procedimentos intervencionistas.  
4. Definir se existem outras opções terapêuticas medicamentosas ao caso. 
5. Urgência da situação: riscos com o atraso no uso de medicações ou procedimento/cirurgia; se há possibilidade de piora do quadro, internação ou óbito.
