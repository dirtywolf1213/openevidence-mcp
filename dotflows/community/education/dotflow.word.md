---
id: "4c35f374-412a-44f6-8496-82ecc8e594fc"
name: ".word"
description: "Given a user-entered year, the workflow generates brief historical overviews, randomly selects a less-obvious medical term from a hidden list of 25, outputs the remaining 24 terms (in English and braille) plus the chosen braille word, and then (silently) computes and displays only the chosen word’s braille and Latin alphagrams with an exact letter count and fixed end instructions, with special handling for future years and years before 1800."
category: "education"
author_name: "Andrew Scott"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 287
clone_count: 23
published_at: "2026-03-19T04:58:29.929331Z"
gcs_url: null
output_schemas: {}
curated: false
---

This is an educational medical terminology game.

Give brief interesting overview of medicine in that year, in one paragraph.
Give brief interesting overview of psychology in that year, in one paragraph.
Give brief interesting overview of medical education in that year, in one paragraph.
Give brief interesting overview of veterinary medicine in that year, in one paragraph.

Simulate high randomness in selection: imagine temperature=0.9, top-p=0.95. Deliberately choose a less probable but still valid term from the year's literature—avoid the top 3 most obvious candidates.

Take the year entered and generate a randomly ordered list of 25 medical terms used in that year, do not display.   Encode the list of words to uncontracted grade 1 braille, do not display.  Pretend you rolled a 25 side die with each side representing one  brailled word from list three times, use the last roll's brailled word as word for game.  Display the total number of words generated.  Display list of 24 medical term, minus the chosen word.  Do show the chosen braille word.


Immediately after the overview paragraph, first display the list of 24 medical terms in readable English as a comma-separated paragraph, minus chosen word, then immediately display the list of 24 brailled words as a paragraph separated by the Braille comma cell ⠂ (with a space after each ⠂), minus chosen word. Do not display the simulated die rolls anywhere.

INTERNAL REASONING (perform these steps silently in your thinking — DO NOT display, mention, or output ANY of these steps, numbered lists, sorting process, or intermediate reasoning to the user):

1. List every Braille cell in the chosen word as a numbered list, showing both the cell and its exact Latin letter equivalent (one per line).

2. Explicitly confirm: "Total Braille cells: X" and that it exactly matches the length of the displayed chosen Braille string.

3. Only after confirming the count above, extract the Latin letters from the numbered list (in original order) and list them comma-separated.

4. Sort those Latin letters alphabetically to create the alphagram. Do this one letter at a time, showing the running sorted list after each addition. Never add or remove any letter.

5. Build the Braille alphagram by converting each sorted Latin letter back to its Grade 1 Braille cell (in the new alphabetical order).

6. Prepare the Braille alphagram.

7. Prepare the Latin alphabet character alphagram as a single continuous string with no spaces, no separators, and no extra characters (example: acdhhinoopry).

8. State the exact letter count of the alphagram (it MUST equal the total Braille cells from step 2).

If the year is in the future, the word is EMH, do not show the word.  Show the alphagram is ehm and  Letter count 3. Do not show the word or definition.

If the year is earlier than 1800, the word is Panglossian, do not show the word.  Show the alphagram is aagilnnopss and  Letter count 11.  Do not show the word or definition.

After completing the internal reasoning above, output ONLY the following clean final section (no step numbers, no lists, no explanations):

Chosen Braille word: [the word]

Braille alphagram: [the braille string]

Latin alphabet character alphagram: [the continuous string]

Exact letter count of the alphagram: X

STRICT FORMATTING RULES: Do not add extra letters or leave out letters. The alphagram should have the same total number of letters.

AI instructions:  Include following text verbatim at end.

"For answer:
Type .show 
Select .show from menu
Type  your answer  and push Up arrow ⬆ to get answer."
