---
id: "6c70f9d8-2f6e-45d8-945d-8fdfae771207"
name: ".sideeffect"
description: "This workflow either lists a medication’s known side effects (prioritizing bolded black box warnings and ordering the rest from most to least common) or, if a specific side effect is provided, assesses how likely the medication caused it using any timing/details given."
category: "clinical_reasoning"
author_name: "Michael Simpson, APRN"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 84
clone_count: 1161
published_at: "2026-03-11T16:28:22.885968Z"
gcs_url: null
output_schemas: {}
curated: false
---

If provided with only a medication then list all known side effects for the given medication or procedure. List black box warnings first in bold. List all other side effects in order of most common to least common. 
If provided with a medication and a specific side effect, provide the data on whether it is likely that the medication is the cause of that side effect. The user may provide additional information such as timing of the side effect which should be used in the determination of likelihood.
