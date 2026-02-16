import { slides } from '@/content/slides';
import type { SlideImage } from '@/components/deck/useDeckState';
import { classifyImageUrl, getExportPlaceholderText } from '@/components/deck/imageUrlUtils';

// Since pptxgenjs cannot be added to the read-only package.json,
// we'll create a simple HTML export that can be printed to PDF or copied to PowerPoint
export async function exportDeckToPptx(slideImages: Record<number, SlideImage>) {
  // Create HTML representation of slides
  const htmlContent = await generateSlidesHTML(slideImages);
  
  // Create a blob and download as HTML
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Kisan_Sahayak_Presentation.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function generateSlidesHTML(slideImages: Record<number, SlideImage>): Promise<string> {
  const accentColor = '#2563eb';
  
  let slidesHTML = '';
  
  for (const slideContent of slides) {
    const slideImage = slideImages[slideContent.id];
    
    if (slideContent.type === 'title') {
      slidesHTML += `
        <div class="slide title-slide">
          <div class="slide-content">
            <h1>${escapeHtml(slideContent.title)}</h1>
            <div class="divider"></div>
            <div class="subtitle">
              ${slideContent.bullets.map(b => `<p>${escapeHtml(b)}</p>`).join('')}
            </div>
          </div>
          <div class="slide-number">${slideContent.id}</div>
        </div>
      `;
    } else {
      const bulletsHTML = slideContent.bullets
        .map(bullet => `<li><span class="bullet">•</span> ${escapeHtml(bullet)}</li>`)
        .join('');
      
      let imageHTML = '';
      
      if (slideImage) {
        const urlClassification = classifyImageUrl(slideImage.url);
        const imageSource = slideImage.uploadedDataUrl || slideImage.url;
        
        // For uploaded images or likely direct URLs, embed the image
        if (slideImage.uploadedDataUrl || urlClassification.isLikelyDirectImage) {
          imageHTML = `<div class="slide-image">
             <img src="${escapeHtml(imageSource)}" alt="${escapeHtml(slideImage.caption || slideContent.title)}" onerror="this.parentElement.innerHTML='<div class=\\'image-error\\'>${escapeHtml(getExportPlaceholderText(slideImage.url))}</div>'" />
             ${slideImage.caption ? `<p class="caption">${escapeHtml(slideImage.caption)}</p>` : ''}
           </div>`;
        } else {
          // For non-direct URLs (like Google Images search), show placeholder
          const placeholderText = getExportPlaceholderText(slideImage.url);
          imageHTML = `<div class="slide-image">
             <div class="image-placeholder">
               <p>${escapeHtml(placeholderText)}</p>
               <p class="placeholder-url">URL provided: ${escapeHtml(slideImage.url)}</p>
             </div>
             ${slideImage.caption ? `<p class="caption">${escapeHtml(slideImage.caption)}</p>` : ''}
           </div>`;
        }
      }
      
      slidesHTML += `
        <div class="slide content-slide">
          <div class="slide-header">
            <h2>${escapeHtml(slideContent.title)}</h2>
          </div>
          <div class="slide-body">
            <ul class="bullets">
              ${bulletsHTML}
            </ul>
            ${imageHTML}
          </div>
          <div class="slide-number">${slideContent.id}</div>
        </div>
      `;
    }
  }
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kisan Sahayak Presentation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, sans-serif;
      background: #f3f4f6;
      padding: 20px;
    }
    
    .slide {
      width: 960px;
      height: 540px;
      background: white;
      margin: 0 auto 30px;
      position: relative;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      page-break-after: always;
      overflow: hidden;
    }
    
    .slide-number {
      position: absolute;
      bottom: 16px;
      right: 24px;
      font-size: 14px;
      color: #9ca3af;
    }
    
    /* Title Slide */
    .title-slide .slide-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 48px;
    }
    
    .title-slide h1 {
      font-size: 36px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 32px;
      max-width: 800px;
      line-height: 1.3;
    }
    
    .title-slide .divider {
      width: 96px;
      height: 4px;
      background: ${accentColor};
      margin-bottom: 32px;
    }
    
    .title-slide .subtitle p {
      font-size: 18px;
      color: #4b5563;
      margin: 12px 0;
    }
    
    /* Content Slide */
    .content-slide .slide-header {
      border-bottom: 4px solid ${accentColor};
      padding: 20px 48px;
    }
    
    .content-slide h2 {
      font-size: 32px;
      font-weight: bold;
      color: #1a1a1a;
    }
    
    .content-slide .slide-body {
      padding: 32px 48px;
      display: flex;
      gap: 32px;
      height: calc(100% - 88px);
    }
    
    .content-slide .bullets {
      flex: 1;
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .content-slide .bullets li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin: 16px 0;
      font-size: 18px;
      color: #374151;
      line-height: 1.6;
    }
    
    .content-slide .bullets .bullet {
      color: ${accentColor};
      font-size: 24px;
      line-height: 1;
      flex-shrink: 0;
    }
    
    .content-slide .slide-image {
      width: 256px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .content-slide .slide-image img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .content-slide .slide-image .caption {
      font-size: 12px;
      color: #6b7280;
      text-align: center;
      margin-top: 8px;
      font-style: italic;
    }
    
    .content-slide .slide-image .image-placeholder {
      background: #fef3c7;
      border: 2px solid #fbbf24;
      border-radius: 8px;
      padding: 16px;
      font-size: 11px;
      color: #92400e;
      text-align: center;
    }
    
    .content-slide .slide-image .image-placeholder .placeholder-url {
      margin-top: 8px;
      font-size: 10px;
      color: #78350f;
      word-break: break-all;
    }
    
    .content-slide .slide-image .image-error {
      background: #fee2e2;
      border: 2px solid #ef4444;
      border-radius: 8px;
      padding: 16px;
      font-size: 11px;
      color: #991b1b;
      text-align: center;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .slide {
        margin: 0;
        box-shadow: none;
      }
    }
    
    .instructions {
      width: 960px;
      margin: 0 auto 30px;
      padding: 20px;
      background: #eff6ff;
      border: 2px solid ${accentColor};
      border-radius: 8px;
    }
    
    .instructions h3 {
      color: ${accentColor};
      margin-bottom: 12px;
    }
    
    .instructions ol {
      margin-left: 20px;
    }
    
    .instructions li {
      margin: 8px 0;
      color: #1e40af;
    }
  </style>
</head>
<body>
  <div class="instructions">
    <h3>📋 Instructions to Create PowerPoint</h3>
    <ol>
      <li><strong>Print to PDF:</strong> Use your browser's print function (Ctrl+P / Cmd+P) and save as PDF</li>
      <li><strong>Import to PowerPoint:</strong> Open PowerPoint → Insert → Pictures → select the PDF or take screenshots of each slide</li>
      <li><strong>Alternative:</strong> Copy the content below and paste into PowerPoint slides manually</li>
    </ol>
  </div>
  
  ${slidesHTML}
  
  <script>
    // Auto-print dialog on load (optional)
    // window.onload = () => window.print();
  </script>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
