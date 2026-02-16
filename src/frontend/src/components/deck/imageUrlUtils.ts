/**
 * Utility functions for image URL validation and guidance messages
 */

export interface UrlClassification {
  isGoogleImagesSearch: boolean;
  isLikelyDirectImage: boolean;
  guidanceMessage: string | null;
}

/**
 * Classify an image URL and return guidance if needed
 */
export function classifyImageUrl(url: string): UrlClassification {
  if (!url || !url.trim()) {
    return {
      isGoogleImagesSearch: false,
      isLikelyDirectImage: false,
      guidanceMessage: null
    };
  }

  const trimmedUrl = url.trim().toLowerCase();

  // Check if it's a Google Images search results page
  const isGoogleImagesSearch = 
    trimmedUrl.includes('google.com/search') && 
    trimmedUrl.includes('tbm=isch');

  // Check if it looks like a direct image URL
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
  const isLikelyDirectImage = imageExtensions.some(ext => 
    trimmedUrl.includes(ext)
  );

  // Generate guidance message
  let guidanceMessage: string | null = null;

  if (isGoogleImagesSearch) {
    guidanceMessage = 
      'This is a Google Images search results page, not a direct image URL. ' +
      'To use an image: (1) Open this link in a new tab, (2) Click on an image you like, ' +
      '(3) Right-click the image and select "Copy image address", (4) Paste that URL here. ' +
      'Direct image URLs typically end in .jpg, .png, or .webp. ' +
      'Alternatively, use the upload option below for Slide 11.';
  } else if (!isLikelyDirectImage && trimmedUrl.startsWith('http')) {
    guidanceMessage = 
      'This URL may not be a direct image link. ' +
      'For best results, use a URL that points directly to an image file (typically ending in .jpg, .png, or .webp). ' +
      'If the image fails to load, try right-clicking the image and selecting "Copy image address".';
  }

  return {
    isGoogleImagesSearch,
    isLikelyDirectImage,
    guidanceMessage
  };
}

/**
 * Get a user-friendly error message for failed image loads
 */
export function getImageLoadErrorMessage(url: string): string {
  const classification = classifyImageUrl(url);
  
  if (classification.isGoogleImagesSearch) {
    return 'Cannot display Google Images search page. Please use a direct image URL (see guidance above).';
  }
  
  return 'Failed to load image. The URL may not point to a valid image file, or the image may be blocked by CORS policy. Try using a direct image URL ending in .jpg, .png, or .webp.';
}

/**
 * Get guidance text for export placeholders
 */
export function getExportPlaceholderText(url: string): string {
  const classification = classifyImageUrl(url);
  
  if (classification.isGoogleImagesSearch) {
    return '[Image not embedded: Google Images search URL provided instead of direct image link. Please replace with a direct image URL ending in .jpg, .png, or .webp]';
  }
  
  return '[Image failed to load. Please verify the URL points to a valid image file.]';
}
