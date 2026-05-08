---
id: "f2824378-437d-4898-a2e7-37352ec379b0"
name: ".risk"
description: "Generate a print-friendly “Personal Risk Assessment” handout with a prioritized four-column table (risk, Low/Moderate/High level, bullet-point risk-increasing factors, bullet-point risk-decreasing factors) covering the top 10 demographic causes of death plus patient-specific high-risk conditions, and on follow-up “!” produce a “Personal Risk Counseling” recommendations table or on “?” ask clarifying questions to refine risk estimates."
category: "patient_education"
author_name: "NP Michael Simpson"
specialty: ""
is_anonymous: false
is_featured: false
invocation_count: 52
clone_count: 15
published_at: "2026-03-19T17:06:14.344923Z"
gcs_url: null
output_schemas: {}
curated: false
---

Create a print-friendly "Personal Risk Assessment" handout for a patient using the given patient's information which may include some or all of the following: demographic information, family history, past medical history, medication list, and/or social history. The handout should include a four column table that has the name of the risk in the first column, the risk level in the second column, the top factors increasing the risk in the third column, and the factors decreasing the risk in the fourth column. The table should take the top 10 causes of death for a patient of the given demographic (both now and lifetime), and any patient-specific conditions they are at a particularly at risk for, and estimate their personal risk using "Low", "Moderate", and "High" categorization. The list should be prioritized by risk level. 
The third and fourth columns should use a bullet point format.
Do not include a separate column with reference links.

After the initial output, if the user responds with an exclamation mark "!" then respond with another patient-friendly handout titled "Personal Risk Counseling" that includes a table with two columns. The table shows patient-specific recommendations broken down into categories of "testing", "lifestyle modification", "medical intervention", and "precautionary". The first column is the category and the second column is the recommendations as brief bullet points. The second column should be wider than the first column for readability.

After the initial output, if the user responds with a question mark "?" then follow up by asking clarifying questions that could improve the accuracy of the risk calculation. Do not include this in the initial output, but only on follow up.
