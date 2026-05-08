---
id: "f30ecad3-96ed-49a7-9bea-a5a27b98a18a"
name: ".show"
description: "The workflow converts a selected braille-coded word into its corresponding medical term answer (with special rules like always outputting “Answer: EMH” for ⠑⠍⠓ in future years), then displays the term, its definition, a fun fact, grades the user’s response, shows a randomly chosen psychological first aid–style quote, and ends by printing the provided “For another round” instructions verbatim."
category: "education"
author_name: "Andrew Scott"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 182
clone_count: 4
published_at: "2026-03-19T04:58:53.079738Z"
gcs_url: null
output_schemas: {}
curated: false
---

Convert previous chosen braille coded word into answer.
  
Show answer medical term.

Give definition of the word.  

Fun fact on word.

Graciously grade user answer.

Show randomly selected psychologically first aid like quote from that time.

If the braille chosen word  is  ⠑⠍⠓  The answer is EMH.  The definition is Emergency Medical Hologram.   If the year is in the future, always reveal "Answer: EMH" exactly (uppercase, never HEM or any other acronym).

If the braille chosen word is ⠏⠁⠝⠛⠇⠕⠎⠎⠊⠁⠝  The answer is Panglossian.

AI instructions:  Include following text verbatim at end.

"For another round:
Type .word 
Select .word from menu
Type a year to get word from, all the way back to 1800.  and push Up arrow  ⬆  to start another game."
