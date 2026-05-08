---
id: "cfb2e2a9-d9a5-4bd8-928d-74d05a83eea6"
name: ".draw_diagram"
description: "Converts a user’s clinical case or OpenEvidence answer into a compact, evidence-anchored Mermaid bedside decision algorithm with risk-score branching, contraindication decision gates, and a bottom-anchored references block."
category: "clinical_reasoning"
author_name: "Dr. Fernando Avila"
specialty: "Anesthesiology"
is_anonymous: false
is_featured: false
invocation_count: 3
clone_count: 11
published_at: "2026-04-15T20:10:28.461359Z"
gcs_url: null
output_schemas: {}
curated: false
---

Turns any clinical case or OE answer into a a fast, evidence-based visual algorithm for bedside decision-making. It creates a compact Mermaid workflow diagram with risk-score branching, contraindication gates, and bottom-anchored references.

WHAT THIS DOTFLOW DOES:
Take the user's clinical case, question, or a pasted OpenEvidence answer and generate a compact clinical decision workflow in Mermaid syntax.

[EVIDENCE-ANCHORED RULE]
Keep the diagram strictly derived from the clinical content already discussed or supported by the underlying OpenEvidence answer. Do NOT add new clinical steps, diagnoses, tests, or treatments not already supported by the case or evidence.

[FLOW ORIENTATION RULE]
Default to Mermaid top-to-bottom flow using this exact scaffold:
---
config:
  layout: elk
---
flowchart TB

[CLINICAL NODE RULE]
Use Mermaid-native shapes consistently:
- (["Presentation"]) = patient presentation / start
- [/"Input data"/] = clinical inputs (labs, ECG, imaging, vitals)
- {"Decision?"} = yes/no clinical branch
- [["Risk score"]] = validated risk tool (HEART, TIMI, GRACE, CURB-65, CHA2DS2-VASc, etc.)
- ["Action"] = treatment / intervention / management step
- (["Endpoint"]) = final action, disposition, or monitoring endpoint

[RISK SCORE RULE]
If a validated score already defines risk categories, do NOT add a redundant generic decision node such as "High risk?"
Instead, branch directly from the score node using score-defined thresholds and map each threshold to the corresponding management pathway.
Examples:
- HEART: 0-3 | 4-6 | 7-10
- TIMI: lower vs higher risk strata
- GRACE: low / intermediate / high if clinically relevant

[SAFETY GATE RULE]
Do NOT use a subgraph for safety checks.
Model each contraindication or feasibility check as its own decision diamond.
Each YES branch must connect to a specific alternative-action node.
Each NO branch must proceed to the main pathway or the next safety check.
Use safety-check decision nodes only when they materially change management.

[LAYOUT RULE]
Keep the main pathway visually central and simple.
Use the following edge conventions:
- ==> = primary recommended pathway
- --> = standard branch
- -.-> = lower-priority, deferred, or alternative pathway
Put thresholds on edges, not inside nodes, when possible.

[LABEL RULE]
Keep labels ultra-short, ideally ≤4 words.
Avoid long prose in nodes.
Use concise clinical shorthand when standard and unambiguous.

[REFERENCE BOX RULE]
Always add a REFERENCES subgraph at the bottom of the figure.
Each reference must appear as a separate bullet-style node with:
- very short title
- OpenEvidence reference number in brackets
Example:
• ACC/AHA ACS 2025 [1]
• HEART Validation [2]
• ESC NSTE-ACS 2023 [3]

Anchor the references block to the final clinical node using an invisible link so it renders at the bottom:
K ~~~ s1

OUTPUT STRUCTURE — FOLLOW EXACTLY, IN THIS ORDER:

WORKFLOW DIAGRAM
- Output ONLY one Mermaid code block.
- Use this default structure:

```mermaid
***
config:
  layout: elk
***
flowchart TB
    [clinical nodes and edges here]

    [final clinical node] ~~~ s1

    subgraph s1["REFERENCES"]
        n1["-  Short title "][1]
        n2["-  Short title "][2]
        n3["-  Short title "][3]
    end

    [node classes here]

    classDef start fill:#1a1a2e,color:#fff,stroke:none
    classDef input fill:#e8f1fb,stroke:#1565c0
    classDef action fill:#e3f2fd,stroke:#1565c0
    classDef decision fill:#fff9c4,stroke:#f9a825
    classDef risk fill:#f3e5f5,stroke:#6a1b9a
    classDef terminal fill:#e8f5e9,stroke:#2e7d32
    classDef refs fill:transparent,stroke-width:0px,font-size:12px,color:#333

    style s1 stroke:transparent
```

RENDER INSTRUCTIONS
- After the Mermaid block, add exactly one sentence:
Visit mermaid.live → paste code → rendered figure appears instantly.

[EXAMPLE — FOLLOW THE STRUCTURE, NODE SEMANTICS, AND BREVITY. DO NOT COPY THE CLINICAL CONTENT UNLESS IT FITS THE USER'S CASE.]

Example user input:
"55-year-old male with chest pain, normal ECG, negative first troponin. Need a disposition pathway."

Example output:

```mermaid
***
config:
  layout: elk
***
flowchart TB
    A(["55yo ♂ chest pain"]) ==> B[/"ECG, trop, vitals"/]
    B ==> C{"STEMI?"}
    C -- Yes --> D["Activate cath lab"]
    C -- No --> E[["HEART score"]]

    E -- "0-3" --> G["Serial trop ×2"]
    E -- "4-6" --> H["Observe / admit"]
    E -- "7-10" --> SC1{"Bleeding risk?"}

    SC1 -- Yes --> ALT1["Transfer for PCI"]
    SC1 -- No --> SC2{"AKI present?"}
    SC2 -- Yes --> ALT2["Adjust anticoag dose"]
    SC2 -- No --> SC3{"Drug allergy?"}
    SC3 -- Yes --> ALT3["Alternative anticoag"]
    SC3 -- No --> K(["Cath/PCI/observation"])

    G --> I{"Trop rise/fall?"}
    I -- Yes --> H
    I -- No --> J(["Discharge + follow-up"])

    H ==> K
    D ==> K
    ALT1 --> K
    ALT2 --> K
    ALT3 --> K

    K ~~~ s1

    subgraph s1["REFERENCES"]
        n1["-  ACC/AHA ACS 2025 "][1]
        n2["-  HEART Validation "][2]
        n3["-  ESC NSTE-ACS 2023 "][3]
    end

    A:::start
    B:::input
    C:::decision
    D:::action
    E:::risk
    G:::action
    H:::action
    SC1:::decision
    SC2:::decision
    SC3:::decision
    ALT1:::action
    ALT2:::action
    ALT3:::action
    I:::decision
    J:::terminal
    K:::terminal
    n1:::refs
    n2:::refs
    n3:::refs

    classDef start fill:#1a1a2e,color:#fff,stroke:none
    classDef input fill:#e8f1fb,stroke:#1565c0
    classDef action fill:#e3f2fd,stroke:#1565c0
    classDef decision fill:#fff9c4,stroke:#f9a825
    classDef risk fill:#f3e5f5,stroke:#6a1b9a
    classDef terminal fill:#e8f5e9,stroke:#2e7d32
    classDef refs fill:transparent,stroke-width:0px,font-size:12px,color:#333

    style s1 stroke:transparent
```

Visit mermaid.live → paste code → rendered figure appears instantly.
