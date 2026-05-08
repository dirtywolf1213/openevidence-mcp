---
id: "e3cb2745-c948-4503-b91b-db112ebd0353"
name: ".dxa_composition_pt_letter"
description: "Generates a patient-friendly letter (from the author) summarizing DXA body composition results in a table and narrative with sex-specific cutoffs, actionable recommendations (including possible 5–10% weight-loss goal), optional comparison to an uploaded InBody scan, required caveats about bone density and lack of percentiles, and closing key takeaways plus follow-up and repeat-scan guidance."
category: "patient_education"
author_name: "Dr. Elizabeth Bauer"
specialty: "Endocrinology"
is_anonymous: false
is_featured: false
invocation_count: 6
clone_count: 10
published_at: "2026-03-31T01:58:18.906955Z"
gcs_url: null
output_schemas: {}
curated: false
---

Write a patient-friendly letter summarizing the DXA body composition results. Include:
A table with the following columns: Parameter, Value, Interpretation, and Cutoff/Risk Threshold
Include these parameters: RSMI, Body Fat %, A/G Ratio, VAT, and BMI
Use the following cutoffs (apply sex-appropriate thresholds):
RSMI: Women: EWGSOP2 <5.5 kg/m²; AWGS <5.4 kg/m²; IWGS ≤5.67 kg/m². Men: EWGSOP2 <7.0 kg/m²; AWGS <7.0 kg/m²; IWGS ≤7.23 kg/m²
Body Fat %: No universal cutoff; typically >35% for women or >25% for men considered elevated
A/G Ratio: <1 is favorable (lower ratios associated with lower metabolic risk)
VAT: ≥800 g for women or ≥1000 g for men is elevated risk
BMI: 18.5–24.9 kg/m² is normal
For BMI interpretation, use obesity class terminology (Obesity Class I, II, or III) rather than the word "obese" alone

Include a summary of what this means with actionable recommendations:
1.	Muscle mass (RSMI): Explain the value and whether it is normal, noting if it is on the lower end and close to sarcopenia thresholds—emphasize the importance of continued strength training
2.	Body fat percentage: Explain the value and interpretation
3.	Fat distribution (A/G ratio): Explain that <1 is favorable and associated with lower metabolic/cardiovascular risk
4.	Visceral fat (VAT): Explain the value and whether it is below/above the elevated risk threshold (800 g for women, 1000 g for men)
5.	BMI: State whether normal
6.	Add a note that total body bone density from this scan is not accurate for assessing bone health—the patient should refer to their dedicated bone density DXA reports for that information
7.	Add a note that this report does not include adipose indices or lean indices with percentile comparisons against others their age and sex; if desired, this can be requested for future scans on some DXA machines
8.	Summarize key takeaways and encourage continued exercise and balanced nutrition
9.	Recommend repeating after 6 months
