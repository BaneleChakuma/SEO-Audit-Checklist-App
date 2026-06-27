---
name: jspdf-docs
description: >-
  Teaches jsPDF using official MrRio/jsPDF docs patterns with plain-language
  explanations before code. Use when generating or downloading PDF reports,
  implementing export features, adding text/tables/images to PDFs, debugging
  jsPDF errors, or when the user asks jsPDF or PDF export questions.
---

# jsPDF Documentation Guide

Follow the [official jsPDF docs](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html) as the authoritative source. This skill shapes *how* you explain and write PDF export code for this project — not generic document tutorials.

## Teaching workflow

When helping with jsPDF (setup, export logic, layout, or bugs), use this order:

1. **Explain first** — In plain language, say what the PDF will contain and how we build it, before any code.
2. **Show code** — Use the **ES module** import (`import { jsPDF } from 'jspdf'`), never legacy globals (`window.jspdf`) unless the user is on a script-tag setup.
3. **Walk through it** — After the code, explain what the important lines do.
4. **Say why** — Prefer "we do X because Y" over "do X".
5. **Simplest first** — Recommend `text()` + `splitTextToSize()` for this app before heavier options like `html()` or canvas plugins.

Keep explanations accessible. Do not assume the user already knows PDF coordinates, units, or font limitations.

## When to consult the jsPDF docs

For API details, optional plugins, or uncertain behavior, fetch the relevant doc page rather than guessing. Start with the table in [reference.md](reference.md).

High-priority pages for this app:

| Topic | URL |
|-------|-----|
| Docs home | https://raw.githack.com/MrRio/jsPDF/master/docs/index.html |
| `jsPDF` class | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html |
| `text` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.text |
| `splitTextToSize` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-split_text_to_size.html |
| `addPage` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.addPage |
| `save` / `output` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.save |
| Built-in tables (`cell`) | https://raw.githack.com/MrRio/jsPDF/master/docs/module-cell.html |
| `addImage` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-addImage.html |
| `html` (optional) | https://raw.githack.com/MrRio/jsPDF/master/docs/module-html.html |
| GitHub README | https://github.com/parallax/jsPDF/blob/master/README.md |
| Live demos | https://raw.githack.com/MrRio/jsPDF/master/ |

## This project's PDF layout

Match existing conventions in this repo:

| File | Responsibility |
|------|----------------|
| `src/utils/generatePDF.js` | Build the PDF from audit data; return or trigger download |
| `src/pages/ExportPage.jsx` | UI for export — loading, error, and download button |

**Never put jsPDF calls directly inside page or UI components.** Pages call `generatePDF()` (or a thin hook); PDF logic stays in `src/utils/`.

### Install (Vite + React)

```bash
npm install jspdf --save
```

Import in utility code:

```js
import { jsPDF } from 'jspdf';
```

Vite resolves the ES build automatically — no special config needed for basic `text()` / `save()` usage.

## Core patterns for this app

### Minimal audit report export

Use this shape for the SEO audit PDF: site URL, score out of 100, checklist sections, failed items with fix tips.

```js
// src/utils/generatePDF.js
import { jsPDF } from 'jspdf';

/**
 * Build and download a PDF audit report.
 * @param {{ siteUrl: string, score: number, sections: Array }} auditData
 */
export const generatePDF = (auditData) => {
  // A4 portrait, millimeters — jsPDF default; easy to reason about on screen
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const margin = 15;
  let y = margin;

  // Title block
  doc.setFontSize(18);
  doc.text('SEO Audit Report', margin, y);
  y += 10;

  doc.setFontSize(11);
  doc.text(`Site: ${auditData.siteUrl}`, margin, y);
  y += 7;
  doc.text(`Score: ${auditData.score} / 100`, margin, y);
  y += 12;

  // Each checklist section
  auditData.sections.forEach((section) => {
    doc.setFontSize(14);
    doc.text(section.title, margin, y);
    y += 8;

    doc.setFontSize(10);
    section.items.forEach((item) => {
      const status = item.passed ? '[PASS]' : '[FAIL]';
      const lines = doc.splitTextToSize(`${status} ${item.label}`, 180);

      // New page if we run out of room (A4 height ≈ 297mm)
      if (y + lines.length * 5 > 280) {
        doc.addPage();
        y = margin;
      }

      doc.text(lines, margin, y);
      y += lines.length * 5 + 2;

      if (!item.passed && item.fixTip) {
        doc.setTextColor(100);
        const tipLines = doc.splitTextToSize(`Tip: ${item.fixTip}`, 175);
        doc.text(tipLines, margin + 5, y);
        y += tipLines.length * 5 + 4;
        doc.setTextColor(0);
      }
    });

    y += 6;
  });

  const safeName = auditData.siteUrl.replace(/[^a-z0-9]+/gi, '-').slice(0, 40);
  doc.save(`seo-audit-${safeName || 'report'}.pdf`);
};
```

**Why this approach:** `text()` + `splitTextToSize()` keeps the bundle small, works offline in the browser, and avoids optional deps (`html2canvas`, `dompurify`) that the `html()` method needs.

### Wire-up from the export page

```jsx
// src/pages/ExportPage.jsx — pattern only; adapt to real audit state
import { useState } from 'react';
import { generatePDF } from '../utils/generatePDF';

const ExportPage = ({ auditData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      // generatePDF is sync today; async/await leaves room for fonts/images later
      await Promise.resolve(generatePDF(auditData));
    } catch (err) {
      setError('Could not create the PDF. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={handleExport} disabled={loading}>
      {loading ? 'Generating PDF…' : 'Download PDF report'}
    </button>
  );
};

export default ExportPage;
```

Always surface **loading** and **error** states on the export UI.

## Coordinates, units, and pages

| Concept | Detail |
|---------|--------|
| Origin | Top-left corner is `(0, 0)` |
| Default unit | Millimeters (`mm`) on A4 portrait |
| `text(x, y, ...)` | `x` = distance from left; `y` = distance from **top** |
| Page size | A4 ≈ 210 × 297 mm — leave bottom margin (~15–20 mm) before `addPage()` |
| `addPage()` | Call when `y` would exceed safe bottom; reset `y` to top margin |

Constructor options (from docs):

```js
const doc = new jsPDF({
  orientation: 'portrait', // or 'landscape'
  unit: 'mm',              // 'pt', 'px', 'in', 'mm', 'cm', 'ex', 'em', 'pc'
  format: 'a4',            // or 'letter', or [width, height]
});
```

## Text wrapping and long content

Standard PDF fonts only cover ASCII. For English checklist copy, built-in fonts are fine.

```js
const maxWidth = 180; // mm — page width minus margins
const lines = doc.splitTextToSize(longFixSuggestion, maxWidth);
doc.text(lines, margin, y);
y += lines.length * lineHeight;
```

Use a consistent `lineHeight` (often `fontSize * 0.35` in mm, or trial 5–6 mm for 10pt body text).

## Tables (checklist rows)

Two options, simplest first:

1. **Manual layout** — `text()` per column; best for small, styled reports (see core pattern above).
2. **Built-in `cell` / `table` module** — see [module-cell](https://raw.githack.com/MrRio/jsPDF/master/docs/module-cell.html) for `doc.table()` with headers and row arrays.

Community plugin `jspdf-autotable` is popular but **not** part of core jsPDF — only add it if the user explicitly wants that dependency.

## Images and branding (optional)

```js
// dataUrl from canvas, file input, or imported asset
doc.addImage(logoDataUrl, 'PNG', margin, y, 40, 15);
y += 20;
```

See [addImage module](https://raw.githack.com/MrRio/jsPDF/master/docs/module-addImage.html) for supported formats and sizing.

## Security

jsPDF docs **strongly advise sanitizing user input** before passing it to `text()`, `html()`, or annotations. Audit `siteUrl`, custom notes, and any user-typed labels — strip or escape content that could be abused in exported files.

Do not pass raw HTML from users into `doc.html()` without sanitization (`dompurify` is an optional peer dep).

## What to avoid in this project

| Avoid | Prefer instead |
|-------|----------------|
| `require('jspdf')` in Vite client code | `import { jsPDF } from 'jspdf'` |
| `window.jspdf` in React modules | ES module import |
| PDF logic inside `ExportPage.jsx` | `src/utils/generatePDF.js` |
| `doc.html()` for the whole report | `text()` + `splitTextToSize()` unless user needs pixel-perfect HTML |
| `.then()` chains | `async/await` in export handlers |
| Class components | Functional components + arrow functions |
| Assuming UTF-8 emoji in default fonts | ASCII labels or custom `.ttf` via `addFileToVFS` / `addFont` |

## Unicode / custom fonts

The 14 standard fonts are ASCII-only. If the report needs extended characters:

1. Use the [font converter](https://raw.githack.com/MrRio/jsPDF/master/fontconverter/fontconverter.html), or
2. Load a `.ttf` binary string and register it:

```js
doc.addFileToVFS('MyFont.ttf', fontBinaryString);
doc.addFont('MyFont.ttf', 'MyFont', 'normal');
doc.setFont('MyFont');
```

Details: [README — UTF-8](https://github.com/parallax/jsPDF/blob/master/README.md#use-of-unicode-characters--utf-8).

## Optional `html()` method

`doc.html(element, options)` renders DOM to PDF but pulls in **html2canvas** and often **dompurify** as optional dependencies. Vite may code-split them automatically. Prefer manual layout for this checklist app unless the user explicitly wants a WYSIWYG HTML snapshot.

## Advanced API modes

jsPDF has `compatAPI` (default, plugin-friendly) and `advancedAPI` (transformation matrices, patterns). Stay on the default unless the user needs advanced graphics — see [README — Advanced Functionality](https://github.com/parallax/jsPDF/blob/master/README.md#advanced-functionality).

## Explaining bugs

When the user reports a PDF issue:

1. Ask what they **expected** vs what **actually** happened (blank PDF, clipped text, wrong filename, etc.).
2. Ask them to check the **browser DevTools console** for red errors.
3. Check common causes: `y` past page bottom without `addPage()`, non-ASCII text on standard fonts, `undefined` audit fields passed to `text()`, missing `jspdf` install.
4. Walk through fixes step by step.
5. Explain **why** it happened (coordinate overflow, font glyph limits, sync error not caught, etc.).

## Common fixes (quick reference)

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Text cut off at page bottom | No `addPage()` when `y` grows | Check `y` against ~280 mm; call `addPage()` and reset `y` |
| Garbled or empty characters | UTF-8 on standard font | Use ASCII or add custom TTF font |
| `jspdf` not found | Package not installed | `npm install jspdf` |
| Blank sections | `undefined` in template strings | Guard audit data before `text()` |
| Huge bundle after export | Used `html()` | Switch to `text()` layout or accept optional chunks |
| Download does nothing | Error swallowed | `try/catch` + `console.error`; show UI error state |
| Table overlaps | Fixed `y` without measuring row height | Increment `y` by `lines.length * lineHeight` |

## Code style defaults for this project

When editing PDF-related files:

- Use **`const` arrow functions** — `export const generatePDF = (data) => { ... }`.
- Add **section comments** in `generatePDF.js` (title, score, sections, footer).
- Keep **styling in Tailwind** on the page; PDF styling uses jsPDF APIs (`setFontSize`, `setTextColor`, etc.).
- Handle **loading and error** states on `ExportPage.jsx`.
- Name downloads clearly: `seo-audit-{site-slug}.pdf`.

## How this skill fits with others

| Task | Primary skill | Also useful |
|------|---------------|-------------|
| PDF generation, jsPDF API | **jspdf-docs** | — |
| Export page UI, buttons, state | react-dev | jspdf-docs |
| Loading audit data for export | firebase-docs | jspdf-docs |
| Install / bundle size | vite-docs | jspdf-docs |

## Response shape for teaching

Use this structure for concept explanations:

```markdown
## What we're doing
[1–2 sentences — what the PDF contains and how we build it]

## Why this approach
[Reason tied to jsPDF docs — e.g. text() vs html()]

## Code
[Minimal generatePDF or snippet]

## How it works
- Line/pattern 1: ...
- Line/pattern 2: ...

## What to try next
[Optional single follow-up if natural]
```

For quick fixes in an existing codebase, you may shorten — but still explain the change and why.

## Extended reference

For the full jsPDF API map (AcroForm, annotations, SVG, plugins, Node usage), see [reference.md](reference.md).
