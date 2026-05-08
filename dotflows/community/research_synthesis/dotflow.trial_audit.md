---
id: "4ee65364-00ab-47b5-b8cc-98019891b7f9"
name: ".trial_audit"
description: "It extracts and critically evaluates key design, population, intervention/comparator, statistical outcomes (including ARR/NNT and fragility), bias/funding, and cost-effectiveness details from landmark clinical trials, presenting the findings in a structured format with an audit verdict comparison table."
category: "research_synthesis"
author_name: "Dr. Daniel Blanco Achoy"
specialty: "Other"
is_anonymous: false
is_featured: false
invocation_count: 1
clone_count: 0
published_at: "2026-04-24T18:20:55.102909Z"
gcs_url: null
output_schemas: {}
curated: false
---

Task: Provide a high-fidelity, structured audit of the specified landmark clinical trial(s).

For each trial, you must extract and analyze the following:

1. CORE IDENTITY: Trial name, year of publication, and primary objective.
2. POPULATION DYNAMICS: Inclusion and exclusion criteria with a focus on generalizability (external validity). Note specific demographics or comorbidities that may skew results.
3. INTERVENTION VS. COMPARATOR: Detailed regimen, dosage, and duration.
4. STATISTICAL ROBUSTNESS: 
   - Primary Endpoint results with 95% Confidence Intervals (CI) and exact p-values.
   - Calculate or report Absolute Risk Reduction (ARR) and Number Needed to Treat (NNT).
   - Report the Fragility Index (FI) if available to assess the stability of p-values.
5. CRITICAL APPRAISAL:
   - Risk of Bias: Evaluate using Cochrane criteria (blinding, allocation concealment, attrition).
   - Endpoint Quality: Differentiate between hard clinical endpoints (mortality, MACE) and surrogate markers.
   - Funding: Explicitly state funding sources and identify potential conflicts of interest.
6. DATA SCIENCE PERSPECTIVE: Summarize the "Bottom Line" efficiency of the intervention based on its Cost-per-Use or clinical impact magnitude.

Format: Use a structured, scannable layout with bolded headers and a final "Audit Verdict" table for quick comparison.
