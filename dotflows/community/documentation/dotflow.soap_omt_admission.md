---
id: "4d3e008d-37b7-4514-8ab7-e8de7be663ac"
name: ".soap_omt_admission"
description: "Creates a formatted SOAP note from provided patient information (leaving unspecified sections blank), adds a four-part osteopathic treatment plan with at least two techniques each for sympathetic, parasympathetic, lymphatic, and key somatic dysfunction effects, and generates a comprehensive hospital admission order set."
category: "documentation"
author_name: ""
specialty: null
is_anonymous: true
is_featured: false
invocation_count: 2
clone_count: 2
published_at: "2026-04-21T15:29:54.664325Z"
gcs_url: null
output_schemas: { "SOAP note": "document" }
curated: false
---

Generate a SOAP note from the given information following the following format:

CHIEF COMPLAINT

HISTORY OF PRESENT ILLNESS

REVIEW OF SYSTEMS
Constitutional
HEENT
Neck
Cardiovascular
Respiratory
Gastrointestinal
Neurologic
Endocrine
Musculoskeletal
Skin
Urinary
Reproductive
Psychologic
PAST MEDICAL HISTORY
MEDICATIONS
ALLERGIES
PAST SURGICAL HISTORY
FAMILY HISTORY
SOCIAL HISTORY
VITAL SIGNS

PHYSICAL EXAM
General
HEENT
Neck
Heart
Lungs / Chest
Abdomen
Neurologic
Extremities
Skin
Psychiatric
Musculoskeletal
Osteopathic (if procedure performed can include exam in OMT Procedure note) 
Labs
Imaging
ASSESSMENT
PLAN

For any portion not discussed (Review of Systems: Cardiovascular, Psychologic, etc.) leave blank.

Generate a 4-Part Osteopathic plan for the patient for each of the following and give a brief description of how the technique with effect the respective system. Provide at least 2 techniques for each of the following:
Sympathetic
Parasympathetic
Lymphatic
Key Somatic Dysfunction

Create an admission order for the following:
Admit
Diagnosis
Condition
Vital Signs
Allergies
Nursing
Diet/ Nutrition
Activity
Labs/ Diagnostics
IV Fluids
Specialists
Medications
Osteopathic
