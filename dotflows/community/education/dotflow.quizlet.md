---
id: "462ba247-ae5a-46ce-b9a6-31fdfdf04002"
name: ".quizlet"
description: "It outputs pure text formatted for Quizlet import as exactly 14 comma-separated lines: one title/source card and 13 multiple-choice flashcards where each front includes a question with options A–D and each back contains only the correct option letter and text, with no commas allowed anywhere in the content."
category: "education"
author_name: "Andrew Scott"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 2
clone_count: 2
published_at: "2026-03-24T03:19:52.323219Z"
gcs_url: null
output_schemas: {}
curated: false
---

Your task is to generate exactly 14 lines of text formatted for Quizlet import using a COMMA separator for a case and/or lecture.

FORMATTING REQUIREMENTS:
1. OUTPUT: Pure text, exactly 14 lines long.
2. SEPARATOR: Use a single comma `,` between the Front (Term) and Back (Definition).
3. NO COMMAS IN CONTENT: You must NOT use commas anywhere inside the Question, Options, or Answer text. Use semicolons (;), dashes (-), or parentheses instead to avoid breaking the import format.
4. CONTENT:
   - Line 1: TITLE CARD. Format: `Lecture Topic: [Topic Name],[Date/Speaker]`
   - Lines 2-14: MULTIPLE CHOICE FLASHCARDS.
5. MC CARD STRUCTURE:
   - FRONT (Term): Must include the Question text AND 4 labeled options (A B C D) on the same line.
   - BACK (Definition): Must include ONLY the correct answer text.

Example Line:
`What is X? (A) Y (B) Z (C) W (D) Q,(B) Z`

[Generate 1 info card identifying the lecture, followed by 13 multiple-choice flashcards. Use a single comma "," as the separator between Front and Back. NO COMMAS allowed in the text content.]

Generate exactly 14 lines of text for a Quizlet import.

**Separator Rule:** Use a single comma `,` to separate the Front from the Back.

**CRITICAL CONSTRAINT: NO COMMAS IN TEXT**
*   Because the separator is a comma, **you must NOT use commas** within the Question text, Answer choices, or Explanation.
*   Replace any commas in the content with semicolons (;), dashes (-), or just remove them.
*   *Bad Example:* `Heart, Lungs and Liver` (Contains comma)
*   *Good Example:* `Heart Lungs and Liver` or `Heart; Lungs and Liver`

**Line 1: Title Card (Mandatory)**
*   **Front:** "Source: [Lecture Name]"
*   **Separator:** `,`
*   **Back:** "Date/Speaker details"

**Lines 2-14: Multiple Choice Questions (13 Cards)**
*   Create 13 distinct multiple choice questions based on the lecture content.
*   **Front (Question Side):** Must contain the Question + 4 Answer Choices (A B C D).
    *   *Format:* `[Question text]? (A) [Option 1] (B) [Option 2] (C) [Option 3] (D) [Option 4]`
*   **Separator:** `,`
*   **Back (Answer Side):** The correct option letter and text.
    *   *Format:* `[Correct Letter]: [Correct Text]`

**CRITICAL RULES:**
1.  Do NOT use code blocks.
2.  Do NOT add header rows.
3.  Ensure there are exactly 14 lines total.
4.  Strictly adhere to the "No Commas in Content" rule.
