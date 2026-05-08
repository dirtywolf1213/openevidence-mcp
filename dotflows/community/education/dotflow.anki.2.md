---
id: "cd70cea0-0e72-4b47-8af9-bb8d306a2348"
name: ".anki"
description: "Transforma um tema médico em um conjunto de flashcards Anki de alto rendimento para provas de residência, usando HTML com cloze deletion (sem {{c1::}}), máxima atomicidade, repetição estratégica e incluindo obrigatoriamente definição, classificação, achados clínicos fragmentados, diagnóstico, conduta, fatores de risco, exames, casos clínicos padrão-prova e diferenciais, com campo “extra” apenas quando útil."
category: "education"
author_name: "Arlindo Rodrigues Resende"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 4
clone_count: 1
published_at: "2026-05-03T23:15:31.669418Z"
gcs_url: null
output_schemas: { "memorização": "document" }
curated: false
---

OBJETIVO PRINCIPAL:
Crie flashcards no formato Oclusão de Palavras, ou Cloze Deletion, a partir dos achados definidores, clássicos, frequentes e altamente cobrados do tema.

Foco em características que DEFINEM a condição, ou seja, achados clínicos, laboratoriais, de imagem, diagnósticos, condutas, complicações e diferenciais que aparecem de forma recorrente, clássica ou altamente característica em provas de residência médica.

Não crie flashcards sobre informações raras, excessivamente específicas, situacionais ou pouco cobradas, a menos que sejam fundamentais para diferenciar diagnósticos ou sejam clássicas de prova.

Use como base fontes médicas confiáveis e atuais, como diretrizes clínicas, consensos, revisões sistemáticas, meta-análises e livros-texto médicos reconhecidos.

ANTES DE CRIAR OS FLASHCARDS:
Identifique se o tema é:

(A) uma doença/condição única;
ou
(B) um quadro clínico/sindrômico com múltiplas causas, etiologias ou subtipos.

Se for (A), crie flashcards seguindo o modelo padrão.
Se for (B), organize os flashcards comparando as principais etiologias/subtipos, destacando o que define cada uma e o que diferencia uma da outra.

REGRAS ESTRITAS DE FORMATAÇÃO:

1. Use exclusivamente o formato Cloze Deletion:
{{c1::Resposta::Dica}}

2. A dica deve orientar o raciocínio, sem entregar a resposta.
A ideia é a dica orientar a atomicidade do flashcard, auxiliando na resposta e impedindo ambiguidade ou multiplas respostas para uma informação omitda.
Objetivos da dica:
Definir a categoria da resposta (ex: diagnóstico, tempo, tratamento, causa, exame)
Garantir que exista apenas uma resposta correta possível
Manter a atomicidade do flashcard (um único conceito por card)
Evitar interpretações múltiplas para o mesmo cloze
A dica NÃO deve:
Entregar diretamente a resposta
Ser vaga (ex: “conceito”, “coisa”, “dado”)
Ser redundante com o enunciado.
A dica DEVE:

Especificar o tipo de informação pedida
Ajudar a diferenciar de outras alternativas semelhantes
Direcionar o raciocínio clínico


3. Omita apenas o termo-chave.
Não oculte frases inteiras longas.
Errado:
{{c1::A placenta prévia causa sangramento vaginal indolor no terceiro trimestre::quadro típico}}

Certo:
A placenta prévia causa sangramento vaginal {{c1::indolor::característica clínica}} no terceiro trimestre.

4. Cada flashcard deve testar apenas UM conceito, achado, conduta, diferença ou passo lógico por vez.

5. Não crie cards com múltiplas respostas independentes no mesmo cloze, exceto quando for uma tríade, mnemônico clássico ou conjunto inseparável de achados definidores.
Nesses casos pode fazer listas como (sempre apresentado apenas as principas listagens): 
Fatores de risco para tal doença:
fato 1;
fator 2;
fator 3.

6. Evite listas extensas dentro do cloze.
Quando houver muitos achados, coloque apenas dos definidores/patognomonicos.

7. É permitido criar cards com listagem de achados clínicos, fatores de risco ou critérios, desde que:
- estejam separados por condição clínica;
- sejam altamente cobrados;
- sejam realmente definidores;
- não virem listas longas demais (máx 4).

8. Mantenha os flashcards curtos, claros e objetivos.

9. Use linguagem médica precisa, mas didática.

10. Não use explicações longas após o flashcard, salvo quando uma breve observação for essencial para evitar erro de prova.

ORGANIZAÇÃO DOS FLASHCARDS:

Crie os flashcards nas seguintes seções:

1. Ideia central da condição
Crie cards sobre:
- definição essencial;
- fisiopatologia central;
- “cara de prova”;
- padrão clássico do diagnóstico.

2. Achados clínicos definidores
Crie cards sobre:
- sintomas clássicos;
- sinais de exame físico;
- achados semiológicos sugestivos;
- achados que costumam estar presentes no quadro típico.

Diferencie nos cards:
- achado comum;
- achado clássico de prova;
- achado específico/patognomônico;
- achado possível, mas não definidor.

3. Achados laboratoriais definidores
Crie cards sobre:
- exames laboratoriais mais característicos;
- alterações típicas;
- exames que sustentam o diagnóstico;
- marcadores que aparecem em provas.

4. Achados de imagem definidores
Crie cards sobre:
- melhor exame de imagem inicial;
- exame mais importante;
- achados clássicos;
- achados específicos ou altamente sugestivos.

5. Diagnóstico
Crie cards sobre:
- exame inicial mais útil;
- exame confirmatório;
- padrão-ouro, se existir (principal);
- critérios diagnósticos importantes;
- achados que fecham ou praticamente fecham o diagnóstico.


7. Apresentação clínica típica
Crie cards sobre:
- perfil típico do paciente;
- queixa principal mais provável;
- evolução temporal típica;
- como aparece em caso clínico;
- conjunto clássico de achados.

8. Classificações, subtipos ou etiologias
Se houver subtipos relevantes, crie cards comparativos sobre:
- característica definidora de cada subtipo;
- quadro clínico típico;
- achado laboratorial ou de imagem mais útil;
- conduta principal;
- diferença essencial entre os subtipos.

Se não houver subtipos relevantes para prova, não force essa seção.

9. Conduta e tratamento
Crie cards sobre:
- primeira conduta;
- conduta inicial em situação aguda;
- primeira linha de tratamento;
- alternativas importantes;
- conduta conforme gravidade;
- contraindicações clássicas;
- “o que não fazer” em prova.

Evite doses, esquemas muito específicos ou exceções raras, salvo se forem muito cobrados.

10. Complicações importantes
Crie cards apenas sobre:
- complicações mais frequentes;
- complicações mais graves;
- complicações clássicas de prova.

11. Diagnósticos diferenciais principais
Crie cards comparativos com os 3 principais diferenciais.

Para cada diferencial, crie cards sobre:
- por que parece com a condição principal;
- achado que diferencia;
- exame que ajuda a excluir;
- padrão clínico típico.

Priorize diferenciais prováveis e cobrados em residência.

12. Resumo final de memorização
Crie cards com:
- frases de alto rendimento;
- padrões clássicos de prova;
- achados obrigatórios;
- principais pegadinhas;
- associações mentais úteis.

REGRAS DE QUALIDADE:

- Priorize o que é definidor, clássico, frequente e cobrado.
- Evite revisão enciclopédica.
- Não crie cards sobre curiosidades.
- Não crie cards sobre achados raros sem relevância para prova.
- Não misture diagnóstico, conduta e fisiopatologia no mesmo card.
- Não use cards longos.
- Não crie cards vagos.
- Não use perguntas abertas fora do formato cloze.
- Não repita o mesmo conceito várias vezes com palavras diferentes, a menos que seja uma pegadinha muito importante.
- Sempre que houver múltiplas causas ou subtipos, compare diretamente.
- Sempre destaque diferenças que ajudam a acertar caso clínico.
- O foco é prova de residência médica, raciocínio clínico e memorização eficiente no Anki.

FORMATO FINAL DA RESPOSTA:

Organize a saída assim:

## 1. Ideia central
- Flashcards em cloze

## 2. Achados clínicos definidores
- Flashcards em cloze

## 3. Achados laboratoriais definidores
- Flashcards em cloze

## 4. Achados de imagem definidores
- Flashcards em cloze

## 5. Diagnóstico
- Flashcards em cloze

## 6. O que mais cai em provas
- Flashcards em cloze

## 7. Apresentação clínica típica
- Flashcards em cloze

## 8. Classificações / subtipos / etiologias
- Flashcards em cloze

## 9. Conduta e tratamento
- Flashcards em cloze

## 10. Complicações
- Flashcards em cloze

## 11. Diagnósticos diferenciais
- Flashcards em cloze

## 12. Resumo final de memorização
- Flashcards em cloze

Ao final, revise os cards e remova:
- cards repetidos;
- cards muito longos;
- cards com mais de um conceito;
- cards baseados em exceções raras;
- cards pouco úteis para prova.

ENTREGUE APENAS OS FLASHCARDS, SEM TEXTO INTRODUTÓRIO LONGO.
```
