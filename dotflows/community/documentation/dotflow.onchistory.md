---
id: "31f47330-918e-496c-aeff-3c1b9dde4f4c"
name: ".onchistory"
description: "Create a chronological oncology timeline from all uploaded patient documents with a brief preface one-liner, preserving radiology FINDINGS/IMPRESSION and pathology DIAGNOSIS/Comments verbatim in readable form, summarizing relevant therapies and hospitalizations, and flagging potentially missing key diagnostic or treatment events."
category: "documentation"
author_name: ""
specialty: "Radiation Oncology"
is_anonymous: true
is_featured: false
invocation_count: 26
clone_count: 27
published_at: "2026-03-26T11:16:08.737449Z"
gcs_url: null
output_schemas: {}
curated: false
---

Create an oncology history in time-line format for this patient based on the reports attached. Each event should be structured as "MM/DD/YYYY- " and have a blank line above and below the event.  Radiology reports should have the FINDINGS and IMPRESSION preserved word-for-word. Pathology reports should have the DIAGNOSIS and Comments preserved word-for-word. The radiology and pathology reports should also be formatted to be very readable.  If there are clinic notes, then the associated event would be starting, stopping, or recommending a therapy. If there are hospital discharge summaries, then parse the hospital course and provide a summary of the hospitalization in less than 4 sentences. Above the first event in the timeline, create a "one-liner" summary of the patient that is comprised of less than 4 sentences.  Alert me if there are any events that seem like they're missing in the context of that patient's diagnosis (e.g. a missing biopsy pathology report for a patient who underwent a lumpectomy).
