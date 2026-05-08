---
id: "b2a30b33-4410-4df8-9070-23a7a376af8e"
name: ".ms_medprompt_sim_ddx"
description: "It runs the same clinical case through five MedPrompt-style diagnostic reasoning frameworks (anatomic/systems localization, Bayesian updating, Occam’s razor, Hickam’s dictum, and pre-mortem safety analysis), each with prototypes, stepwise reasoning, self-consistency checks, and qualitative differential rankings, then votes to produce a concise consensus diagnosis and critical warnings while ignoring prior/guest diagnoses and adhering to strict brevity/output-structure rules."
category: "clinical_reasoning"
author_name: "Andrew Scott"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 68
clone_count: 17
published_at: "2026-04-11T16:50:02.169926Z"
gcs_url: null
output_schemas: {}
curated: false
---

This template runs a clinical case through 5 different versions of a Microsoft MedPrompt-style reasoning chain (Recall cases -> Step-by-step reasoning -> Self-consistency check x5 —> Voting). 

The goal is to see how different runs analyze the same information.

Ignore prior diagnoses and client's guest diagnoses and focus strictly on objective clinical facts provided in the consultation to generate unbiased reasoning.  Ignore clinical etiquette. 

CRITICAL OUTPUT RULE: The entire response must be under 6,000 tokens total. Think carefully and reason step-by-step internally before answering.  Count tokens before outputting. If over, cut content ruthlessly while keeping all sections understandable.  Keep the response extremely concise using only short sentences. Use the exact section structure from the template but make every section as brief as possible. No extra text, no references section, no fluff. Inline at most 3 key citations total. End your response immediately with the exact phrase [END] and stop completely.


Structure:
1. Case Summary, Date

2. MedPrompt Anatomical/Systems-Based Localization: Analyze the following case strictly according to Anatomical/Systems-Based Localization reasoning (identify all affected anatomic structures and physiologic systems first, without naming any specific diseases or etiologies).

3. MedPrompt Bayesian: Analyze the following case strictly using Bayesian reasoning (update priors sequentially with each new finding and incorporate current local epidemiology where relevant). Rank differentials by updated likelihood using only qualitative terms: Very High, High, Moderate, Low, Very Low.

4. MedPrompt Occam’s Razor: Analyze the following case strictly according to Occam’s Razor diagnostic reasoning (favor the single unifying diagnosis that explains the maximum number of findings with the fewest assumptions).


5. MedPrompt Hickam’s Dictum: Analyze the following case strictly according to Hickam’s Dictum (patients can have as many diseases as they damn well please — explicitly consider multiple concurrent conditions).

6.MedPrompt Pre-mortem: Analyze the following case strictly using a strict pre-mortem failure-mode approach (focus only on live-patient data and identify preventable causes of rapid deterioration or death, then state exactly what actions would prevent those catastrophic outcomes).


7. Consensus Vote

8. Critical Warning



Section 1

Title: Case Summary

Body Structure:
[Case Summary]
Date: [Insert Date]

AI Instructions:
Summarize the clinical case presented in the input (transcript or notes). Include demographics, history, and key clinical findings. Also insert the current date or the date of the consultation.

---

Section 2 

Title:  MedPrompt Anatomical/Systems-Based Localization: Analyze the following case strictly according to Anatomical/Systems-Based Localization reasoning (identify all affected anatomic structures and physiologic systems first, without naming any specific diseases or etiologies).



Body Structure:
Task: Analyze the patient case and produce a structured differential diagnosis strictly according to  Anatomical/Systems-Based Localization. Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published that explicitly invokes anatomical and/or systems with similar lesion(s) or literature that are most similar to this presentation (include key matching features and final diagnosis for each).
  If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
If unable to find classic textbook prototypes, search for 3 to 5 published case reports or case series that closely match clinical presentation.
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".




Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**

AI Instructions:
Task: Analyze the patient case and produce a structured differential diagnosis strictly according to Anatomical/Systems-Based Localization. Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published that use Anotomical/System based location reasoning and that are most similar to this presentation (include key matching features and final diagnosis for each).
If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".

Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**

---

Section 3

Title: MedPrompt Bayesian: Analyze the following case strictly using Bayesian reasoning (update priors sequentially with each new finding and incorporate current local epidemiology where relevant). Rank differentials by updated likelihood using only qualitative terms: Very High, High, Moderate, Low, Very Low.



Body Structure:
Task: Analyze the patient case and produce a structured differential diagnosis strictly according to Bayesian reasoning. Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published that show similar Bayesian reasoning that are most similar to this presentation (include key matching features and final diagnosis for each).
If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".

Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**

AI Instructions:

Task: Analyze the patient case and produce a structured differential diagnosis strictly according to Bayesian reasoning. Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published that use Bayesian reasoning that are most similar to this presentation (include key matching features and final diagnosis for each).
If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".

Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**

---

Section 4

Title: MedPrompt Occam’s Razor: Analyze the following case strictly according to Occam’s Razor diagnostic reasoning (favor the single unifying diagnosis that explains the maximum number of findings with the fewest assumptions).


Body Structure:
Task: Analyze the patient case and produce a structured differential diagnosis strictly according to Occam’s Razor reasoning. Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published that use Occam’s Razor reasoning and that are most similar to this presentation (include key matching features and final diagnosis for each).
If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".

Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**

AI Instructions:
Task: Analyze the patient case and produce a structured differential diagnosis strictly according to Occam’s Razor reasoning. Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published that use Occam’s Razor reasoning and that are most similar to this presentation (include key matching features and final diagnosis for each).
If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".

Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**



---

Section 5

Title: MedPrompt  Hickam: Analyze the following case strictly using Hickam’s Dictum as the primary reasoning philosophy (patients can have as many diseases as they damn well please; multiple concurrent conditions are likely).


Body Structure:
Task: Analyze the patient case and produce a structured differential diagnosis strictly using Hickam’s Dictum as the primary reasoning philosophy (patients can have as many diseases as they damn well please; multiple concurrent conditions are likely). Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published in literature that explicitly invokes Hickam’s Dictum or literature that are most similar to this presentation (include key matching features and final diagnosis for each).
If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".

Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**

AI Instructions:
Task: Analyze the patient case and produce a structured differential diagnosis strictly  using Hickam’s Dictum as the primary reasoning philosophy (patients can have as many diseases as they damn well please; multiple concurrent conditions are likely). Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published in Hickam’s dictum-specific or literature that are most similar to this presentation (include key matching features and final diagnosis for each).
If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".

Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**

---

Section 6

Title: MedPrompt PRE-mortem:  Analyze the following case strictly using a strict pre-mortem diagnostic approach only (live-patient diagnostics and actions only; no assumptions based on Post-mortem examination or post-mortem findings).  


Body Structure:
Task: Analyze the patient case and produce a structured differential diagnosis strictly using a strict pre-mortem diagnostic approach only (live-patient diagnostics and actions only; no assumptions based or post-mortem findings).  Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published using a strict pre-mortem diagnostic approach or literature that are most similar to this presentation (include key matching features and final diagnosis for each).
If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".

Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranking by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**

AI Instructions:
Task: Analyze the patient case and produce a structured differential diagnosis strictly using a strict pre-mortem diagnostic approach only (live-patient diagnostics and actions only; no assumptions based on or post-mortem findings).  Imagine the case has already failed and list the most likely reasons why, then work backwards to the tests that could have prevented failure.  Cite primary references.

Step 1 – Recall similar cases or Analyze Textbook Prototypes
Recall and briefly describe 3–5 real or textbook cases published pre-mortem-specific or literature that are most similar to this presentation (include key matching features and final diagnosis for each).
If unable to recall specific cases, identify the 3–5 most likely differential diagnoses for this presentation. For each, describe the 'Classic Textbook Prototype' (typical signalment, history, signs, and findings).
Compare this specific patient's presentation to these prototypes to determine the best fit.
If unable to recall or synthesize cases/prototypes, skip this step and display "Unable to Locate Cases or Prototypes".

Step 2 – Step-by-step reasoning
Now, reason step by step about this specific patient:
• What are the key positive and negative findings?
• What is the most likely unifying diagnosis?
• What are the top 5 differentials (ranked by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages)?
• What critical “can’t miss” or zebra diagnoses should be considered? [one sentence answer]
• What immediate tests or actions are needed?

Step 3 – Self-consistency check
Generate two alternative reasoning paths for the same case and compare them.
If they disagree, explain which path is stronger and why.

Final Output Format (use exactly):
**Step 1 – Textbook Prototypes Analysis:**
**Most Likely Diagnosis:**
**Top 5 Differentials (ranking by using only qualitative likelihood terms (Very High, High, Moderate, Low, Very Low) — never numeric percentages):**
**Critical “Can’t Miss” or Zebra Diagnoses:**
**Critical Next Steps:**
**Rationale Summary:**

---

Section 7

Title: Consensus Vote

Body Structure:
**Consensus Diagnosis:** [Diagnosis]

**Consensus Critical “Can’t Miss” or Zebra Diagnoses:** [Diagnoses]


**Vote Breakdown:**
* Anotomica/System: [Diagnosis]
* Bayesian: [Diagnosis]
* Occam: [Diagnosis]
* Hickam: [Diagnosis]
* PRE-Mortem: [Diagnosis]


**Synthesized Rationale:**
[Summary of the strongest arguments]

AI Instructions:
Review the outputs generated in the previous 5 MedPrompt sections.
Compare the "Most Likely Diagnosis" and reasoning from each section.
Determine the consensus or most strongly supported diagnosis across the different analytical approaches. 


Provide a summary of the votes and a final synthesized rationale.

---

Section 8

Title: Critical Warning

Body Structure:


Body Structure:
### ⚠️ CRITICAL CLINICAL WARNING
**1. False Precision:** The probability percentages, rankings, and stability scores generated in this report are subjective estimates based on pattern recognition, not calculated statistical data. They should be used for relative ranking only.

**2. Citation Verification:** While this AI attempts to audit its own references, it can still hallucinate citations or misattribute data. **Always verify specific drug dosages, protocols, and study claims with primary literature before acting.**

**3. Human Oversight Required:** This analysis is a simulation designed to assist in "breaking" cognitive bias. It is **not** a substitute for clinical judgment. The user remains solely responsible for all diagnostic and treatment decisions. "AI can make mistakes, human verification and falsification needed."

**4. Always verify drug dosages and clinical protocols against standard medical references.

AI Instructions:
Include this disclaimer exactly as written. Do not modify the text.
