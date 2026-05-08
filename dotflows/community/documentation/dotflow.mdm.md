---
id: "c1d5def9-b2e8-42cd-bd28-f15e293a1070"
name: ".mdm"
description: "A Cerner-friendly emergency department MDM documentation workflow that guides clinicians to rapidly customize a three-part narrative (MDM, disposition, and coding) using underscore placeholders, delete unused sections, document differential reasoning and rule-outs, include shared decision-making and return precautions, and ensure 2023+ E/M billing compliance without templated cloning."
category: "documentation"
author_name: "Dr. Christian Treat"
specialty: "Emergency Medicine"
is_anonymous: false
is_featured: false
invocation_count: 1029
clone_count: 190
published_at: "2026-04-01T12:13:29.563785Z"
gcs_url: null
output_schemas: {}
curated: false
---

Emergency Medicine MDM Documentation
Comprehensive template for documenting medical decision-making in emergency medicine encounters, optimized for Cerner EHR navigation using underscores and designed to meet 2023+ E/M coding requirements while maintaining natural clinical narrative. As it is going into a medical chart do not include citations and references in the output. 
Core Template Structure
The template follows a three-section design and note use of returns for consistent formatting of headings:

MDM Section: Clinical narrative showing diagnostic reasoning, differential diagnosis, workup, and treatment. Keep each differential considered and reasoning under three sentences or less. 
Disposition Section: Patient outcome, shared decision-making, and discharge/admission details. If patient is admitted can note that and keep it one sentence or less. If discharged go into discharge counseling and return precautions in four sentences or less. . 
Coding Section: Administrative elements required for E/M billing compliance

Navigation Strategy

Use underscore placeholders _text_ for rapid navigation in Cerner
Delete unused sections with Ctrl+Shift+Left/Right arrow keys
Customize every encounter - never use verbatim text across patients

Master Template
MDM
=======
_age_-year-old _gender_ with _pmh_ 
presenting with _chief_complaint_duration_context_
_pertinent_positives_and_negatives_.

My initial differential diagnosis included _list_of_ddx_

_Most_concerning_diagnosis_ was _highly_concerning_less_likely_ruled_out_ based on _specific_clinical_features_history_exam_findings_. _If_tested_ To investigate this further I ordered _tests_. The _test_results_ _made_diagnosis_highly_unlikely_confirmed_ruled_out_.

_Second_serious_diagnosis_ was _considered_ruled_out_ because _reasoning_specific_findings_.

_Third_diagnosis_ was _likely_unlikely_ given _clinical_features_. _Workup_performed_if_any_ showed _findings_.

_Additional_diagnoses_as_needed_ _reasoning_for_consideration_exclusion_.

At that point, I felt the diagnosis was most likely _final_working_diagnosis_. _Brief_treatment_plan_approach_.

_risk_score_delete_if_not_used_
_Score_name_: _components_calculation_ = _result_ which _supported_influenced_ _clinical_decision_made_.

Initial plan: _plan_ 
_EKG
_POCUS
_reassessment
_labs
_imaging_results
_consultants

-------
Disposition
=======
_shared_decision_making
In shared decision-making with the patient, _discussed_specific_decision_options_with_risks_benefits_. Patient _understood_was_comfortable_with_ _plan_chosen_ and _verbalizes_understanding_of_key_points_.

_admit_delete_others_
_reason_why_hospitalization_necessary_
Patient admitted to _service_level_of_care_ 

_discharge_delete_others_
Patient improved after _intervention_. I felt the patient could be treated _treatment_approach_outpatient_plan_ and follow up _when_with_whom_. Patient was discharged in stable condition.
_discharge_information_and_followup_timeframe
_specific_return_precautions
Patient verbalizes understanding of diagnosis, treatment plan, medications, follow-up arrangements, and return precautions.

-------
Information for Coding and Billing 
=======
Problems addressed: _acute_illness_with_systemic_symptoms_ OR _threat_to_life_or_bodily_function_ OR _chronic_illness_with_severe_exacerbation_ OR _undiagnosed_new_problem_uncertain_prognosis_ OR _acute_complicated_injury_

Data Reviewed
Tests/imaging/records: _list_labs_imaging_external_records_independent_historian_old_records_
Independent interpretation: _If_independently_interpreted_ Personally reviewed 
External provider discussion: _If_discussed_external_ Discussed with 

Risk: _decision_regarding_hospitalization_ OR _drug_therapy_requiring_intensive_monitoring_specify_ OR _emergency_surgery_ OR _parenteral_controlled_substances_ OR _iv_contrast_ OR _prescription_drug_management_
Documentation Philosophy
Greg Henry's Principle: "Include what you were thinking and why you were thinking this. It's okay to be human. The enemy of good is perfection."
Key Guidelines

Authentic thinking: Document actual clinical reasoning, not defensive checklists
Mention considered diagnoses: Better to document a diagnosis you ruled out clinically than omit it entirely
Natural language: Use "I thought," "I felt," "At that point" - sounds human
Rule-out documentation: Show you systematically considered serious diagnoses even if not present
Narrative style: Flows naturally for consultants and medical-legal review

What Makes Defensible Documentation
From physicians experienced in malpractice defense:

Document what you considered - even if ruled out without workup
Show clinical reasoning - "ruled out on the basis of [specific findings]"
Point to supporting evidence - reference exam findings, test results
Don't over-document - extensive and sparse documenters both succeed if they show clinical thinking
Avoid templates that look canned - customize each encounter

Chief Complaint Variations
For common presentations, see references/chief-complaints.md for differential diagnosis frameworks including:

Chest pain (ACS, PE, dissection, pneumothorax, etc.)
Abdominal pain (appendicitis, AAA, bowel obstruction, ectopic, etc.)
Altered mental status (stroke, infection, metabolic, toxicologic, etc.)
Dyspnea (PE, MI, pneumothorax, CHF, pneumonia, etc.)
Headache (SAH, meningitis, mass, dissection, etc.)
Trauma (systematic body region evaluation)

Risk Stratification Tools
Common validated scoring systems to integrate when applicable:

HEART Score (chest pain/ACS risk): H=history, E=EKG, A=age, R=risk factors, T=troponin
PERC Rule (PE exclusion): 8 criteria, all must be met for <2% PE risk
Wells Score (PE probability): Stratifies to PE likely vs unlikely
ABCD2 Score (TIA stroke risk): 2-day stroke risk stratification
Canadian CT Head Rule (need for head imaging post-trauma)
Canadian C-Spine Rule (clinical clearance criteria)

Document score components and how the result influenced clinical decision-making.
2023+ E/M Coding Quick Reference
See references/coding-elements.md for complete details.
Need 2 of 3 elements at same level:

Problems Addressed: High = threat to life/bodily function or severe exacerbation; Moderate = acute with systemic symptoms
Data Reviewed: Need categories not points; High = 2 of 3 categories (tests/records, independent interpretation, external discussion)
Risk: High = hospitalization decision, drug requiring monitoring, parenteral controlled substances, IV contrast

Common pitfalls:

Not documenting independent interpretation explicitly
Failing to state which 2 of 3 elements met
Not documenting serious diagnoses that were ruled out
Inadequate return precautions

Workflow

Open template in Cerner
Navigate using underscores, fill in patient-specific details
Delete unused sections (Ctrl+Shift arrow keys)
Customize differential diagnosis narrative to actual clinical thinking
Document reassessments with objective findings
Complete disposition with specific plans
Verify coding section captures 2 of 3 elements at appropriate level
Review for cloning - ensure patient-specific throughout

Compliance Considerations

Never copy-paste >20% of previous notes
Always customize template text for specific patient
Document rule-outs to justify workup complexity
State independent interpretation explicitly when reviewing images/EKGs yourself
Verify return precautions are specific to diagnosis and severity
Avoid contradictions between clinical narrative and exam findings

Common Scenarios
High complexity (99285): Threat to life/bodily function + 2 data categories + hospitalization decision
Moderate complexity (99284): Acute illness with systemic symptoms + moderate workup + prescription management
Discharge with SDM: Document options discussed, risks explained, patient preference, understanding verified
Against medical advice: Document recommended care, risks explained, patient capacity, understanding of risks
