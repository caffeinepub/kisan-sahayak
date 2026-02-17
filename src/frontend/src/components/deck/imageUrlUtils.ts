export interface UrlClassification {
  isLikelyDirectImage: boolean;
  isGoogleImagesSearch: boolean;
  guidanceMessage: string | null;
}

export function classifyImageUrl(url: string): UrlClassification {
  if (!url || !url.trim()) {
    return {
      isLikelyDirectImage: false,
      isGoogleImagesSearch: false,
      guidanceMessage: null
    };
  }

  const trimmedUrl = url.trim().toLowerCase();

  // Check for Google Images search URLs
  const isGoogleImagesSearch = 
    trimmedUrl.includes('google.com/search') && 
    (trimmedUrl.includes('tbm=isch') || trimmedUrl.includes('udm=2'));

  if (isGoogleImagesSearch) {
    return {
      isLikelyDirectImage: false,
      isGoogleImagesSearch: true,
      guidanceMessage: 'This is a Google Images search URL. Please right-click an image in the search results, select "Copy image address", and paste that direct link here instead. Or use the upload feature above.'
    };
  }

  // Check for direct image file extensions
  const hasImageExtension = /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(trimmedUrl);

  if (hasImageExtension) {
    return {
      isLikelyDirectImage: true,
      isGoogleImagesSearch: false,
      guidanceMessage: null
    };
  }

  // URL doesn't look like a direct image
  return {
    isLikelyDirectImage: false,
    isGoogleImagesSearch: false,
    guidanceMessage: 'This URL may not be a direct image link. For best results, use a URL ending in .jpg, .png, etc., or upload an image file above.'
  };
}

export function getImageLoadErrorMessage(url: string): string {
  const classification = classifyImageUrl(url);
  
  if (classification.isGoogleImagesSearch) {
    return 'Google Images search URLs cannot be displayed. Please use a direct image URL or upload an image.';
  }
  
  if (!classification.isLikelyDirectImage) {
    return 'This URL does not appear to be a direct image link. Please use a URL ending in .jpg, .png, etc., or upload an image file.';
  }
  
  return 'Failed to load image. The URL may be incorrect, the image may be unavailable, or CORS restrictions may be blocking access. Try uploading the image instead.';
}

export function getExportPlaceholderText(url: string): string {
  const classification = classifyImageUrl(url);
  
  if (classification.isGoogleImagesSearch) {
    return 'Image not embedded: Google Images search URL detected. To include this image, please replace with a direct image URL (ending in .jpg, .png, etc.) or upload the image file.';
  }
  
  if (!classification.isLikelyDirectImage) {
    return 'Image not embedded: Non-direct URL detected. To include this image, please use a direct image URL (ending in .jpg, .png, etc.) or upload the image file.';
  }
  
  return 'Image not embedded: Failed to load from URL. Please upload the image file or use a different URL.';
}
