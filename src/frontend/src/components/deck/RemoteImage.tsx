import { useState } from 'react';
import { ImageOff, AlertCircle } from 'lucide-react';
import { classifyImageUrl, getImageLoadErrorMessage } from './imageUrlUtils';

interface RemoteImageProps {
  url: string;
  alt: string;
  className?: string;
  uploadedDataUrl?: string;
}

export function RemoteImage({ url, alt, className = '', uploadedDataUrl }: RemoteImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // If there's an uploaded data URL, use it instead
  const imageSource = uploadedDataUrl || url;
  const urlClassification = classifyImageUrl(url);

  // Show guidance placeholder proactively for known non-direct URLs
  if (!uploadedDataUrl && urlClassification.isGoogleImagesSearch) {
    return (
      <div className={`flex flex-col items-center justify-center bg-amber-50 border-2 border-amber-300 rounded-lg p-4 ${className}`}>
        <AlertCircle className="w-12 h-12 text-amber-600 mb-2" />
        <p className="text-xs text-amber-800 text-center font-semibold mb-1">
          Google Images Search URL
        </p>
        <p className="text-xs text-amber-700 text-center">
          This is a search results page, not a direct image. Please use a direct image URL or upload an image.
        </p>
      </div>
    );
  }

  if (error) {
    const errorMessage = getImageLoadErrorMessage(url);
    return (
      <div className={`flex flex-col items-center justify-center bg-red-50 border-2 border-red-300 rounded-lg p-4 ${className}`}>
        <ImageOff className="w-12 h-12 text-red-400 mb-2" />
        <p className="text-xs text-red-600 text-center font-semibold mb-1">
          Failed to Load Image
        </p>
        <p className="text-xs text-red-500 text-center">
          {errorMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imageSource}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        className={`w-full h-full object-cover rounded-lg ${loading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}
