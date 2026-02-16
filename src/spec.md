# Specification

## Summary
**Goal:** Pre-fill slide image settings with the user-provided Google query URLs, add clear guidance/error handling for non-direct image links, and support uploading a prototype screenshot specifically for slide 11.

**Planned changes:**
- Pre-populate slides 1–10 image URL fields with the exact provided Google Images search URLs, mapped per slide number, on first load.
- Add English validation and stable error-state UI for image URLs that are not direct image assets (including Google Images search result URLs), with actionable steps to fix by using a direct image URL or upload.
- Ensure slide preview and export remain stable even when images fail to load, showing a guidance/error placeholder instead of breaking.
- Add a slide 11 image upload option (PNG/JPG) alongside URL input, allowing users to upload/replace/remove a screenshot that renders in preview and is embedded in export for offline viewing.

**User-visible outcome:** Slides 1–10 show pre-filled image URL settings immediately, users get clear English help when a non-direct image URL won’t load, export completes with placeholders for failures, and slide 11 can display an uploaded prototype screenshot in both preview and the exported deck.
