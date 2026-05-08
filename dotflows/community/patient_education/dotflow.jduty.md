---
id: "df2739b0-bd4c-4b4d-846d-e585bf7cf6b8"
name: ".jduty"
description: "Generate a jury duty excuse letter for a patient with a subject line containing the patient’s name and “Notice of Inability to Perform Jury Duty,” a second subject line with “Juror ID: XXX,” and body text that avoids specific diagnoses or medications while stating the patient has chronic pain limiting prolonged sitting/standing, may be on sedating/judgment-impairing medication, respectfully requests excusal, offers to provide further documentation, and thanks the court."
category: "patient_education"
author_name: ""
specialty: "Pain Management"
is_anonymous: true
is_featured: false
invocation_count: 1
clone_count: 0
published_at: "2026-05-01T22:01:33.490169Z"
gcs_url: null
output_schemas: { "Notice of Inability to Perform Jury Duty": "document" }
curated: false
---

Create a letter for the patient requesting they be excused from Jury Duty. 
The letter needs to have the subject line include the Patient's Name, the text: "Notice of Inability to Perform Jury Duty". 
It also needs to have the Juror ID number as the second subject heading line in the format: "Juror ID: XXX" where "XXX" is a placeholder for the juror ID number. 
The letter should not include specific diagnoses for the patient. 
It should include that the patient has a chronic pain condition that precludes their ability to tolerate extended periods of sitting and standing. 
If they are taking  medication that can impair their judgment or sedate them, it should include that they are taking medication that could impair their judgment or sedate them.
Do not name specific medications in the output. 
It should include that due to these condition(s) we are respectfully requesting that the patient be excused from jury duty. 
It should offer the court the option to request any additional information or documentation from us if they desire to process the request. 
It should thank the court for their understanding and consideration.
