---
id: "afea9002-bb6d-402a-abfc-9a810bdd2f7b"
name: ".primary_care_clinic_visit"
description: "This workflow generates a CMS-compliant outpatient primary care note in narrative paragraph form (no bullets) that includes CC, HPI, ROS, focused physical exam, assessment with clinical reasoning, detailed plan with medication specifics, and patient education tailored to the patient’s complaint and age."
category: "documentation"
author_name: "NP Jane Shiti"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 1
clone_count: 0
published_at: "2026-05-07T19:23:22.817652Z"
gcs_url: null
output_schemas: { "Produce a complete outpatient primary care SOAP-style or integrated note that is clinically thorough, billing-supportive, and suitable for direct use in outpatient primary care practice documentation.": "document" }
curated: false
---

Generate a structured primary care outpatient note using the following workflow and documentation standards:

1. **Chief Complaint (CC)**

   * Begin with the patient’s primary concern in the patient’s own words whenever possible.

2. **History of Present Illness (HPI)**

   * Provide a detailed and clinically organized HPI.
   * Include:

     * Symptom onset
     * Duration
     * Severity
     * Frequency
     * Associated symptoms
     * Aggravating/alleviating factors
     * Relevant past medical history
     * Medication adherence and response
     * Recent hospitalizations, ER visits, or specialist care
     * Functional impact
     * Pertinent social or lifestyle factors

3. **Review of Systems (ROS)**

   * Generate a focused but clinically appropriate ROS based on the presenting complaint.
   * Include pertinent positives and negatives for:

     * Constitutional
     * Cardiovascular
     * Respiratory
     * Gastrointestinal
     * Genitourinary
     * Musculoskeletal
     * Neurologic
     * Psychiatric
     * Endocrine
     * Skin
     * Other relevant systems depending on the concern

4. **Physical Examination**

   * Generate a focused but appropriate physical exam tailored to the chief complaint and visit type.
   * Include:

     * General appearance
     * Vital signs (if available)
     * Cardiovascular
     * Respiratory
     * Gastrointestinal
     * Musculoskeletal
     * Neurologic
     * Skin
     * Psychiatric
     * Other systems relevant to the complaint

5. **Assessment**

   * Provide a clinically sound assessment including:

     * Primary diagnosis
     * Secondary diagnoses/chronic conditions addressed
     * Differential diagnoses when appropriate
     * Severity/status of conditions
     * Relevant clinical interpretation and reasoning

6. **Plan of Care**

   * Provide a detailed outpatient management plan including:

     * Medication recommendations or adjustments
     * Diagnostic testing/labs/imaging
     * Referrals or consultations
     * Chronic disease management
     * Preventive care recommendations
     * Lifestyle interventions
     * Monitoring parameters
     * Follow-up timeline
     * Emergency precautions/red flag education

7. **Medication Recommendations**

   * Include:

     * Medication name
     * Dosage
     * Frequency
     * Indication
     * Monitoring requirements
     * Side effects and precautions

8. **Patient Education / Teaching Notes**

   * Include a dedicated teaching section documenting education provided to the patient and/or caregiver.
   * Cover:

     * Diagnosis and disease process education
     * Medication teaching and adherence
     * Lifestyle modifications (diet, exercise, smoking cessation, hydration, sleep, etc.)
     * Blood pressure/glucose/home monitoring if relevant
     * Warning signs requiring urgent evaluation
     * Follow-up compliance importance
     * Preventive health counseling when applicable
   * Document patient understanding and participation in shared decision-making.

9. **Documentation Style Requirements**

   * Use professional outpatient primary care documentation language.
   * Maintain CMS-compliant and medically appropriate terminology.
   * Ensure documentation supports medical decision-making and outpatient billing requirements.
   * Keep the note organized, clinically relevant, and concise while thorough.
   * Tailor the documentation to the patient’s age group and presenting complaint.
