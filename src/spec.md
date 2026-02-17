# Specification

## Summary
**Goal:** Make slide image previews reliably visible in the editor and export a real, editable PowerPoint (.pptx) file with embedded slide text and images.

**Planned changes:**
- Fix slide preview rendering so images display at a visible size when a slide has an uploaded image data URL or a direct image URL, avoiding zero-height layout and overlay masking.
- Keep the current “Google Images search URL” handling by showing the existing guidance placeholder rather than attempting to render a broken/blank image.
- Replace the current HTML-based export with true .pptx generation that preserves the existing minimal white + blue academic styling and 16:9 layout, embedding slide text and images (preferring uploadedDataUrl over url).
- Update export UI messaging and toasts to reflect PPTX download behavior, including clear English success/failure messages and warnings for non-direct image URLs that cannot be embedded.

**User-visible outcome:** Slide thumbnails/previews show assigned images reliably, and clicking “Export Presentation” downloads an editable .pptx (11 slides, 16:9) with embedded text and supported images, plus clear English warnings when remote image URLs can’t be embedded.
