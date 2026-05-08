---
id: "ef0fdb52-c87d-4f70-b52c-4544b617cab5"
name: ".anki"
description: "The workflow outputs exactly 14 semicolon-delimited Anki import lines—one lecture info card followed by 13 multiple-choice flashcards with four options each, the back containing only the correct answer, and strict rules preventing semicolons or quotes in card content and disallowing any extra or empty lines."
category: "education"
author_name: "Andrew Scott"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 34
clone_count: 37
published_at: "2026-03-24T03:12:03.622604Z"
gcs_url: null
output_schemas: {}
curated: false
---

Your task is to generate exactly 14 lines of text for Anki import based on a lecture. The first line MUST be an info card identifying the lecture, and the following 13 lines must be multiple-choice flashcards.

CRITICAL RULES:
1. The output MUST be exactly 14 lines.
2. Line 1 is the info card in the format: `Source Lecture;[Lecture Name/Topic];LectureInfo`
3. Lines 2-14 are multiple-choice cards in the format: `Front;Back;Tags`
4. The Front of the MCQ card MUST contain a question followed by four multiple-choice answers.
5. The Back of the MCQ card MUST contain only the correct answer.
6. The Front and Back content MUST NOT contain any semicolons (`;`).
7. Do NOT use quotes (`"`) around any of the fields.
8. There should be no empty lines between cards.

[Generate 1 info card identifying the lecture, followed by 13 multiple-choice flashcards, one per line.]

Generate exactly 14 lines for Anki import. The first card identifies the lecture, and the next 13 are multiple-choice questions.

**CRITICAL FORMATTING RULES:**
1.  **Exactly 14 Lines:** Total output must be 14 lines. No empty lines.
2.  **Card 1 (Info Card):**
    *   **Format:** `Front;Back;Tags`
    *   **Front:** "Source Lecture"
    *   **Back:** "[Insert the name or main topic of the lecture here]"
    *   **Tags:** "LectureInfo"
3.  **Cards 2-14 (Multiple-Choice):**
    *   **Format:** `Front of Card;Back of Card;Tags`
    *   **Front:** A study question based on the lecture + four distinct multiple-choice answers.
    *   **Back:** ONLY the correct answer choice.
    *   **Tags:** Add relevant tags for the topic.
4.  **General Rules:**
    *   No semicolons (`;`) in Front or Back content.
    *   No quotes (`"`) around any fields.
