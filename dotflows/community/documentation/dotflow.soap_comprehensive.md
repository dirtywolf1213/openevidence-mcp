---
id: "4f80599d-602d-4d57-a029-140ce2507d49"
name: ".soap_comprehensive"
description: "This workflow generates concise, high-quality, evidence-based SOAP notes that clearly retell the patient’s story, present a robust differential with explicit clinical reasoning, and provide problem-oriented, actionable plans while minimizing note bloat and flagging missing inputs with placeholders."
category: "documentation"
author_name: "Dr. Quinn Caslow"
specialty: "Family Medicine"
is_anonymous: false
is_featured: false
invocation_count: 936
clone_count: 443
published_at: "2026-03-23T13:03:46.974727Z"
gcs_url: null
output_schemas: { "SOAP Note": "document" }
curated: false
---

DotFlow Purpose:
Generate comprehensive, evidence-based SOAP notes with robust differential diagnoses, accurate assessments, and actionable plans that facilitate excellent patient care and clinical communication.

Target Audience:
Attending physicians across all specialties

Residents and fellows

Advanced practice providers (NPs, PAs)

Any clinician documenting patient encounters

DotFlow Instructions:
Core Documentation Principles:

Follow the American College of Physicians' fundamental principle: clinical documentation should "record, tabulate, communicate" with the primary purpose of supporting patient care and improving clinical outcomes through enhanced communication. 
Emphasize clarity, brevity, and attention to the needs of other readers. 

SUBJECTIVE Section:

Capture the patient's story in sufficient detail to retell it accurately 

Include chief complaint, history of present illness with pertinent positives and negatives

Document relevant past medical history, medications, allergies, family history, and social history

Focus on information relevant to the current complaint; avoid duplicating data recorded elsewhere 

When reviewing previously documented information that remains accurate, note the review rather than copying forward unchanged data 

OBJECTIVE Section:

Document vital signs and focused physical examination findings relevant to the presenting problem

Include pertinent positive and negative findings

Document data reviewed and analyzed, including test results ordered, reviewed, or interpreted 

Note discussions with other medical providers or independent historians 

Avoid documenting obvious information or irrelevant negative findings that contribute to "note bloat" 

ASSESSMENT Section - Differential Diagnosis:

The Assessment must demonstrate robust clinical reasoning with a well-developed differential diagnosis: 

Problem Representation: Create a concise summary statement that captures the patient's presentation using semantic qualifiers (paired, opposing descriptors) 

Differential Diagnosis Structure:

List 3-5 diagnostic possibilities organized by likelihood, urgency, or organ system as clinically appropriate

For each diagnosis, include:

Defining features: Clinical characteristics that support this diagnosis

Discriminating features: Findings that distinguish it from alternative diagnoses

Supporting evidence: Specific data points from history, exam, or testing

Evidence against: Findings that make this diagnosis less likely

Lead Diagnosis Justification: Provide explicit reasoning for why the leading diagnosis is most likely, referencing specific clinical data 

Diagnostic Uncertainty: When present, express uncertainty appropriately using qualifiers like "probable," "suspected," "possible," or "cannot rule out". Avoid inappropriate use of symptom-based ICD codes when a definitive diagnosis cannot be made 

Clinical Reasoning Transparency: Document what you were thinking and why particular courses of action were or were not pursued 

PLAN Section:

The Plan should be comprehensive, problem-oriented, and actionable: 

Problem-Based Organization: Address each problem separately with its own plan

For Each Problem, Document:

Diagnostic workup: Specific tests ordered with clinical rationale

Therapeutic interventions: Medications, procedures, or treatments with dosing/details

Monitoring plan: Follow-up timing, parameters to track, safety monitoring

Consultations: Specialist referrals with specific questions to be addressed

Patient education: Key counseling points provided

Disposition: Next steps, return precautions, escalation criteria

Medical Decision-Making: Document the complexity of decision-making, including:

Patient comorbidities and disease severity that impact the plan 

Risk-benefit considerations

Shared decision-making discussions

Barriers to care and mitigation strategies

Care Coordination: When relevant, document coordination with other providers or care team members 

Documentation Quality Standards:

Conciseness: Be as concise as possible while conveying necessary information. Avoid superfluous documentation that obscures key findings 

Accuracy: Ensure all documented information is accurate and supports the clinical narrative

Completeness: Include all elements necessary to understand the encounter's nature and complexity. If the inputs by the user are not complete or comprehensive enough to satisfy all necessary outputs, create placeholder wildcards like "{Patient Name}" or "[Heart Rate]" that can warn the user of the missing information and or be filled in later.

Clarity: Use clear, professional language; avoid ambiguous terminology

Traceability: When referencing prior data, indicate the source 

Legibility: Ensure all entries are clear and include appropriate patient identification, but also ensure it is formatted consistently for ease of reading for other healthcare providers.

Special Considerations:
Comorbidities: Actively document relevant comorbidities that impact medical decision-making, using appropriate qualifiers when needed 

Time-Based Coding: When applicable, document total time spent and activities performed 

Templates/Macros: May be used for standardized sections (ROS, physical exam) but must be supplemented with patient-specific narrative content 

Avoid: Excessive negative findings, irrelevant differential diagnoses, and defensive documentation that doesn't improve patient care 

Output Format:
Structure the note with clear section headers (SUBJECTIVE, OBJECTIVE, ASSESSMENT, PLAN) using standard SOAP format. Within Assessment and Plan, use problem-oriented subheadings as appropriate. Ensure it is formatted well and in a consistent mander for ease of understanding by other healthcare providers.

Input Requirements:
Users should provide:

Patient demographics and encounter context

Clinical information gathered (history, exam, test results)

Any specific documentation requirements (e.g., billing level, specialty-specific needs)

Expected Output:
A complete SOAP note that:

✓ Tells the patient's story clearly and concisely

✓ Includes a thoughtful differential diagnosis with explicit clinical reasoning

✓ Provides an accurate assessment with supporting evidence

✓ Contains a comprehensive, actionable plan for each problem

✓ Facilitates seamless communication with other providers

✓ Meets documentation standards for quality patient care

Validation Checklist:
Before finalizing, verify the note includes:

Clear problem representation in Assessment

At least 3 differential diagnoses with supporting/refuting evidence

Explicit reasoning for lead diagnosis

Problem-based Plan with specific, actionable items

Documentation of medical decision-making complexity

Appropriate use of diagnostic qualifiers when uncertain

Concise language without unnecessary duplication

All relevant comorbidities that impact care
