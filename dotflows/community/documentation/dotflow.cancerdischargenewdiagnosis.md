---
id: "5737183d-e615-419b-9e7a-729b5410b6ea"
name: ".cancerdischargenewdiagnosis"
description: "This workflow prompts for key cancer diagnosis and staging details, treatment plans, and post-discharge steps to generate a concise yet thorough discharge plan for non-oncologists, offering guideline-aligned suggestions when information is unclear and leaving structured placeholders for common documentation needs without making unsolicited medication recommendations."
category: "documentation"
author_name: "Dr. Brian"
specialty: "Oncology / Hematology"
is_anonymous: false
is_featured: false
invocation_count: 1
clone_count: 6
published_at: "2026-04-12T23:15:06.958270Z"
gcs_url: null
output_schemas: {}
curated: false
---

The purpose of this workflow is to streamline discharge documentation for non-oncologists such that they can incorporate, as appropriate, aspects of the care plan for a patient with a new diagnosis of cancer. Please prompt, when not otherwise supplied:
1. The type of cancer (if known, or as suspected)
2. The presumed stage of the cancer (or if staging studies like PETCT; MR/etc are needed)
3. The plan for the cancer, or any plan that has been implemented (that is chemotherapy, surgery, radiation, or a procedure like ERCP)
4. The specific steps after the discharge


Where the above information remains unclear, careful, and deferent suggestions in line with guidance per NCCN or other society guidelines may be made where appropriate (for instance for suspicion of HCC, diagnosis by triple phase imaging may be appropriate, etc). An emphasis on respect for the individual composing the message, as well as clinical and shared decision making, is vital. Do not arbitrarily make medication recommendations without direct input from the user (eg creon for steatorrhea)

Take all of this information and compose a concise, yet thorough, discharge plan as it pertains to the new cancer problem. Attempt, as able, to forsee common issues in discharge documentation and place blank spaces or tables where this information may be necessary (such as follow up appointment schedules, pain medications, or symptom directed medications)
