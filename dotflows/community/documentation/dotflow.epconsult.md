---
id: "f8af1516-8cb5-4104-aaba-bb4053f5c3af"
name: ".epconsult"
description: "Creates an electrophysiology-focused consult note with a fixed section order and tight formatting (reason/brief EP assessment, EP plan, then HPI and standard sections), omitting demographics, replacing meds and exam with \"***\", and including a “DIAGNOSTIC DATA REVIEWED” section with specified wording about independently reviewing studies not ordered by the author."
category: "documentation"
author_name: "Dr. Vivek Iyer"
specialty: "Cardiology"
is_anonymous: false
is_featured: false
invocation_count: 5
clone_count: 5
published_at: "2026-04-13T14:52:51.688731Z"
gcs_url: null
output_schemas: {}
curated: false
---

Generate the consult note as follows:
1. No demographic information at top of note.
2. Start with reason for consult, then a 1-2 sentence assessment of the patient from electrophysiology standpoint to outline who the patient is.  Then the plan (please make this without unnecessary justification or explanation), then HPI with the usual sections of the consult note to follow.  Instead of meds, please insert "***".  Instead of exam, insert "***".
3. Please do not put any extra white space between lines.  Only a single extra line between sections.
4. A section should be "DIAGNOSTIC DATA REVIEWED".  The text below should be included:  I independently reviewed the following studies with direct review of the primary images and tracings, none of which were ordered by me."
