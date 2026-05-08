---
id: "0bb29e7d-fd2b-4fad-8f61-49e139c7daa6"
name: ".ambulatorio_reabilitacao_neurologica"
description: "Gera uma evolução neurológica ambulatorial estruturada em português brasileiro, contextualizada ao Rio de Janeiro e ao SUS, revisando histórico, medicações e exame (com placeholders quando necessário), elaborando hipótese diagnóstica e diferencial com checagem de inconsistências, analisando risco‑benefício (NNT/NNH quando possível), propondo plano coerente com tarefas pendentes e finalizando com um informativo claro ao paciente."
category: "documentation"
author_name: "Dr. Victor Waldhelm Cozer"
specialty: "Neurology"
is_anonymous: false
is_featured: false
invocation_count: 0
clone_count: 0
published_at: "2026-05-08T01:59:57.490582Z"
gcs_url: null
output_schemas: { "Consulta - Reabilitação Neurológica": "document" }
curated: false
---

Crie uma avaliação neurológica estruturada para pacientes ambulatoriais baseada nas informações apresentadas. Responda tudo em português brasileiro. Considerar dados epidemiológicos da cidade do Rio de Janeiro (Brasil), sempre que possível. Considerar medicamentos disponíveis no mercado brasileiro, e dar prioridade a medicamentos disponíveis pelo Sistema Único de Saúde (SUS), quando possível.

Objetivos principais:
Produzir uma evolução clara voltada para o clínico.

Identificar fatores contribuintes relacionados a medicamentos, quando apropriado.

Revisar a hipótese diagnóstica e a conduta em busca de contradições, omissões ou lógica inconsistente.

Incluir um resumo/informativo para o paciente ao final.

Estrutura obrigatória:
1. Queixa principal

2. História subjetiva

HDA (História da Doença Atual) em ordem cronológica clara.

Sintomas positivos e negativos pertinentes.

Modificadores de sintomas relevantes, gatilhos, temporalidade, progressão e gravidade.

Avaliações, exames e tratamentos prévios, se fornecidos.

3. Antecedentes pertinentes

Antecedentes patológicos relevantes.

Antecedentes neurológicos relevantes.

Antecedentes psiquiátricos, se aplicável.

Antecedentes cirúrgicos, se aplicável.

História familiar relevante, se fornecida.

História social relevante, se fornecida.

4. Revisão da medicação

Listar medicações atuais relevantes, se fornecidas.

Considerar explicitamente se os sintomas podem ser causados, agravados, mascarados ou modificados por medicamentos, suplementos, abstinência, interações, mudanças de dose, sedativos, anticolinérgicos, dopaminérgicos, anticonvulsivantes, antidepressivos, anti-hipertensivos, indutores de sono, substâncias ou polifarmácia.

Se um efeito medicamentoso for plausível, declarar isso claramente no diagnóstico diferencial ou na hipótese diagnóstica.

5. Exame neurológico básico

Se os dados do exame forem fornecidos, organize-os claramente.

Se os dados estiverem ausentes, crie um modelo breve e padrão de exame neurológico apenas com marcadores (placeholders) conservadores; não invente achados. Incluir:

Estado mental

Nervos cranianos

Motor

Sensibilidade

Reflexos

Coordenação

Marcha

6. Hipótese Diagnóstica (Avaliação)

Resumir o problema clínico de forma concisa. Inclua avaliação detalhada quanto à funcionalidade do paciente.

Apresentar um diagnóstico diferencial priorizado.

Para cada item principal, explicar brevemente por que está sendo considerado e o que corrobora ou afasta a hipótese.

Distinguir fatos estabelecidos de incertezas.

Se apropriado, observar sinais de alerta (red flags) ou motivos para encaminhamento urgente.

7. Suporte de risco-benefício
Sempre que opções de tratamento ou exames forem discutidos, adicione uma breve subseção de "Perspectiva de Risco/Benefício":

Estimar o Número Necessário para Tratar (NNT) quando conhecido ou padrão.

Estimar o Número Necessário para Prejudicar (NNH) quando conhecido ou padrão.

Se os valores exatos de NNT/NNH não forem confiáveis para este cenário específico, declare explicitamente e forneça um resumo qualitativo de risco-benefício.

Não invente números precisos.

Mantenha o foco prático e clinicamente intuitivo, em vez de exaustivo.

8. Conduta (Plano)

Apresentar um plano claro e numerado.

Incluir exames diagnósticos, tratamento, mudanças na medicação, encaminhamentos, orientações, diretrizes de segurança e acompanhamento.

Garantir que o plano seja internamente coerente com a hipótese diagnóstica.

Verificar contradições, ações duplicadas, combinações inseguras ou etapas de acompanhamento ausentes.

Se houver alternativas melhores ou refinamentos óbvios, inclua uma breve subseção de "Sugestões / Revisão do Plano".

9. Pendências / Pesquisa / Tarefas
Adicionar uma seção final de tarefas para o clínico:

Questões em aberto.

Itens para pesquisar.

Prontuários/exames a serem obtidos.

Tarefas de seguimento.

Decisões pendentes.

10. Informativo para o paciente
Finalizar com um resumo amigável em linguagem simples:

O que foi discutido.

Principais explicações possíveis / diagnósticos diferenciais em termos leigos.

Qual é o plano atual.

Sinais aos quais o paciente deve ficar atento.

Quais são as próximas etapas.

Manter o tom calmo, claro e legível. Evitar jargões ou defini-los brevemente quando necessário.

Requisitos de Estilo:
Utilize um estilo profissional de evolução neurológica.

Seja conciso, mas não superficial.

Não invente dados.

Identifique claramente as incertezas.

Prefira o raciocínio clínico prático em vez de linguagem genérica de livros-texto.

Se faltarem informações, anote o que está ausente em vez de fingir que os dados existem.

Quando apropriado, converta informações dispersas em uma nota coerente.

Otimize para a utilidade clínica real.
