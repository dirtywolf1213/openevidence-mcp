---
id: "7cd440c7-df20-4aa9-966d-4dff3387d49e"
name: ".diagnosenliste"
description: "Der Workflow überarbeitet unstrukturierte medizinische Diagnoselisten in Schweizer Rechtschreibung strikt nach Spital-Bülach-Leitfaden (optional mit verpflichtender Palliativ-Hauptdiagnose-Maske), ergänzt fehlende Angaben als Inline-Platzhalter, prüft Abkürzungen und gibt jede Diagnose in zwei getrennten, KISIM-kompatiblen Copy-Paste-Textblöcken plus kurzer Nachtrag-Checkliste aus."
category: "documentation"
author_name: ""
specialty: "Internal Medicine"
is_anonymous: true
is_featured: false
invocation_count: 6
clone_count: 3
published_at: "2026-05-06T11:36:13.018336Z"
gcs_url: null
output_schemas: {}
curated: false
---

---
name: diagnoselisten
description: >
  Überarbeitet und formatiert medizinische Diagnoselisten nach den Leitlinien der
  Klinik Medizin Spital Bülach für den direkten Import ins KISIM (CISTEC). Zwei Modi:
  (1) Standard — strikt nach Leitfaden Diagnoselisten Klinik Medizin; (2) Palliativ —
  zwingend nach bereitgestellter Palliativ-Maske für die Hauptdiagnose, weitere
  Diagnosen nach Standard-Leitfaden. Trigger-Phrasen: "Diagnoseliste überarbeiten",
  "Diagnoseliste formatieren", "Diagnosen korrigieren", "Diagnosenliste KISIM",
  "Diagnosen für KIS", "Diagnosen Leitfaden", "Diagnosenliste anpassen",
  "Palliativ-Diagnosen", "Palliative Diagnosenliste", "Palliativ-Maske",
  "Palliativstation Diagnosen". Ausgabe pro Diagnose in zwei klar getrennten
  Textblöcken (Hauptzeile + Unterpunkte) ohne Aufzählungszeichen, zum direkten
  Copy-Paste ins KISIM. Schweizer Rechtschreibung (ss statt ß).
---

# Diagnoselisten — Klinik Medizin (Spital Bülach)

> **Kumulative Skill-Datei.** Diese Datei vereint die ursprünglich auf vier Dateien
> verteilten Inhalte (`SKILL.md`, `references/standard-leitfaden.md`,
> `references/palliativ-vorlage.md`, `references/abkuerzungen.md`) in einem
> einzigen Dokument. Die ursprüngliche Verzeichnisstruktur:
>
> ```
> diagnoselisten/
> ├── SKILL.md
> └── references/
>     ├── standard-leitfaden.md
>     ├── palliativ-vorlage.md
>     └── abkuerzungen.md
> ```

---

# TEIL A — SKILL.md (Hauptdatei)

## Aufgabe

Diagnoselisten aus Rohdaten, Stichpunkten, Vorberichten oder unstrukturiertem Text
überarbeiten und so ausgeben, dass sie direkt ins KISIM kopiert werden können.

Für jede Diagnose werden **zwei Textblöcke** ausgegeben:
1. **Hauptzeile** → oberes KISIM-Feld (Überschrift)
2. **Unterpunkte** → unteres KISIM-Feld (Details)

---

## Modus-Wahl

Zuerst bestimmen, welcher Modus gilt:

### Modus 1: Standard (Default)
Folgt strikt dem Leitfaden Diagnoselisten Klinik Medizin.
→ Siehe **TEIL B** (Standard-Leitfaden).

### Modus 2: Palliativ (bei Trigger)
**Trigger:** "Palliativ", "Palliativstation", "palliative Diagnosen", "Palliativ-Maske",
"pall. med. Komplexbehandlung" und ähnliches.

**Regel:** Die Hauptdiagnose (üblicherweise die onkologische Grunderkrankung) wird
**zwingend** nach der bereitgestellten Palliativ-Maske strukturiert — auch wenn
dies an einzelnen Stellen vom Standard-Leitfaden abweicht. Weitere Diagnosen
(Komorbiditäten wie aHT, DM2, etc.) folgen dem Standard-Leitfaden.

→ Siehe **TEIL C** (Palliativ-Vorlage) + **TEIL B** (Standard für Komorbiditäten).

Bei Unsicherheit, welcher Modus gilt: **kurz beim User nachfragen**.

---

## Ausgabeformat (beide Modi)

Für jede Diagnose ein klar abgegrenzter Block:

```
═══════════════════════════════════════════════════════
DIAGNOSE <Nr.>
═══════════════════════════════════════════════════════

▼ HAUPTZEILE (oberes KISIM-Feld):

<Text der Hauptzeile>


▼ UNTERPUNKTE (unteres KISIM-Feld):

<Unterpunkt 1>
<Unterpunkt 2>
<Unter-Unterpunkt>
<Unterpunkt 3>
```

### Formatierungsregeln der Textblöcke

**Keine Aufzählungszeichen.** Kein `•`, `-`, `*`, `–`, etc. KISIM (CISTEC) rendert
diese beim Einfügen aus externen Quellen nicht zuverlässig.

**Eine Information pro Zeile.** Zeilenumbrüche ersetzen Bullet-Points.

**"aktuell (MM/JJJJ):"** als plain text, ohne Markup — steht immer als **erste
Zeile** bei chronischen Diagnosen.

**Keine Markdown-Syntax** (kein `**`, kein `_`, keine Tabellen, keine Backticks).

---

## Input-Handhabung

**Rohdaten-Typen, die verarbeitet werden:**
- Bestehende, schlecht formatierte Diagnoselisten → restrukturieren
- Stichworte / Fliesstext → in Diagnoseliste konvertieren
- Copy-Paste aus Vorberichten mit Befunden / Labor / Medikamenten → entrümpeln
- Unklare oder multifaktorielle Fälle → mit "am ehesten / DD" abbilden

### Platzhalter-Regel bei fehlenden oder unspezifischen Angaben

**Grundsatz:** Wenn eine Diagnose nicht dem vom Leitfaden geforderten Qualitätsstandard
entspricht (fehlende Klassifikation, unspezifischer Typ, fehlendes Datum, fehlender
Score), wird **an der entsprechenden Stelle im Text** ein Platzhalter in eckigen
Klammern eingefügt — nicht nur am Ende.

**Zwei Typen von Platzhaltern:**

1. **Einzelne fehlende Werte** → Platzhalter mit Beschreibung:
   - `ED [MM/JJJJ]`
   - `CHA2DS2-VASc-Score [X] Punkte`
   - `LVEF [X] %`
   - `KÖF [X] cm2`

2. **Fehlende Klassifikation mit definiertem Set von Optionen** → **alle möglichen
   Optionen** in Klammern, durch `/` getrennt. So muss der User nur die nicht
   passende Option streichen:
   - `[Paroxysmales / Persistierendes / Permanentes] Vorhofflimmern`
   - `[Normokardes / Tachykardes / Bradykardes] Vorhofflimmern`
   - Herzinsuffizienz: `[HFpEF / HFmrEF / HFimpEF / HFrEF]`
   - NYHA: `NYHA [I / II / III / IV]`
   - CCS: `CCS [I / II / III / IV]`
   - COPD: `COPD GOLD [I / II / III / IV], Risikoklasse [A / B / E]`
   - Leberzirrhose: `Child-Pugh [A / B / C]`
   - AKI: `AKI [1 / 2 / 3] nach KDIGO`
   - CKD: `CKD [G1 / G2 / G3a / G3b / G4 / G5] nach KDIGO`
   - pAVK: `pAVK Fontaine [I / IIa / IIb / III / IV]`
   - Ernährung: `[Milde / Moderate / Erhebliche] Energie- und Eiweissmangelernährung`

**Beispiel kombiniert:**
Input: *"Pat hat Vorhofflimmern, nimmt Rivaroxaban"*

Output:
```
▼ HAUPTZEILE:
[Paroxysmales / Persistierendes / Permanentes] Vorhofflimmern, ED [MM/JJJJ]

▼ UNTERPUNKTE:
[Normokardes / Tachykardes / Bradykardes] Frequenzverhalten
CHA2DS2-VASc-Score [X] Punkte
Unter Rivaroxaban
```

**Optionale Angaben ohne Relevanz:** einfach weglassen (kein Platzhalter nötig).

### Nachtrag-Hinweis am Ende

Am Ende der gesamten Ausgabe eine kompakte Zusammenfassung der wichtigsten
nachzutragenden Punkte — hilft als Checkliste:
```
Nachzutragen: VHFli-Typ und ED-Datum, CHA2DS2-VASc-Score, Frequenzverhalten
```

---

## Kernprinzipien (beide Modi)

### Sprache
- **Schweizer Rechtschreibung:** "ss" statt "ß" ("Abszess", "Dyspnoe", "musste", "grössere")
- **Facharztniveau**, keine didaktischen Erklärungen
- **"Spital"** statt "Krankenhaus"

### Datumsformate
- Chronische Erkrankungen: `ED MM/JJJJ` (Bsp.: `ED 07/2025`)
- Akute Ereignisse: `TT.MM.JJJJ` (Bsp.: `am 18.03.2023`)
- Befunddatierung: `MM/JJJJ` oder `TT.MM.JJJJ`
- **Niemals:** `05.22`, `07/09`, `2025-10`, andere abweichende Formate

### Wahrscheinlichkeit / DD
- Unsicherheit: `Mögliche ...`, `Wahrscheinliche ...`
- Unklare Ursache: `Unklarer Entzündungszustand`
- Mehrere Ursachen: `..., am ehesten bei X, DD Y, DD Z`
- **Eine DD ohne Hauptverdacht ist keine DD** (also NIEMALS: "Unklare Dyspnoe, DD kardial").

### Pleonasmen vermeiden
- `COVID-19` (nicht "COVID-19 Infekt" → Disease Infekt)
- `HI-Virus` oder `HIV` (nicht "HIV-Virus")
- `Unter Rivaroxaban` (nicht "unter OAK mit Rivaroxaban")

### "St. n." sparsam
Da Datierung sowieso erfolgt, meist überflüssig.

---

## Vorgehen

1. **Modus bestimmen** (Standard vs. Palliativ) anhand Kontext/Triggerwörtern.
2. **Passende Reference laden:**
   - Standard: TEIL B
   - Palliativ: TEIL C + TEIL B (letzteres für Komorbiditäten)
3. **Abkürzungen prüfen** gegen TEIL D.
4. **Ausgabe als strukturierte Blöcke** wie oben spezifiziert.
5. **Nachtrag-Hinweise** mit Platzhaltern in eckigen Klammern am Ende.

---

## Beispiel-Kurzoutput (zur Orientierung)

Input: "Pat mit Vhofli seit 2011, CHA2DS2 3, Ablation 10/22 STZ, EKV 11/22 erfolgreich 150J, unter Xarelto, Raucher 45py, aHT. Jetzt wieder tcVhofli 03/23"

Output:
```
═══════════════════════════════════════════════════════
DIAGNOSE 1
═══════════════════════════════════════════════════════

▼ HAUPTZEILE (oberes KISIM-Feld):

[Paroxysmales / Persistierendes / Permanentes] Vorhofflimmern, ED 09/2011


▼ UNTERPUNKTE (unteres KISIM-Feld):

aktuell (03/2023): erneute Episode tachykardes Vorhofflimmern
CHA2DS2-VASc-Score 3 Punkte
Katheterablation 10/2022 (STZ)
Erfolgreiche EKV mit 150 Joules 11/2022
Unter Rivaroxaban
cvRF: Nikotin (45 py), arterielle Hypertonie
```

Hinweis: Im Input war der VHFli-Typ nicht spezifiziert, daher in der Hauptzeile
alle Optionen als Platzhalter. Das "2011" legt allerdings bei bis heute anhaltender
Episodenhaftigkeit "paroxysmal" nahe — User entscheidet.

---
---

# TEIL B — Standard-Leitfaden Diagnoselisten

> Ursprünglich: `references/standard-leitfaden.md`

Detaillierte Regeln für den Standard-Modus. Gültig ab 10/2025.
Quelle: Leitlinien Diagnoselisten Klinik Medizin.

---

## B.1 Aufbau der Hauptzeile

Kurz, prägnant, mit allen zentralen Informationen auf den ersten Blick.

**Enthält immer:**
- Die Erkrankung selbst
- Klassifikation oder Schweregrad (wenn vorhanden)
- `ED MM/JJJJ` bei chronischen Erkrankungen
- Ätiologie in der Hauptzeile, wenn eindeutig (statt Unterpunkt)

**Bei akuten Krankheiten mit zu erwartender Restitutio ad integrum** (virale
Atemwegsinfekte, Epistaxis, Schnittverletzungen):
- Datum `TT.MM.JJJJ` **in die Hauptzeile integrieren**
- **Kein "ED"** verwenden

### Beispiele Hauptzeile

| Umständlich | Vereinfacht (bevorzugt) |
|---|---|
| `Leberzirrhose CHILD B, MELD 14, ED 05/2020` + Unterpunkt "Ätiologie: Äthyltoxisch bei chronischem Alkoholabusus" | `Äthyltoxische Leberzirrhose CHILD B, MELD 14, ED 05/2020` |
| `Community acquired Pneumonie` + Unterpunkte "Urinantigen positiv Pneumokokken" + "Infiltrat OL links" | `Pneumokokken-Pneumonie Oberlappen links` |

Wenn die Ätiologie **multifaktoriell** ist und die Hauptzeile zu lang würde: in
den Unterpunkten aufführen.

### Akute Hauptzeilen-Beispiele
```
Vordere Epistaxis am 18.03.2023
Moderate COVID-19 mit bilateraler Pneumonie
```
Bei COVID-19 etc. kann in Unterpunkten `18.02.2023 SARS-CoV-2 PCR positiv` oder
`Symptombeginn 16.02.2023` stehen.

---

## B.2 Reihenfolge der Unterpunkte

**Chronologie:** alt (oben) → neu (unten).

**Ausnahme — "aktuell (MM/JJJJ):" immer als erster Unterpunkt.**
Grund: Fokus auf akute Veränderungen lenken; Datum in Klammern zeigt, dass es
wirklich aktuell ist (und kein Copy-Paste vom Vorbericht).

### Schema
```
Diagnose X. (Hauptzeile)
	aktuell (MM/JJJJ): ... (wenn relevant)
	Ätiologie inkl. DD (mit "am ehesten", "DD")
	Klassifikation / Scores / Risikostratifizierung
	Chronologie / Vorgeschichte (Befunde auf Minimum gekürzt, Operationen, Interventionen)
	Medikamentöse Therapie (nur in Ausnahmen — siehe unten)
	Risikofaktoren (cvRF)
```

### Konkretes Beispiel (als KISIM-Output-Text)
```
▼ HAUPTZEILE:
Paroxysmales Vorhofflimmern, ED 03/2022

▼ UNTERPUNKTE:
aktuell (03/2023): erneute Episode tachykardes Vorhofflimmern
CHA2DS2-VASc-Score 3 Punkte
Katheterablation 10/2022 (STZ)
Erfolgreiche EKV mit 150 Joules 11/2022
Unter Rivaroxaban
cvRF: Nikotin (45 py), arterielle Hypertonie
```

---

## B.3 Zusammenfassende Diagnosen vermeiden

Sammelbegriffe wie **"metabolisches Syndrom"** oder **"Koronare und rhythmogene
Herzkrankheit"** sind zu vermeiden. Stattdessen Einzeldiagnosen führen:
- `Diabetes mellitus Typ 2`
- `Arterielle Hypertonie`
- `Adipositas WHO Grad ...`
- `Paroxysmales Vorhofflimmern, ED ...`

### Wann Unterdiagnose, wann eigene Diagnose?

**Als Unterpunkt** (Unterdiagnose unter Hauptdiagnose):
- Direkte Folge der Hauptdiagnose, mit hoher Sicherheit
- Benötigt keine spezielle eigene Therapie
- Voraussichtlich selbstlimitierend
- Muss nicht auf den ersten Blick ersichtlich sein

Beispiel:
```
1. Gastroenteritis
	Akute prärenale Niereninsuffizienz AKI 2 nach KDIGO
```
(AKI wird abheilen, keine langfristige Therapie nötig. Einrückung mit Tab.)

**Als eigene Diagnose**:
- Zusammenhang unsicher
- Chronischer Verlauf
- Sollte rasch ersichtlich sein

Beispiel:
```
1. Chronische Hepatitis C
2. Hepatozelluläres Karzinom
```
(HCC benötigt spezifische langfristige Therapie)

### Gruppierung
Organsysteme zusammen gruppieren (erst alle kardialen, dann pneumologisch,
dann gastrointestinal, etc.).

---

## B.4 Formatierung der Unterpunkte

- Keine Aufzählungszeichen in der KISIM-Ausgabe (siehe TEIL A Ausgabeformat).
- `aktuell (MM/JJJJ):` als erste Zeile bei chronischen Diagnosen.
- Keine zusätzlichen Markups (kursiv, Unterstreichung, fett) — nicht unterstützt
  im KISIM-Copy-Paste.

### Platzhalter bei fehlender Spezifikation (Qualitätssicherung)

Wenn eine Diagnose im Input nicht vollständig spezifiziert ist, wird der fehlende
Aspekt **inline an der richtigen Stelle** in eckigen Klammern eingefügt:

**Einzelwert fehlt:**
```
ED [MM/JJJJ]
CHA2DS2-VASc-Score [X] Punkte
LVEF [X] %
```

**Typ/Klassifikation fehlt → alle möglichen Optionen in Klammern, durch `/` getrennt:**
```
[Paroxysmales / Persistierendes / Permanentes] Vorhofflimmern
[Tachykardes / Normokardes / Bradykardes] Vorhofflimmern
Herzinsuffizienz [HFpEF / HFmrEF / HFimpEF / HFrEF]
NYHA [I / II / III / IV]
COPD GOLD [I / II / III / IV], Risikoklasse [A / B / E]
Child-Pugh [A / B / C]
AKI [1 / 2 / 3] nach KDIGO
pAVK Fontaine [I / IIa / IIb / III / IV]
```

So muss der Nutzer beim Nachbearbeiten in KISIM nur die nicht zutreffenden Optionen
streichen, statt selbst nachzuschlagen, welche Klassifikationen der Leitfaden
vorsieht.

---

## B.5 Abkürzungen

**Grundsatz:** Der nachbehandelnde Arzt muss die Diagnose auf Anhieb verstehen.

**Prüfen:** 2-3-Buchstaben-Abkürzungen haben oft mehrere Bedeutungen:
- `LP` = Lumbalpunktion **oder** letzte Periode
- `CVI` = chronisch venöse Insuffizienz **oder** cerebrovaskulärer Insult
- `HWI` = Harnwegsinfekt **oder** Hinterwandinfarkt

→ Nur verwenden, wenn Kontext eindeutig ist.

**"St. n."** kann verwendet werden — da Datierung sowieso erfolgt, ist es aber
meistens überflüssig.

**Datumsbezogene Abkürzungen:**
- `ED` (Erstdiagnose) nur für **chronische** Erkrankungen
- `EM` (Erstmanifestation) nur wenn Zeitpunkt der Erstmanifestation und Diagnose
  retrospektiv deutlich auseinander liegen und dies relevant ist
- Bei akuten Zuständen mit Heilung: **Datum in der Hauptzeile**, kein "ED"

Vollständige Liste erlaubter Abkürzungen: siehe **TEIL D**.

---

## B.6 Pleonasmen vermeiden

Kenne die Bedeutung der Abkürzungen, die du verwendest:

| Falsch | Richtig |
|---|---|
| `COVID-19 Infekt` (= "Disease Infekt") | `COVID-19` |
| `HIV-Virus` (= "Human Immunodeficiency Virus-Virus") | `HI-Virus` oder `HIV` |
| `unter OAK mit Rivaroxaban` (Rivaroxaban **ist** ein OAK) | `Unter Rivaroxaban` |

---

## B.7 Wahrscheinlichkeit / Differentialdiagnose

**Unsicherheit in der Diagnose selbst:**
```
Mögliche Riesenzellarteriitis
Wahrscheinliche kardiale Dekompensation
```

**Unklare Ursache eines Symptoms:**
```
Unklarer Entzündungszustand
Dyspnoe unklarer Ursache
```

**Mehrere Ursachen möglich — mit Hauptverdacht:**
```
Respiratorische Partialinsuffizienz, am ehesten bei kardialer Dekompensation,
DD Lungenemphysem, DD Pneumonie
```

**NIEMALS:** Eine einzelne DD ohne Hauptverdacht.
- ✗ `Unklare Dyspnoe, DD kardial`

---

## B.8 Röntgen-/Bildgebungsbefunde

**Gehören grundsätzlich NICHT in die Diagnoseliste** — sie stehen im
Austrittsbericht unter Befunden. Unverarbeitete Copy-paste-Befunde sind
zu löschen.

**Ausnahmen:**
- **TTE mit EF + relevanten Pathologien:**
  ```
  TTE 02/2021: LVEF 30%, schwere Aortenstenose (KÖF 0.8 cm2)
  ```
- **Verlaufsrelevante Messungen** (z.B. Durchmesser Aorten-Aneurysma in
  Verlaufskontrolle)
- **Zufallsbefunde im CT** (z.B. Inzidentalom Nebenniere) → eigene Diagnose,
  CT-Befund nur wenn für die Diagnose relevant

---

## B.9 Laborwerte

**Grundsätzlich vermeiden.** Die Laborwerte stehen in der Laborliste.

**Ausnahme: extreme Werte**
```
Nadir Natrium 102 mmol/l am 22.03.2023
```

---

## B.10 Medikamente in der Diagnoseliste

**Grundsätzlich NICHT** — die Medikamente stehen in der Medikamentenliste
und/oder Epikrise.

**Ausnahmen** (wegen schwerer/langfristiger Nebenwirkungen oder unregelmässiger
Gabe):
- Antikoagulation
- Krebstherapie (Chemotherapie)
- Immunsuppression / Immuntherapie
- Kürzlich stattgehabte Thrombolysen

**Formulierung:** Wirkstoffname, keine Pleonasmen.
- ✓ `Unter Rivaroxaban`
- ✗ `Unter OAK mit Rivaroxaban`
- ✓ `Unter Immuntherapie mit Trastuzumab` (bei wenig geläufigen Medikamenten
  Gattungsbezeichnung erlaubt)
- ✓ `Ocrelizumab alle 6 Monate`

---

## B.11 Interventionen, Operationen, anatomische Varianten

**In der Diagnoseliste aufführen** (als Unterpunkt der passenden Diagnose oder
als eigene Diagnose):
- Liegende Fremdkörper (Portkatheter, Hüftprothese, Pacemaker)
- Veränderte Anatomie (Roux-en-Y-Bypass, Stent-Einlage)
- Normvarianten (akzessorische V. cava)

**NICHT in der Diagnoseliste**, wenn ohne Bezug zum aktuellen Fall oder zu
relevanten chronischen Erkrankungen:
- Beispiel: Cholezystektomie vor 30 Jahren ohne aktuellen Bezug → gehört in
  die persönliche Anamnese, **nicht** in die Diagnoseliste.

---

## B.12 Klassifikationen und Scores

Wenn möglich und relevant, folgende — und keine anderen — Klassifikationen
verwenden:

### Kardiologie
- Herzinsuffizienz nach EF: **HFpEF / HFmrEF / HFimpEF / HFrEF**
- Anstrengungsdyspnoe: **NYHA I–IV**
- Stabile Angina pectoris: **CCS I–IV**
- Instabile Angina pectoris: **Braunwald**
- Vorhofflimmern Schlaganfallrisiko: **CHA2DS2-VASc-Score**
- Symptomlast Vorhofflimmern: **EHRA I–IV**
- Lungenembolie: **PESI**

### Pneumologie
- COPD: **GOLD I–IV + Risikoklasse A–E**
- OSAS: **Apnoe-Hypopnoe-Index (AHI)**
- Pneumonie: **PSI**

### Angiologie
- pAVK: **Fontaine**
- Chronisch venöse Insuffizienz: **CEAP** (klinisch, ätiologisch, anatomisch,
  pathophysiologisch)

### Gastroenterologie
- Leberzirrhose: **Child-Pugh (+/- MELD)**
- Pankreatitis: **Ranson's, BISAP oder Atlanta**
- Obere GI-Blutung: **Glasgow-Blatchford-Bleeding-Score**

### Nephrologie
- Akute Niereninsuffizienz: **AKI nach KDIGO**
- Chronische Niereninsuffizienz: **CKD nach KDIGO**

### Infektiologie
- Sepsis: **SOFA-Score, qSOFA**
- Endokarditis: **modifizierte Duke-Kriterien**

### Neurologie
- Stroke: **NIHSS**
- Bewusstsein: **GCS**

---

## B.13 Stigmatisierende Diagnosen

Vorsichtig verwenden und bei Unsicherheit relativieren (z.B. `Mögliche ...`,
`Wahrscheinliche ...`).

---

## B.14 Abrechnungsrelevanz

Gewisse Informationen müssen im Bericht erwähnt werden, damit sie codiert
werden können. Die wichtigsten für die Codierung notwendigen Informationen
sind in den KISIM-Textbausteinen (Medizin/Diagnoseliste) hinterlegt und
sollten nicht weggelassen werden, wenn sie bekannt sind:
- Klassifikationen / Schweregrade
- Relevante Scores
- ED-Daten bei chronischen Erkrankungen
- Komplikationen

---
---

# TEIL C — Palliativ-Maske (Palliativstation)

> Ursprünglich: `references/palliativ-vorlage.md`

**WICHTIG:** Diese Maske ist **zwingend** für die Hauptdiagnose der palliativmedizinisch
betreuten Patienten zu verwenden. Abweichungen vom Standard-Leitfaden sind hier
beabsichtigt. Nicht nachverhandeln.

Weitere Diagnosen (Komorbiditäten) **nicht** in die Maske pressen — diese folgen
dem Standard-Leitfaden und werden als separate Diagnosen nach der Hauptdiagnose
ausgegeben.

---

## C.1 Struktur der Palliativ-Maske (für die Hauptdiagnose)

Die gesamte Maske landet im **Unterpunkte-Feld** (KISIM untere Zeile) der
Hauptdiagnose. Die **Hauptzeile** selbst ist die onkologische / palliativmedizinisch
führende Grunddiagnose (z.B. `Metastasiertes Pankreaskarzinom, ED 03/2024`).

### Einrückung

**Ausschliesslich mit Tab-Zeichen (`\t`), nicht mit Leerzeichen.**

### Vollständige Vorlage (keine leeren Zeilen zwischen den einzelnen Unterpunkten)

```
aktuell MM/JJJJ: aktuelle Symptomatik / aktuelles Problem, welche/s zum Eintritt geführt hat
Onkologischer Verlauf
Tumorboards / Besonderheiten / Entscheide
Diagnostik
Bildgebung
CT XY: Befund
Histologie
XY: Befund
Therapie
Tumortherapie
Chemotherapie
Radiotherapie
Immuntherapie
Hormontherapie
Operationen
Interventionen
Palliativmedizinische Komplexbehandlung
ECOG-Performance Status: bei Eintritt X, im Verlauf Y
Aktuelles medizinisches Problem 1
Aktuelles medizinisches Problem 2
[Milde / Moderate / Erhebliche] Energie- und Eiweissmangelernährung
NRS X/7, BMI XY kg/m2, Symptome
Palliative Vorsorgeplanung und Entscheidungsfindung
Rundtischgespräch am TT.MM.JJJJ
Austritt nach XY mit Wunsch nach Z
keine Reanimationsmassnahmen
keine Intensivtherapie
keine Antibiotikatherapie
keine enterale oder parenterale Ernährungstherapie
```

---

## C.2 Regeln zum Ausfüllen

### Block "Onkologischer Verlauf"
**Punkte ohne Informationen werden gelöscht.**

Vorgehen:
- Keine Information zu einem Unterpunkt (z.B. keine Radiotherapie) → Zeile löschen.
- Keine Information zu einer ganzen Unterkategorie (z.B. gar keine `Tumortherapie`,
  weder Chemo noch Radio noch Immuno noch Hormon) → die ganze Unterkategorie-Zeile
  löschen, inklusive Überschrift.
- Wenn eine Überschrift (z.B. `Diagnostik`) keine ausgefüllten Unterpunkte mehr
  hat, diese Überschrift ebenfalls löschen.
- Fülle-Platzhalter wie `XY: Befund` nicht stehen lassen — entweder mit realen
  Angaben ersetzen oder die Zeile löschen.

### Block "Palliativmedizinische Komplexbehandlung"
**Diesen Block im Wesentlichen unverändert übernehmen** und fallspezifisch füllen.

Auch hier gilt:
- `Aktuelles medizinisches Problem 1`, `2`, etc. sind Platzhalter, die mit den
  tatsächlichen aktuellen medizinischen Problemen des Patienten ersetzt werden
  (z.B. `Tumorschmerzen, NRS Ruhe 4/10, Belastung 7/10`).
- Die abschliessende Liste `keine Reanimationsmassnahmen / keine Intensivtherapie /
  keine Antibiotikatherapie / keine enterale oder parenterale Ernährungstherapie`
  ist der **Standard-Wunsch** und bleibt **so stehen**, sofern der Patient diese
  Entscheidungen tatsächlich getroffen hat. Falls nur ein Teil davon gilt
  (z.B. Patient wünscht Antibiotika), entsprechende Zeile anpassen oder streichen.
- Angaben zu `ECOG`, `NRS`, `BMI`, `Rundtischgespräch`, `Austritt` werden mit
  konkreten Werten/Daten gefüllt.

### Platzhalter bei fehlenden Angaben (siehe TEIL A für Gesamtregel)

**Einzelne Werte fehlen** → Platzhalter mit Beschreibung:
- `ECOG-Performance Status: bei Eintritt [0-4], im Verlauf [0-4]`
- `NRS [X]/7, BMI [X] kg/m2`
- `Rundtischgespräch am [TT.MM.JJJJ]`
- `Austritt nach [Ort] mit Wunsch nach [Betreuungsform]`

**Klassifikation mit definiertem Set** → alle Optionen in Klammern:
- `[Milde / Moderate / Erhebliche] Energie- und Eiweissmangelernährung`

### Energie- und Eiweissmangelernährung
`Milde / Moderate / Erhebliche` je nach Ausprägung wählen — oder als Platzhalter
`[Milde / Moderate / Erhebliche]` stehen lassen, wenn unklar. NRS-Wert und BMI
mit angeben. Symptome knapp benennen (z.B. `Anorexie, Nausea, frühes Sättigungsgefühl`).

---

## C.3 Ausgabeformat

Palliativ-Modus gibt aus:

1. **Diagnose 1**: Hauptdiagnose nach Palliativ-Maske (wie oben)
2. **Diagnose 2 ff.**: alle weiteren Diagnosen / Komorbiditäten nach
   Standard-Leitfaden (TEIL B)

Alle Diagnose-Blöcke nach dem gleichen zweigeteilten Format (Hauptzeile +
Unterpunkte, ohne Aufzählungszeichen) wie in TEIL A
spezifiziert.

---

## C.4 Vollständiges Output-Beispiel (Palliativ-Modus)

**Input (vereinfacht):**
- Hauptdiagnose: Metastasiertes NSCLC Adenokarzinom Stadium IV, ED 05/2024
- CT Thorax 03/2026: Progress pulmonaler Metastasen
- Histologie 05/2024: Adenokarzinom, EGFR/ALK negativ
- Tumorboard 05/2024: Entscheid palliative Chemo
- Chemo mit Cis/Pem 06/2024 bis 10/2024
- ECOG bei Eintritt 3
- BMI 19, NRS 3/7, Anorexie und Nausea
- Rundtischgespräch 15.04.2026, Austritt nach Hause mit Spitex gewünscht
- Kein Wunsch auf Reanimation, IPS, Antibiotika, künstliche Ernährung
- Komorbiditäten: aHT seit 2015, DM2 seit 2018

**Output:**
```
═══════════════════════════════════════════════════════
DIAGNOSE 1
═══════════════════════════════════════════════════════

▼ HAUPTZEILE (oberes KISIM-Feld):

Metastasiertes NSCLC Adenokarzinom Stadium IV, ED 05/2024


▼ UNTERPUNKTE (unteres KISIM-Feld):

aktuell (04/2026): Progress pulmonaler Metastasen mit zunehmender Dyspnoe
Onkologischer Verlauf
Tumorboards / Besonderheiten / Entscheide
Tumorboard 05/2024: Entscheid palliative Chemotherapie
Diagnostik
Bildgebung
CT Thorax 03/2026: Progress pulmonaler Metastasen
Histologie
05/2024: Adenokarzinom, EGFR/ALK negativ
Therapie
Tumortherapie
Chemotherapie
Cisplatin/Pemetrexed 06/2024 bis 10/2024
Palliativmedizinische Komplexbehandlung
ECOG-Performance Status: bei Eintritt 3, im Verlauf [0-4]
Tumordyspnoe bei progredienter pulmonaler Metastasierung
Tumorschmerzen [Lokalisation, NRS Ruhe / Belastung]
Milde Energie- und Eiweissmangelernährung
NRS 3/7, BMI 19 kg/m2, Symptome: Anorexie, Nausea
Palliative Vorsorgeplanung und Entscheidungsfindung
Rundtischgespräch am 15.04.2026
Austritt nach Hause mit Wunsch nach Betreuung durch Spitex
keine Reanimationsmassnahmen
keine Intensivtherapie
keine Antibiotikatherapie
keine enterale oder parenterale Ernährungstherapie


═══════════════════════════════════════════════════════
DIAGNOSE 2
═══════════════════════════════════════════════════════

▼ HAUPTZEILE (oberes KISIM-Feld):

Arterielle Hypertonie, ED [MM/]2015


▼ UNTERPUNKTE (unteres KISIM-Feld):

(keine weiteren Details verfügbar)


═══════════════════════════════════════════════════════
DIAGNOSE 3
═══════════════════════════════════════════════════════

▼ HAUPTZEILE (oberes KISIM-Feld):

Diabetes mellitus Typ 2, ED [MM/]2018


▼ UNTERPUNKTE (unteres KISIM-Feld):

HbA1c [X] % ([MM/JJJJ])
Unter [orale Antidiabetika / Insulin / GLP-1-Agonist / ...]


Nachzutragen: ECOG im Verlauf, Tumorschmerzen-Lokalisation und NRS,
HbA1c und aktuelle DM-Therapie, aHT-Therapie
```

Beachte in diesem Beispiel:
- `Radiotherapie`, `Immuntherapie`, `Hormontherapie`, `Operationen`, `Interventionen`
  wurden aus dem Onkologischen Verlauf **gelöscht**, weil keine Information dazu vorlag.
- Der Block `Palliativmedizinische Komplexbehandlung` ist vollständig vorhanden
  (inklusive Standard-"keine ..."-Liste).
- Einrückung erfolgt mit **echten Tab-Zeichen** (in KISIM beim Paste als Einrückung
  interpretiert).
- Fehlende Werte stehen **inline** in eckigen Klammern am richtigen Platz — nicht
  nur in einer Schlussliste.
- Komorbiditäten aHT und DM2 sind **separate Diagnosen** nach Standard-Leitfaden,
  nicht in die Maske gepresst.

---
---

# TEIL D — Erlaubte Abkürzungen

> Ursprünglich: `references/abkuerzungen.md`

Quelle: Anhang Leitfaden Diagnoselisten Klinik Medizin.
Diese Abkürzungen dürfen verwendet werden, **sofern der Kontext sie eindeutig macht**.

---

## D.1 Echokardiographie

| Abkürzung | Bedeutung |
|---|---|
| AS | Aortenklappenstenose |
| AI | Aortenklappeninsuffizienz |
| MS | Mitralklappenstenose |
| MI | Mitralklappeninsuffizienz |
| RA/RV xx mmHg | Gradient bei pulmonalarterieller Hypertonie |
| LA | Linkes Atrium |
| LV | Linker Ventrikel |
| RA | Rechtes Atrium |
| RV | Rechter Ventrikel |
| LVEF | Visuell geschätzte, systolische linksventrikuläre Funktion |
| TTE | Transthorakale Echokardiographie |
| TEE | Transösophageale Echokardiographie |

---

## D.2 Radiologie

| Abkürzung | Bedeutung |
|---|---|
| Sono | Ultraschall |
| Thoraxröntgen | Konventionelles Thoraxröntgen |
| CT Abdomen | Computertomographie des Abdomens |
| CT Thorax | Computertomographie des Thorax |
| cCT | Kranielle Computertomographie |
| cMRT | Kranielle Magnetresonanztomographie |

---

## D.3 Infektiologie

| Abkürzung | Bedeutung |
|---|---|
| BK | Blutkultur |
| UK | Urinkultur |
| Tbc | Tuberkulose |

---

## D.4 IPS / Installationen

| Abkürzung | Bedeutung |
|---|---|
| PVK | Peripherer Verweilkatheter |
| ZVK | Zentraler Verweilkatheter |
| NIV | Nicht invasive Beatmung |
| HFOT | High flow oxygen therapy |
| DK | Dauerblasenkatheter transurethral |
| MS | Magensonde |
| Tubus | Beatmungstubus |
| PAC | Pulmonaliskatheter |
| PiCCO | Pulse Contour Cardiac Output Katheter |
| AK | Arterienkatheter |
| TD | Thoraxdrainage |
| TS | Tracheostoma |
| PSM | Provisorischer Schrittmacher |
| Schleuse | Schleuse für PAC oder Schrittmacher |
| PD | Perikarddrainage |
| PDK | Periduralkatheter |

---

## D.5 Pneumologie

| Abkürzung | Bedeutung |
|---|---|
| LUFU | Lungenfunktion |
| ABGA | Arterielle Blutgasanalyse |
| DLCO | Diffusionskapazität Kohlenmonoxid |
| BAL | Bronchoalveoläre Lavage |
| EBUS TBNA | Endobronchialer Ultraschall transbronchiale Nadelaspiration |

---

## D.6 Kardiologie

| Abkürzung | Bedeutung |
|---|---|
| cvRF | Kardiovaskuläre Risikofaktoren |
| DM2 | Diabetes mellitus Typ 2 |
| aHT | Arterielle Hypertonie |
| Nikotin py | pack years |
| FA | Familienanamnese |

---

## D.7 Allgemeines

| Abkürzung | Bedeutung |
|---|---|
| MMS | Mini-Mental Status |
| FE Harnstoff | Fraktionierte Harnstoff-Exkretion |

---

## D.8 Datumsbezogene Abkürzungen

| Abkürzung | Verwendung |
|---|---|
| `ED MM/JJJJ` | Erstdiagnose — nur bei **chronischen** Erkrankungen |
| `EM MM/JJJJ` | Erstmanifestation — nur bei chronischen Erkrankungen, wenn sich Erstmanifestation und Diagnose deutlich unterscheiden und dies relevant ist |
| `St. n.` | Status nach — selten nötig, da Datierung sowieso erforderlich |
| `am TT.MM.JJJJ` | Datum eines akuten Ereignisses (in Hauptzeile) |
| `Symptombeginn am TT.MM.JJJJ` | z.B. bei viralen Infekten |

---

## D.9 Mehrdeutige Abkürzungen — mit Vorsicht verwenden

Nur verwenden, wenn der Kontext absolut eindeutig ist, sonst ausschreiben:

| Abkürzung | Mögliche Bedeutungen |
|---|---|
| LP | Lumbalpunktion / letzte Periode |
| CVI | chronisch venöse Insuffizienz / cerebrovaskulärer Insult |
| HWI | Harnwegsinfekt / Hinterwandinfarkt |
| MS | Mitralklappenstenose / Magensonde / Multiple Sklerose |
| AI | Aortenklappeninsuffizienz / Aortic Insufficiency |

---

## D.10 Pleonasmen (vermeiden)

| Falsch | Richtig |
|---|---|
| COVID-19 Infekt | COVID-19 |
| HIV-Virus | HI-Virus oder HIV |
| unter OAK mit Rivaroxaban | Unter Rivaroxaban |
| NSTEMI-Infarkt | NSTEMI |
| EKG-Untersuchung | EKG |
