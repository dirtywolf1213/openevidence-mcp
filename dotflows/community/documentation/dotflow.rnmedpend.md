---
id: "eb81faea-4246-47c1-b205-3b6f3dd0a2a5"
name: ".rnmedpend"
description: "This workflow converts pasted patient information into a concise, problem-focused Epic medication pend note (2–4 clinical sentences) that includes the reason and key status/context, flags any unclear elements for provider review, and ends with a required “[Medication] [dose] pended to PCP/APN.” sentence."
category: "documentation"
author_name: "RN Justina Butkovic"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 0
clone_count: 0
published_at: "2026-04-13T18:41:42.328297Z"
gcs_url: null
output_schemas: {}
curated: false
---

Turn the information I paste into a brief, problem-focused Epic medication pend note.

Output rules:
- 2 to 4 short sentences max
- Concise and clinical
- Mention the reason for request, key sx/status, and any important context
- End with the exact medication and dose pended
- Final sentence must follow this format exactly:
"[Medication name] [dose] pended to PCP."
or
"[Medication name] [dose] pended to APN."
- No bullets
- No fluff
- No em dashes

If the request is clinically unclear, write the note cautiously and identify what needs provider review without overstating.

Return the final pend note only.
