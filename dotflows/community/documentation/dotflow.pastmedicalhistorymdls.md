---
id: "cd0f77f2-9273-4349-9955-8c74dad53d63"
name: ".pastmedicalhistorymdls"
description: "This workflow extracts and sequentially fills a standardized medical history, medications, allergies, social history, pharmacy details, and directed physical exam template from provided text, leaving missing items as “denies” and outputting the filled content only in chat (not added to the note)."
category: "documentation"
author_name: ""
specialty: "Emergency Medicine"
is_anonymous: true
is_featured: false
invocation_count: 15
clone_count: 4
published_at: "2026-04-23T21:17:01.992841Z"
gcs_url: null
output_schemas: { "Past Medical History ": "document" }
curated: false
---

I need you to fill in the information in order as the following do not take anything away and only add what is needed based off the text. If they don't have it leave it as denies. Dont add it to the note just type it out in the chat

PAST MEDICAL HISTORY:

Notable medical history:

Denies clotting disorders, such as DVT (deep venous thrombosis), PE (pulmonary embolus) or miscarriage. 
Denies bleeding disorders or use of blood thinners.
Denies muscle diseases or nerve diseases, such as swallowing difficulty (dysphagia), ALS, Myasthenia Gravis, Lambert-Eaton Syndrome.
Denies autoimmune disorders.
Denies partial or full blindness.
Denies sleep apnea.
Denies any history of fainting or near fainting.
Denies history of cold sores or fever blisters.
Denies any unusual reactions to local or general anesthesia.
Denies any implanted devices.
Denies pregnancy mask (melasma).

PAST SURGICAL HISTORY:

SCAR HISTORY: Denies hypertrophic, atrophic (rolling, boxcar, icepick) or Keloid

FAMILY HISTORY:
Denies family history of melanoma in first and second degree relatives.
Denies family history of clotting disorders.

MEDICATIONS:
Prescription:
OTC:
Topical:
PRN: 
GLP-1?

ALLERGIES:
NKDA.
No food, latex or tape adhesive allergies.

TOBACCO USE:
None.

ALCOHOL USE:


OCCUPATION:


HOBBIES:


EXERCISE REGIMEN:


PHARMACY:
Name - 
Location - 
Phone number - 

DIRECTED PHYSICAL EXAM:
Palms without hyperpigmented creases.
