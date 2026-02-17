import { slides } from '@/content/slides';
import { deckTheme } from '@/styles/deckTheme';
import { getSlideIcon } from './icons';
import { useDeckState } from './useDeckState';
import { RemoteImage } from './RemoteImage';

interface SlideCanvasProps {
  slideIndex: number;
}

export function SlideCanvas({ slideIndex }: SlideCanvasProps) {
  const slide = slides[slideIndex];
  const slideImages = useDeckState((state) => state.slideImages);
  const slideImage = slideImages[slide.id];
  const Icon = getSlideIcon(slide.id);

  if (slide.type === 'title') {
    return (
      <div
        className="relative bg-white border-2 border-gray-200 shadow-lg overflow-hidden"
        style={{
          width: `${deckTheme.spacing.slideWidth}px`,
          height: `${deckTheme.spacing.slideHeight}px`
        }}
      >
        {/* Title slide layout */}
        <div className="h-full flex flex-col items-center justify-center p-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight max-w-3xl">
            {slide.title}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mb-8"></div>
          <div className="space-y-3 text-lg text-gray-700">
            {slide.bullets.map((bullet, idx) => (
              <p key={idx}>{bullet}</p>
            ))}
          </div>
        </div>
        
        {/* Slide number */}
        <div className="absolute bottom-4 right-6 text-sm text-gray-400">
          {slide.id}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative bg-white border-2 border-gray-200 shadow-lg overflow-hidden"
      style={{
        width: `${deckTheme.spacing.slideWidth}px`,
        height: `${deckTheme.spacing.slideHeight}px`
      }}
    >
      {/* Header with title and icon */}
      <div className="border-b-4 border-blue-600 px-12 py-6">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-8 h-8 text-blue-600 shrink-0" />}
          <h2 className="text-3xl font-bold text-gray-900">{slide.title}</h2>
        </div>
      </div>

      {/* Content area */}
      <div className="px-12 py-8 h-[calc(100%-88px)] flex gap-8">
        {/* Bullets */}
        <div className="flex-1 flex flex-col justify-center">
          <ul className="space-y-4">
            {slide.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                <span className="text-lg text-gray-700 leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Optional image - with fixed height container to ensure visibility */}
        {slideImage && (
          <div className="w-64 flex flex-col justify-center">
            <div className="min-h-[200px]">
              <RemoteImage
                url={slideImage.url}
                alt={slideImage.caption || slide.title}
                className="w-full"
                uploadedDataUrl={slideImage.uploadedDataUrl}
              />
            </div>
            {slideImage.caption && (
              <p className="text-xs text-gray-500 mt-2 text-center italic">
                {slideImage.caption}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Slide number */}
      <div className="absolute bottom-4 right-6 text-sm text-gray-400">
        {slide.id}
      </div>
    </div>
  );
}
