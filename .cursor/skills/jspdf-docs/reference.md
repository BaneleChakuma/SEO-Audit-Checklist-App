# jsPDF documentation map

Use this when the task goes beyond basic text export for the SEO audit report.

**Docs base URL:** https://raw.githack.com/MrRio/jsPDF/master/docs/

If raw.githack shows an interstitial warning page, use the same path on GitHub raw:

`https://raw.githubusercontent.com/MrRio/jsPDF/master/docs/<page>.html`

## Getting started

| Topic | URL |
|-------|-----|
| Docs home | https://raw.githack.com/MrRio/jsPDF/master/docs/index.html |
| GitHub README (install, usage, security) | https://github.com/parallax/jsPDF/blob/master/README.md |
| Live examples | https://raw.githack.com/MrRio/jsPDF/master/ |
| npm package | https://www.npmjs.com/package/jspdf |
| Stack Overflow tag | https://stackoverflow.com/questions/tagged/jspdf |

## Core class — `jsPDF`

| Topic | URL |
|-------|-----|
| `jsPDF` constructor & instance | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html |
| `text` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.text |
| `addPage` / `deletePage` / `insertPage` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.addPage |
| `save` (browser download) | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.save |
| `output` (blob, arraybuffer, datauristring) | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.output |
| `setFont` / `setFontSize` / `getFont` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.setFont |
| `setTextColor` / `setDrawColor` / `setFillColor` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.setTextColor |
| `setLineWidth` / `line` / `rect` / `roundedRect` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.line |
| `circle` / `ellipse` / `triangle` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.circle |
| `addFont` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.addFont |
| `setPage` / `getNumberOfPages` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.setPage |
| `setDocumentProperties` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.setDocumentProperties |

## Text layout modules

| Topic | URL |
|-------|-----|
| `split_text_to_size` — wrap text to width | https://raw.githack.com/MrRio/jsPDF/master/docs/module-split_text_to_size.html |
| `getTextWidth` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.getTextWidth |
| `getCharWidthsArray` / `getStringUnitWidth` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-split_text_to_size.html |

## Tables (built-in)

| Topic | URL |
|-------|-----|
| `cell` module overview | https://raw.githack.com/MrRio/jsPDF/master/docs/module-cell.html |
| `table` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-cell.html |
| `cellAddPage` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-cell.html |
| `setTableHeaderRow` / `printHeaderRow` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-cell.html |

## Images & graphics

| Topic | URL |
|-------|-----|
| `addImage` module | https://raw.githack.com/MrRio/jsPDF/master/docs/module-addImage.html |
| `getImageProperties` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-addImage.html |
| `svg` — `addSvgAsImage` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-svg.html |
| `canvas` / `context2d` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-canvas.html |
| Image format plugins (jpeg, bmp, gif, webp) | https://raw.githack.com/MrRio/jsPDF/master/docs/index.html |

## HTML & DOM (optional — extra dependencies)

| Topic | URL |
|-------|-----|
| `html` module | https://raw.githack.com/MrRio/jsPDF/master/docs/module-html.html |
| `html2canvas` (peer dependency) | https://www.npmjs.com/package/html2canvas |
| `dompurify` (peer dependency for HTML strings) | https://www.npmjs.com/package/dompurify |

## Links, annotations, metadata

| Topic | URL |
|-------|-----|
| `annotations` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-annotations.html |
| `link` / `textWithLink` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-annotations.html |
| `addMetadata` | https://raw.githack.com/MrRio/jsPDF/master/docs/global.html#addMetadata |

## Fonts & virtual file system

| Topic | URL |
|-------|-----|
| `vFS` — `addFileToVFS`, `getFileFromVFS` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-vFS.html |
| `standard_fonts_metrics` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-standard_fonts_metrics.html |
| `ttfsupport` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-ttfsupport.html |
| Online font converter | https://raw.githack.com/MrRio/jsPDF/master/fontconverter/fontconverter.html |
| UTF-8 / custom fonts (README) | https://github.com/parallax/jsPDF/blob/master/README.md#use-of-unicode-characters--utf-8 |

## Page numbers & viewer

| Topic | URL |
|-------|-----|
| `total_pages` / `putTotalPages` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-total_pages.html |
| `viewerpreferences` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-viewerpreferences.html |
| `setDisplayMode` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.setDisplayMode |

## Forms (AcroForm)

| Topic | URL |
|-------|-----|
| AcroForm overview | https://raw.githack.com/MrRio/jsPDF/master/docs/module-AcroForm.html |
| `AcroFormTextField` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-AcroForm-AcroFormTextField.html |
| `AcroFormCheckBox` | https://raw.githack.com/MrRio/jsPDF/master/docs/module-AcroForm-AcroFormCheckBox.html |

## Advanced / graphics state

| Topic | URL |
|-------|-----|
| `GState` | https://raw.githack.com/MrRio/jsPDF/master/docs/GState.html |
| `Matrix` / transformations | https://raw.githack.com/MrRio/jsPDF/master/docs/Matrix.html |
| `advancedAPI` / `compatAPI` (README) | https://github.com/parallax/jsPDF/blob/master/README.md#advanced-functionality |
| `saveGraphicsState` / `restoreGraphicsState` | https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#.saveGraphicsState |

## Node.js

| Topic | URL |
|-------|-----|
| Node usage (README) | https://github.com/parallax/jsPDF/blob/master/README.md#running-in-nodejs |
| File system permissions | https://github.com/parallax/jsPDF/blob/master/README.md#reading-files-from-the-local-file-system-on-node |
| `jspdf.node.*.js` build | https://github.com/parallax/jsPDF/blob/master/README.md#install |

Note: This app generates PDFs **in the browser** on the export page. Node docs apply only if the user adds a server-side script.

## Security & optional dependencies

| Topic | URL |
|-------|-----|
| Security advisory (README) | https://github.com/parallax/jsPDF/blob/master/README.md#security |
| SECURITY.md | https://github.com/parallax/jsPDF/blob/master/SECURITY.md |
| Optional deps / webpack externals | https://github.com/parallax/jsPDF/blob/master/README.md#optional-dependencies |
| Polyfills (legacy IE) | https://github.com/parallax/jsPDF/blob/master/README.md#polyfills |

## Community plugins (not bundled)

| Plugin | Purpose | URL |
|--------|---------|-----|
| jspdf-autotable | Rich table layouts | https://github.com/simonbengtsson/jsPDF-AutoTable |
| jspdf-html2canvas | HTML snapshots | Often used with core `html()` |

Only recommend plugins when built-in `cell`/`table` or manual layout is insufficient.

## SEO Audit Checklist App — suggested PDF contents

When implementing `generatePDF.js`, include:

| Section | Suggested jsPDF APIs |
|---------|---------------------|
| Report title & date | `setFontSize`, `text` |
| Site URL & overall score | `text` |
| Per-category headings (On-Page, Technical, Content) | `setFontSize`, `text` |
| Checklist rows (pass/fail) | `text` or `table` |
| Fix suggestions for failed items | `splitTextToSize`, `setTextColor` |
| Multi-page long audits | `addPage`, track `y` |
| Optional logo | `addImage` |
| Download filename | `save('seo-audit-....pdf')` |

Data should come from the same audit session state / Firestore shape used on the score and checklist screens — do not duplicate business logic inside the PDF util; pass a plain data object in.
