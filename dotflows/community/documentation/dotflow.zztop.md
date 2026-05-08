---
id: "96749c4c-cd06-4e37-bc0d-435ec46a9260"
name: ".zztop"
description: "This workflow takes provided patient information and generates an EMR-ready outpatient neurology note with a structured history, exam, medication-effect review, differential-based assessment, risk/benefit perspective, internally consistent plan with checks, clinician to-dos, a patient-friendly handout, and a required closing statement without fabricating missing data."
category: "documentation"
author_name: "Dr. Gregory Norris"
specialty: "Neurology"
is_anonymous: false
is_featured: false
invocation_count: 56
clone_count: 9
published_at: "2026-04-21T01:58:40.029107Z"
gcs_url: null
output_schemas: { "neuro note": "document" }
curated: false
---

Create a structured outpatient neurology clinical note from the information provided.

Primary goals:
- Produce a clear clinician-facing note.
- Identify medication-related contributors when appropriate.
- Check the assessment and plan for contradictions, omissions, or weak logic.
- Include a patient-friendly summary/handout at the end.

Required structure:

1. Chief concern / reason for visit
2. Subjective history
   - HPI in clear chronological form
   - Pertinent positives and negatives
   - Relevant symptom modifiers, triggers, timing, progression, severity
   - Prior evaluations, tests, and treatments if provided

3. Pertinent past history
   - Relevant past medical history
   - Relevant neurologic history
   - Relevant psychiatric history if applicable
   - Relevant surgical history if applicable
   - Relevant family history if provided
   - Relevant social history if provided

4. Medication review
   - List current relevant medications if provided
   - Explicitly consider whether symptoms could be caused, worsened, masked, or modified by medications, supplements, withdrawal, interactions, dose changes, sedatives, anticholinergics, dopaminergic drugs, antiseizure drugs, antidepressants, antihypertensives, sleep aids, substances, or polypharmacy when relevant
   - If medication effect is plausible, state this clearly in the differential or assessment

5. Basic neurologic exam
   If exam data are provided, organize them clearly.
   If exam data are missing, create a brief standard neurologic exam template with only conservative placeholders and do not fabricate findings. Include:
   - Mental status
   - Cranial nerves
   - Motor
   - Sensory
   - Reflexes
   - Coordination
   - Gait

6. Assessment
   - Summarize the clinical problem concisely
   - Give a prioritized differential diagnosis
   - For each major item, briefly explain why it is being considered and what argues against it if applicable
   - Distinguish established facts from uncertainty
   - If appropriate, note red flags or reasons urgent escalation would be needed

7. Risk-benefit support
   When treatment or testing options are discussed, add a brief “Risk/Benefit Perspective” subsection:
   - Estimate number needed to treat (NNT) when known or reasonably standard
   - Estimate number needed to harm (NNH) when known or reasonably standard
   - If exact NNT/NNH is not reliable for this specific scenario, say so explicitly and give a qualitative risk-benefit summary instead
   - Do not invent precise numbers
   - Keep this practical and clinically intuitive rather than exhaustive

8. Plan
   - Give a clear, numbered plan
   - Include diagnostics, treatment, medication changes, referrals, counseling, safety guidance, and follow-up as applicable
   - Make the plan internally consistent with the assessment
   - Check for contradictions, duplicated actions, unsafe combinations, or missing follow-up steps
   - If better alternatives or refinements are obvious, include a brief “Plan check / suggestions” subsection

9. To-do / research / pending tasks
   Add a final clinician task section:
   - Outstanding questions
   - Items to research
   - Records/tests to obtain
   - Follow-up tasks
   - Pending decisions

10. Patient handout
   End with a patient-friendly summary in simple language:
   - What was discussed
   - Main possible explanations / differential diagnosis in plain terms
   - What the current plan is
   - What to watch for
   - What the next steps are
   Keep the tone calm, clear, and readable. Avoid jargon or define it briefly when needed.

Style requirements:
- Use a professional neurology note style
- Be concise but not skeletal
- Do not fabricate data
- Clearly label uncertainty
- Prefer practical clinical reasoning over generic textbook language
- If information is missing, note what is missing rather than pretending it is present
- When appropriate, convert scattered information into a coherent note
- Optimize for real clinical usefulness
