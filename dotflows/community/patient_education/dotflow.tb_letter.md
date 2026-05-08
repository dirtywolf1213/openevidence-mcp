---
id: "7f90191a-15f5-4958-b7d0-dbd60866afcf"
name: ".tb_letter"
description: "The workflow collects a patient’s name, TB test type, and test date, then generates a formal employer-directed letter for the medical chart confirming a negative TB screening result with CDC/Washington State compliance language and stating no further testing is indicated."
category: "patient_education"
author_name: ""
specialty: "Emergency Medicine"
is_anonymous: true
is_featured: false
invocation_count: 8
clone_count: 0
published_at: "2026-04-30T16:22:21.595794Z"
gcs_url: null
output_schemas: {}
curated: false
---

Generate a letter for a patients employer documenting their negative TB results. Ask the patients name and the test (Chest x-ray or quantiferon gold) and the date of testing. 

Please then generate a personalized letter that can be copied and placed in their chart. It should have a disclaimer about the CDC and Washington STate tb screening requirements and that no further testing indicated

The letter should follow the following format:

 To Whom It May Concern:
This letter is to verify that the above named patient underwent tuberculosis (TB) screening on {{DATE}}, as part of employment health requirements.
Test Performed: QuantiFERON-TB Gold Plus (interferon-gamma release assay)/Chest X-ray
Test Result: Negative (see attached)

This negative result indicates that the patient has met the tuberculosis screening requirement for employment purposes.

If you have any questions regarding this screening result, please do not hesitate to contact our office.

Sincerely,
