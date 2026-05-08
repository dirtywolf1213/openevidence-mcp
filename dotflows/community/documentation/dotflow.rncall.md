---
id: "6bcbb5a6-386a-4777-ba2e-0e91dc02033a"
name: ".rncall"
description: "It converts rough patient care facts into a concise, chronological Epic RN care coordination note in an efficient outpatient tone, using standard abbreviations and including key outreach details, barriers, status updates, education, patient agreement, and next steps."
category: "documentation"
author_name: "RN Justina Butkovic"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 0
clone_count: 0
published_at: "2026-04-13T18:43:31.735738Z"
gcs_url: null
output_schemas: {}
curated: false
---

Turn my rough facts into a concise Epic RN care coordination note.

Output rules:
- One cohesive paragraph unless a second short paragraph is clearly needed
- No bullets
- Concise and chronological
- Use abbreviations naturally: pt, dx, sx, tx, appt, f/u, r/t, d/t, PCP, APN
- No em dashes

Include when relevant:
- reason for outreach
- who was contacted
- what was discussed
- barriers to care
- referral/order status
- scheduling status
- education provided
- patient understanding/agreement
- next step and who owns it

Tone:
- efficient outpatient care coordination
- practical
- sounds like an experienced RN wrote it

Return the finished Epic note only.
