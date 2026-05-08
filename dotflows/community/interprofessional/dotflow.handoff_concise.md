---
id: "3547fab7-92f5-401a-8fd2-0438664f655d"
name: ".handoff_concise"
description: "This workflow triggers only when the message contains “/handoff” and then transforms a full inpatient assessment-and-plan note into Saba Oniani’s strict telegraphic cross-cover handoff format (cause-first one-liner, prioritized active-problem bullets with one key number each and current actions, an optional meds-held/monitoring sentence, a time-stamped “To do” list with stop parameters, and a dated lab trend tracker), omitting stable problems, narratives, and non-actionable details."
category: "interprofessional"
author_name: "Dr. saba oniani"
specialty: "Internal Medicine"
is_anonymous: false
is_featured: false
invocation_count: 5
clone_count: 2
published_at: "2026-05-03T15:24:16.258754Z"
gcs_url: null
output_schemas: { "Handoff": "document" }
curated: false
---

---
name: handoff-writer
description: MANUAL-INVOCATION ONLY. Use this skill ONLY when Saba's message explicitly contains the slash command "/handoff". Do NOT trigger on any other phrasing — not on "write a sign-out", "give me a handoff", "summarize this note for cross-cover", "I&O for night float", or any casual request to condense a note. If "/handoff" is not present in the message, ignore this skill entirely and respond using default behavior. When "/handoff" IS present, convert a full inpatient A&P note into Saba Oniani's exact telegraphic physician-to-physician handoff format: cause-first one-line summary, bulleted active problems with key numbers and current actions, inline meds-held + monitoring sentence, a `To do:` block of time-stamped actionable items with stop parameters, and a date-stamped trend tracker for any titrated lab.
---

# Handoff Writer

Convert a full inpatient A&P note into Saba's concise physician-to-physician handoff. The reader is the cross-cover or oncoming team — they need to know what's actively being managed this shift, what to do, and when to stop. They do not need pathophysiology, HPI narrative, or stable problems.

## Output format

```
Summary:  [age][sex] admitted with [unifying mechanism/cause]:
- [Problem 1 label] ([key value]) - [current action]
- [Problem 2 label] ([key value]) [amount given/scheduled with time]
- [Problem 3 label] ([key value])
[Meds held]. Monitor [parameter] (goal [target]), [recheck frequency], [other monitoring].

To do:

- Q[X] [lab]  ([time1], [time2], [time3]) - [stop condition]
- Q[X] [lab]  ([time1], [time2], [time3]) - [stop condition with threshold]
[date] [time]: [lab] [comparator][value]
[date] [time]: [lab] [comparator][value]
```

Two blank lines (visually) separate the three blocks. Use the literal labels `Summary:` and `To do:`.

## Core principles

**Cause-first framing.** The summary line names the unifying culprit, not the chief complaint. "66M admitted with chlorthalidone-induced:" replaces an HPI paragraph. If there is no single cause, use the dominant syndrome ("admitted with septic shock from urosepsis:" or "admitted with decompensated HFrEF:").

**Numbers, not adjectives.** Write `Na 121` not `severely low sodium`. Keep the clinical label as a header (`Severe hyponatremia (Na 121)`) but let the number do the work.

**Only critical labs in the bullet's parens.** Each problem bullet gets *one* number — the value that defines current acuity or drives overnight action. For NSTEMI, that's the troponin peak. For HF, it's whichever number actually requires cross-cover vigilance (often none — the diagnosis itself is the signal). For AKI, it's the creatinine. Skip secondary labs (NT-proBNP after diuresis, BNP trends, mild transaminitis numbers) unless they're driving a decision tonight. The handoff is not a lab report — if a lab isn't going to change what the cross-cover does, it doesn't appear.

**Never mention what is absent.** Do not write "no DKA," "no ketones," "no AKI," "no acute findings," "no chest pain." The handoff lists *active problems and findings only*. If a complication was ruled out, that's documented in the chart — the cross-cover doesn't need it. The only exception is if a near-miss diagnosis defines the current monitoring plan (rare).

**Action over reasoning.** Pathophysiology, differentials, and reasoning go in the chart, not the handoff. The receiving doc needs *what's running, what to watch, what to do* — never *why you think it's happening*. Cut all "Likely…", "DDx:", and mechanism explanations.

**Active management only.** A problem appears in the bullets only if it is being actively titrated, monitored, or treated this shift. Stable problems, completed workups, and "continue home meds" items disappear. Pending labs without action items also disappear (they live in the chart, not the sign-out).

**Meds: only what changed.** Mention meds held, discontinued, or newly started — because the cross-cover needs to know not to restart them. Do not list continued home meds.

**Stop parameters built in.** Every monitoring task in the `To do:` block needs an off-ramp the cross-cover can act on without paging: `Discontinue Q4 when normal`, `Stop if Na>127`, `D5 if Na>130`. The receiving doc should not have to think about when an order ends.

**Specific times, not frequencies alone.** Write `Q4 K  (2000, 0000, 0400)` rather than just `Q4 K`. The cross-cover then knows exactly when results will land.

**Telegraphic tone.** Fragments over sentences. No "please," no "consider," no "we will." Imperative or declarative only.

## Building the summary line

Format: `[age][sex] admitted with [cause]-induced:` (when there's a unifying cause) OR `[age][sex] admitted with [syndrome]:` (when there isn't).

Pull age and sex from the note's opening line. Pull the cause from the note's reasoning sections — usually the etiology line under the dominant problem. If the note explicitly names a culprit (drug, infection, organ failure), use it. If it doesn't, name the syndrome.

The colon at the end signals that bulleted problems follow.

## Building the problem bullets

One bullet per actively managed problem, ordered by acuity (most dangerous first). For each:

- **Label**: keep the diagnosis name from the A&P (e.g., `Severe hyponatremia`, `AKI`, `Hypokalemia`).
- **Key value in parens**: the single most important number — admission value or current value, whichever is more relevant.
- **Current action (optional)**: append with ` - ` if there's an active drip, infusion, or specific intervention running. Examples: `- On NS infusion`, `- On levophed 8 mcg/min`, `- D5W if oversorrection`.
- **Replacements/doses given**: if a one-time dose was given or is scheduled, note it: `40 MEq given, 20 Scheduled 1800`.

Use your judgment on bullet length. One line is the default; a second line is fine if the stop parameters or dosing schedule genuinely need it. If a bullet starts feeling like a paragraph, the detail belongs in `To do:` instead.

## Building the meds + monitoring sentence

Single sentence right after the bullets, no bullet point. **Include this sentence only when there is something the cross-cover genuinely needs to know that isn't already obvious from the bullets** — i.e., a med was held/discontinued/newly started this shift, or there is an active titration target.

Pattern: `[Med1] and [Med2] held. Monitor [parameter] (goal [target]), [recheck frequency], [additional monitoring].`

Good examples (worth including):
- `Losartan and naproxen held. Monitor sodium correction rate (goal 8 mEq/L/24h), recheck BMP q4-6h, telemetry.`
- `Lisinopril held. Monitor UOP (goal >0.5 mL/kg/hr), daily weights, strict I&Os.`

**Cut this sentence entirely when it would only contain:**
- "Continue home meds" type information (continued ASA, statin, BB on usual home doses)
- Standing orders that every patient on the service gets (telemetry on a cards patient, daily weights on a HF patient, strict I/Os on a diuresing patient — these are implied by the diagnosis)
- Procedure prep that's already obvious from the diagnosis line ("NPO for AM PCI" — the receiving doc knows)
- Held drug that was already mentioned in a bullet's "current action" field

The test: would the cross-cover do anything different if you removed this sentence? If no, cut it. Routine continuation of home meds is noise, not signal.

If meds were held AND the held med matters (e.g., losartan held in AKI, anticoag held pre-procedure), keep that. If the only "change" is "continue ASA, statin, BB on home doses pre-PCI," cut the whole sentence.

## Building the To do block

Only items the cross-cover must actively do or check this shift that **rise above standing orders**. Each line:

- Starts with `- ` (hyphen space).
- Names the task with frequency *and* specific times: `Q4 K  (2000, 0000, 0400)`.
- Ends with the stop condition after ` - `: `Discontinue Q4 when normal`, `Stop if Na>127`, `D5 if Na>130`.

Note the double space after the frequency in Saba's example (`Q4 K  (2000`). Preserve that.

If the same lab needs different stop thresholds in different directions, list both: `Stop if Na>127. D5 if Na>130`.

**What does NOT belong in `To do:`:**

- **Routine AM labs** (BMP, CBC, trop) — these are standing orders for everyone on the service. Cross-cover doesn't need to be told.
- **Routine glucose monitoring** for diabetic patients on basal-bolus or sliding scale. POCT glucose checks only earn a line when the patient is in **DKA, having active hypoglycemia, on insulin gtt, or otherwise needs tight overnight glucose control** (e.g., post-op, NPO with high basal dose and labile glucose). A diabetic on home Lantus + sliding scale does not earn a glucose line.
- **Standard cardiac monitoring** (telemetry, daily weights on HF) — implied by the diagnosis.
- **PRN orders that are already in Epic** (PRN nitro, PRN nicotine, PRN ondansetron) — *unless* the cross-cover should be aware to use them or the trigger is non-obvious. "Nitro patch PRN CP" is worth keeping for an NSTEMI patient pre-PCI because it primes the cross-cover to act fast on chest pain. "PRN ondansetron" is not.
- **Confirmation of pre-procedure status** (NPO confirmation, consent confirmation) — keep these only when there's a reason the cross-cover might need to act (e.g., patient asking for water; this is a heads-up).

The test: if every patient on the service gets this order automatically, it doesn't go in `To do:`. Only include items that are *specific to this patient tonight* and require cross-cover action or vigilance.

## Building the trend tracker

After the `To do:` items, append date-and-time-stamped lines for any lab being titrated. Format: `[M/D] [HHMM]: [lab] [comparator][value]`.

Examples:
- `5/3 1400: Na <=129`
- `5/4 1400: Na <=137`

These are placeholder rows the on-call team will fill in as values come back. Include them for any lab in the `To do:` block that's being trended toward a target. Project forward 24-48 hours from current time.

## What to cut

Cut these aggressively from the source A&P:

- **HPI narrative** — chief complaint, symptom timeline, ED course, past medical history paragraphs.
- **Pathophysiology and reasoning** — "Likely prerenal because…", "AST >> ALT pattern suggests…", "DDx includes…".
- **Quiet/stable problems** — anything labeled "at baseline," "stable," "continue home regimen," with no active titration.
- **Pending workups without action items** — hep panel pending, fractionated bili pending, urine chemistries pending. If the cross-cover doesn't need to act on the result tonight, it doesn't go in the handoff.
- **Continued home meds** — metoprolol continued, statin continued, etc.
- **Lab dumps** — full CBC, CMP, hep panel results. The handoff cites only the values that drove the active problems.
- **DVT prophylaxis, diet orders, attending name, med rec status** — administrative footers stay in the chart.

## What to keep when uncertain

If a problem is borderline (active vs. stable), keep it if any of these are true:
- A med was changed for it this shift.
- A lab is being trended for it.
- A drip, infusion, or replacement is running for it.
- Vitals could change overnight in a way that requires action.

Otherwise, cut it.

## Example

**Source A&P (abbreviated):**

> 66M admitted 5/2/2026 with weakness, blurry vision, hyponatremia, hypokalemia, AKI in setting of chlorthalidone initiation.
>
> #Severe symptomatic hyponatremia — Na 121 on admission, chronic (~2-3 wk), correction goal ≤8 mEq/L/24h. NS at 125 mL/hr, free water restriction 1L/day, Q4 Na, D5W if overcorrection, strict I&Os.
>
> #Hypokalemia — K 3.0, repeating with PO K, daily BMP, telemetry.
>
> #AKI — Cr 1.8, eGFR 41, prerenal from chlorthalidone + losartan. Hold losartan, NS ongoing, daily BMP, urine chem pending.
>
> #Transaminitis / #Hyperbilirubinemia — AST 178, ALT 52, T.bili 2.6. Concern ischemic hepatopathy. Trend LFTs, fractionated bili, hep panel, GGT pending.
>
> #HTN — at baseline, continue metoprolol, hold losartan, chlorthalidone d/c'd.

**Handoff output:**

```
Summary:  66M admitted with chlorthalidone-induced:
- Severe hyponatremia (Na 121) - On NS infusion
- Hypokalemia (K 3.0) 40 MEq given, 20 Scheduled 1800
- AKI (Cr 1.8)
Losartan and naproxen held. Monitor sodium correction rate (goal 8 mEq/L/24h), recheck BMP q4-6h, telemetry.

To do:

- Q4 K  (2000, 0000, 0400) - Discontinue Q4 when normal
- Q4 Na  (2000, 0000, 0400) - Stop if Na>127. D5 if Na>130
5/3 1400: Na <=129
5/4 1400: Na <=137
```

Note what's gone: HPI, the entire transaminitis problem (pending workup, no overnight action), HTN problem (at baseline, no titration), pathophysiology of AKI, "free water restriction 1L/day" rolled into the monitoring sentence implicitly, all stable continued meds.

## When information is missing

If the source note is missing something the handoff format expects (e.g., no specific time given for scheduled K, no held meds documented, no trend dates yet), use `***` as a placeholder so the user can fill in: `Q4 K  (***) - Discontinue Q4 when normal`. Do not invent values.
