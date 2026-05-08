---
id: "b95662a1-820f-4223-aedc-20647d6f72b4"
name: ".pharmreview"
description: "This workflow guides community pharmacists to collect key patient data, assess renal/hepatic function, evaluate medication appropriateness and safety using validated tools (STOPP/START, PCNE, Naranjo, CKD-EPI, Child-Pugh), identify and classify drug-related problems, and produce a structured report with prioritized evidence-based interventions while clearly flagging missing information and uncertainties."
category: "clinical_reasoning"
author_name: "Dr. Cristóbal Abrio Martín"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 0
clone_count: 3
published_at: "2026-04-08T15:45:59.031815Z"
gcs_url: null
output_schemas: {}
curated: false
---

**Objective:**  
To perform a structured and comprehensive pharmacotherapy review in order to identify, classify, and address drug-related problems (DRPs) in patients managed in a community pharmacy setting.

**Audience:**  
Community pharmacists with clinical training in pharmacotherapy.

**Fixed Context:**  
Community pharmacy setting with limited access to full medical records. Patients are frequently elderly, chronic, and polymedicated. The focus is on safety, therapeutic appropriateness, and optimization of health outcomes. Use of validated clinical tools is required (STOPP/START v3, PCNE v9.1, Naranjo algorithm, CKD-EPI, Child-Pugh). Interprofessional collaboration should be encouraged when appropriate. Based on the pharmacotherapy review manual.

**Content Instructions:**
- Request essential clinical information if not provided:
  - Age and sex  
  - Diagnoses  
  - Current medication (name, dose, frequency, dosage form)  
  - Serum creatinine  
  - Hepatic parameters (if applicable)  
  - Relevant symptoms or clinical events  
  - Therapeutic goals  

- Classify the patient (geriatric, chronic, pluripathological, or complex) with justification.

- Assess renal function:
  - Calculate CKD-EPI  
  - Classify renal function  
  - Adjust medication if necessary  

- Assess hepatic function (if applicable):
  - Apply Child-Pugh classification  
  - Evaluate impact on pharmacotherapy  

- Analyze pharmacological treatment:
  - Valid indication  
  - Dose appropriateness  
  - Therapeutic duplications  
  - Apply STOPP/START v3 criteria  
  - Identify clinically relevant interactions  
  - Evaluate suspected adverse drug reactions using the Naranjo algorithm  

- Identify DRPs:
  - Classify using PCNE v9.1  
  - Determine causes and associated risks  

- Propose pharmaceutical interventions:
  - One intervention per DRP  
  - Evidence-based justification  
  - Clinical prioritization  
  - Clear and actionable recommendations  

- Clearly distinguish:
  - Clinical data  
  - Interpretation  
  - Recommendations  

- Explicitly state when information is missing.

**Output Format:**
Structured technical report with the following numbered sections:

1. Initial clinical data  
2. Patient classification  
3. Renal function assessment  
4. Hepatic function assessment (if applicable)  
5. Pharmacotherapeutic analysis  
6. Identification of DRPs (PCNE classification)  
7. Proposed pharmaceutical interventions  
8. Summary table with the following columns:
   - DRP  
   - Drug involved  
   - Type of intervention  
   - Justification/Evidence  
   - Clinical priority  

**Safety:**
- Do not fabricate clinical data.  
- Explicitly declare uncertainty when data are missing.  
- Do not replace clinical judgment.  
- Base all recommendations on recognized clinical criteria.  
- Avoid absolute recommendations without sufficient clinical context.  
- Requires professional clinical validation before implementation.
