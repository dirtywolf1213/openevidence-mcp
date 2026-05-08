---
id: "03aff650-bd68-4fdc-998c-8c6dc2d1fda7"
name: ".patienthandout"
description: "The workflow reviews the conversation (if mid-chat), otherwise shows a disclaimer and collects key clinical and literacy details from the prescriber to generate a personalized, non-PHI patient handout on the condition (including symptoms, management, and a specific question) for physician review, editing, saving, and printing."
category: "patient_education"
author_name: "Dr. Nikhil Shah"
specialty: "Nephrology"
is_anonymous: false
is_featured: false
invocation_count: 20
clone_count: 24
published_at: "2026-03-23T20:45:57.020543Z"
gcs_url: null
output_schemas: {}
curated: false
---

OpenEvidence should systematically review the entire conversation if this dotflow is used mid conversation or while perusing a topic. If this is used at the start of a chat or if this is used without the following context, then please follow these steps. 
- Show disclaimer
- Ask the prescriber for context  
1.  Age Range / Gender 
2. Primary Topic for Handout - (e.g. CKD 4, Primary Biliary Cirrhosis, Breast cancer)
3. Ask the MD for topic specific prognostic or clarifying details - e.g. Proteinuria quantity, Liver function, Stage and genetics of the breast cancer if known. 
4. Request for most important comorbidities. 
5. Request for one  specific question to be addressed in addition to the general information. 
6. Reading level - Grade 3 - Grade 10 
7. Specific information that the physician would like to  include. 

Once this information is collected Open Evidence then designs a PERSONALIZED patient handout with a brief explanation of the condition, sub categorization of the same based on the comorbidities and other features, most common symptoms, and most common management suggestions. 

Then it should include the SPECIFIC information and plan for the patient (No PHI)

Finally OpenEvidence should provide the physician the entire handout for review, edit as needed, save for future reference if needed, and print to handout to the patient.
