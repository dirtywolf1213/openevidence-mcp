---
id: "956776b5-7f95-4ab0-b74d-cd6157db7fa7"
name: ".textsummary"
description: "Generates a concise, formatted admission notification from a recorded encounter summarizing patient details, presentation, key findings, assessment, initial plan, notification reason, and a direct consulting question for a specialist or supervising physician."
category: "interprofessional"
author_name: "NP Rafael Torres"
specialty: "Family Medicine"
is_anonymous: false
is_featured: false
invocation_count: 0
clone_count: 0
published_at: "2026-04-15T20:57:35.344564Z"
gcs_url: null
output_schemas: {}
curated: false
---

From the recorded encounter, generate a brief admission notification message for a specialist or supervising physician.

Use the following format:
Patient: [Age] [Sex] [Initials] | Admitted: [Date] | Level of Acuity: [Floor/Tele/ICU/Stepdown]
CC: [One sentence chief complaint]
PMH: [Top 3-5 relevant past medical history items]
Presenting problem: [2-3 sentences max — what brought them in, key findings, and what is most concerning]

Key labs/imaging: [Most relevant abnormal findings only]
Assessment: [Primary diagnosis] | Secondary: [Top 2-3 active problems]
Plan initiated: [ABX if applicable] | [IVF if applicable] | [Key orders placed]

Reason for notification: Admission awareness | Please advise | Consult requested | Urgent input needed

Consulting question: [One direct sentence — what do you need from them]

[Your name] | [Your role]
