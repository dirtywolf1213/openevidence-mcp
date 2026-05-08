---
id: "3e6f0db4-4b73-45a2-a6c1-503595df487b"
name: ".internamento"
description: "Organiza e padroniza um caso clínico em linguagem médica para inserção no Sistema Estadual de Regulação, gerando motivo da solicitação, CID, justificativa e admissão estruturadas, além de exames, suspeitas diagnósticas, investigação, prescrição, classificação de gravidade e discussão clínica baseada em evidências."
category: "documentation"
author_name: "Dr. Wagner Almeida"
specialty: "Primary Care"
is_anonymous: false
is_featured: false
invocation_count: 35
clone_count: 0
published_at: "2026-04-28T02:22:32.124811Z"
gcs_url: null
output_schemas: {}
curated: false
---

Organize o caso clínico para preenchimento do Sistema Estadual de Regulação com linguagem médica formal, objetiva e técnica. Estruture o raciocínio clínico de forma lógica, sem redundâncias. As hipóteses diagnósticas devem variar conforme o caso, podendo haver uma ou múltiplas, a depender da complexidade. 

[INSTRUÇÃO DE FORMATAÇÃO CRÍTICA: Responda obrigatoriamente utilizando a sintaxe Markdown para garantir hierarquia visual. Use títulos (###) para cada seção, negrito para subseções. Não insira linha horizontal (---) entre as divisões principais. Na seção de lista de problemas, é PROIBIDO utilizar listas Markdown; não usar 1. 2. 3., nem hífens (- ou --) ou asteriscos (*); cada item deve iniciar com 1) 2) 3); nunca usar ponto após o número; cada linha deve ser independente, sem marcadores automáticos; não utilizar qualquer símbolo que gere lista automática.]

A) MOTIVO DA SOLICITAÇÃO
Informar de forma direta a especialidade ou serviço necessário.
Exemplo: REGULAÇÃO PARA CLÍNICA MÉDICA / CARDIOLOGIA / NEUROLOGIA / UTI ADULTO.

B) CID PRINCIPAL
Informar apenas o CID sindrômico quando não houver diagnóstico fechado ainda ou o CID do diagnóstico do quadro principal.

C) JUSTIFICATIVA DA TRANSFERÊNCIA
Em CAIXA ALTA.
Parágrafo único, curto e objetivo.
Seguir obrigatoriamente o modelo:
PACIENTE PORTADOR DE [COMORBIDADES RELEVANTES], COM SUSPEITA/QUADRO DE [DIAGNÓSTICO PRINCIPAL], CURSANDO COM [MANIFESTAÇÕES DE GRAVIDADE OU INSTABILIDADE], NECESSITANDO DE [INTERNAÇÃO / SUPORTE AVANÇADO / INVESTIGAÇÃO COMPLEMENTAR / AVALIAÇÃO ESPECIALIZADA ETC].

D) HISTÓRIA DA ADMISSÃO (HMA)
Em CAIXA ALTA.
Linguagem cronológica, clara e objetiva.

E) PROBLEMAS E HIPÓTESES DIAGNÓSTICAS
Em CAIXA ALTA.
Organizar por agrupamento sindrômico.
Em cada item, colocar sinais e sintomas agrupados, separados por “+”.
Logo abaixo, as hipóteses correspondentes.
NÃO escrever a palavra “HIPÓTESE”.
O número de hipóteses pode variar conforme o caso, priorizando as mais plausíveis.
Comorbidades e Hábitos de vida referidos ao final.
Evitar redundância. Sintomas relacionados ao mesmo eixo diagnóstico devem ser agrupados no mesmo item.

Modelo estrutural:
1) FEBRE + TOSSE PRODUTIVA + DISPNEIA + CREPITAÇÕES BIBASAIS
-- PNEUMONIA ADQUIRIDA NA COMUNIDADE?
-- COVID-19?
2) DOR TORÁCICA + SUDORESE + NÁUSEAS + ALTERAÇÕES EM ECG
-- SÍNDROME CORONARIANA AGUDA?
3) HAS
4) DM2
5) TABAGISTA

F) PLANO DIAGNÓSTICO
Em Sentence Case.
Descrever de forma detalhada:
Exame solicitado
Justificativa clínica para solicitação
O que se espera encontrar
Como o resultado impacta a conduta
O plano deve deixar explícito o raciocínio clínico por trás de cada exame.

G) PRESCRIÇÃO HOSPITALAR
Em Sentence Case.
Desenvolver um plano terapêutico.
Modelo de prontuário, com doses e posologias.

H) CLASSIFICAÇÃO
Em Sentence Case.
Definir:
AMBULATORIAL
INTERNAMENTO EM ENFERMARIA
TERAPIA INTENSIVA
Justificar tecnicamente em 2 a 4 linhas com base em critérios clínicos, estabilidade hemodinâmica, necessidade de monitorização e suporte.

I) DISCUSSÃO CLÍNICA
Em Sentence Case.
Discussão aprofundada.
Fundamentar na literatura médica atual.
Explicar a fisiopatologia do quadro.
