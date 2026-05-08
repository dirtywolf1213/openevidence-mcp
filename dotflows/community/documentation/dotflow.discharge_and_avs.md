---
id: "8f2b1d29-73eb-41df-8493-ddc8ca7d62f3"
name: ".discharge_and_avs"
description: "The workflow takes a clinician’s discharge dictation plus pasted hospital records, parses them, and outputs a plain-text structured discharge summary and an EMR-ready after visit summary with strict formatting, tone, and brevity rules."
category: "documentation"
author_name: "Dr. Mike"
specialty: "Primary Care"
is_anonymous: false
is_featured: false
invocation_count: 1
clone_count: 1
published_at: "2026-05-04T22:37:18.908291Z"
gcs_url: null
output_schemas: { "discharge summary": "document", "after visit summary": "document" }
curated: false
---

This workflow should create:
1) a structured discharge summary 
2) an after visit summary
Instructions for each given below.

Input will consist of an initial dication monologue by me describing the key parts of the hospitalization and, importantly, the discharge including what the patient needs to do, follow up, etc. I may forget things though so you can also use the pasted information (described below).

Following the dictation, there will be pasted data from the hospitalization including from the H&P, progress and consult notes, copy/pasted labs, imaging, and other studies in various formats that you will need to parse.

Be sure to follow these rules:
- Do not use passive voice. 
- Do not use the semi-colon passive notation
- Match my voice and tone; do not sound like AI
- Do not use special charactes surch as arrows (instead use e.g. "-->"), emdash/endash (should be "--" or "---")
- New paragraphs should have a double newline separating them
- Bullet points should be plain text with dashes, e.g. "- this is a bullet" and "    - this is a sub-bullet"
- Bullets should have a single newline only (i.e. they are immediately after each other with no intervening space)
- Tables should be rich text and able to be pasted into the EHR
- Do not use markdown at any time

1) structured discharge summary
-----------------------------------

Use the data described above to create structured hospital discharge summary.

Do not use passive voice. Try to match the voice and tone of the notes and don't sound like AI. Use clipped sentences and medical abbreviations to reduce the length of text and make it easier to read by medical professionals, although be careful not to accidentally clip the sentence so much that meaning is lost. Use bullets where helpful and appropriate.

The discharge summary should be in plain text without any markdown (The "# " before each problem name is not markdown and should be included)

Use the following rules for the construction of the discharge summary:
- Keep follow up items brief and only include those that are important and actionable, do not include obvious hospital follow up things
- Hospital course should be separated into independent problems if there is more than one problem that was actively managed
- Stable problems can be grouped separately
- First line of the exam should briefly summarize pertinent findings
- Only include labs most pertinent to the problems; they should be in bullet point sentences with trends highlighted by arrows
- Problems should be organized from most to least important with the principal problem first
- Problem names always begin with "# " (e.g. "# Acute on chronic kidney injury, acute component resolved") - note, this is *not* markdown

Use the following template as guidance. It is formatted in markdown and the square braket template notation used by openevidence visits for clarity for you, but the resulting template should not use the included markdown elements or these explanations.

Template::

# General Information
Name, DOB

PCP

Consultants:
- Service, Name

Disposition:

# Follow up

Appointments

## Issues to be addressed at follow up appointments
1. 

# Hospital Course

Discharge Diagnoses

PATIENT ONE LINER

HOSPITAL COURSE 

## Procedures

# Discharge Condition
VITALS TREND

EXAM

## Studies
LAB TRENDS

PERTINENT IMAGING

CARDIAC STUDIES

PATHOLOGY


2) after visit summary
------------------------

Given the clinical information provided, format a Hospital Stay After Visit Summary (AVS).

Use rich text that can be pasted into an EMR. Use bold and italics and careful sentence structure to make it easy for the patient to understand. Sound like me, not AI.

Template:

You were seen here for [Brief reason for visit]. We did [brief list of labs, imaging, etc], which were consistent with [diagnosis or very brief differential]. 

[Brief summary of treatment, procedures, or medication changes]

INSTRUCTIONS:
• [Medication instructions, including dose and frequency]
• [Activity restrictions or recommendations]
• [Symptom monitoring guidance]
• [Any additional care instructions]

FOLLOW-UP:
[Follow-up appointment timeframe or referral information]

RETURN PRECAUTIONS:
Seek medical attention if you experience:
• [Specific warning symptoms]

MORE INFORMATION:
[Patient friendly overview of primary diagnosis, tailored specifically to their case]

Medication information:
[Brief summary of each medication including dosing, precautions, and possible side effects]
