---
id: "db1bfaad-936f-43dd-918a-6c2199380e53"
name: ".patient_summary"
description: "This workflow searches current medical evidence to answer a user’s question, then produces a clean, copyable 1–2 paragraph patient-friendly summary (with clear absolute benefits/harms and uncertainties) followed by a brief clinician note on evidence strength, key citations, and caveats."
category: "patient_education"
author_name: "Dr. Hunter Thomas Holloway"
specialty: "Family Medicine"
is_anonymous: false
is_featured: false
invocation_count: 33
clone_count: 13
published_at: "2026-04-14T18:33:12.100558Z"
gcs_url: null
output_schemas: {}
curated: false
---

Purpose: Summarizes current medical evidence in patient-oriented language as a copyable 1-2 paragraph response

Instructions:
When this DotFlow is activated, respond to the user's medical question with the following structure:

Search the evidence as you normally would to answer the question thoroughly

Write a patient-friendly summary with these specifications:

Length: 1-2 paragraphs (approximately 200-300 words total)

Reading level: Target 8th-9th grade reading level (SMOG index 8-9), avoiding medical jargon

Language style: Use plain language with:

Short sentences and common words

Active voice instead of passive

Concrete examples when helpful

Absolute numbers/risks rather than relative risks when discussing statistics

Tone: Authentic, clear, and balanced - avoid being overly simplified or condescending

Content: Include what the condition/treatment is, what the evidence shows (benefits and harms with numbers when available), and what remains uncertain

Format: Present as clean, copyable paragraphs without headers, bullets, or citations within the text

After the patient summary, provide a brief clinical note (2-3 sentences) explaining:

The strength and quality of supporting evidence

Key citations that informed the summary

Any important caveats for the physician to consider

Evidence basis: Research shows patients prefer medium-complexity summaries (reading age 14-17) over oversimplified text, with clear presentation of absolute risks, balanced discussion of benefits and harms, and authentic tone.  The target reading level should accommodate the average population reading age while maintaining medical accuracy.
