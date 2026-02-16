import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThumbnailItem } from './ThumbnailItem';
import { slides } from '@/content/slides';
import { useDeckState } from './useDeckState';

export function DeckNavigator() {
  const currentSlideIndex = useDeckState((state) => state.currentSlideIndex);
  const setCurrentSlide = useDeckState((state) => state.setCurrentSlide);

  const canGoPrev = currentSlideIndex > 0;
  const canGoNext = currentSlideIndex < slides.length - 1;

  return (
    <div className="flex flex-col h-full">
      {/* Navigation controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentSlide(currentSlideIndex - 1)}
          disabled={!canGoPrev}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <span className="text-sm font-medium text-gray-700">
          {currentSlideIndex + 1} / {slides.length}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentSlide(currentSlideIndex + 1)}
          disabled={!canGoNext}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Thumbnail list */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {slides.map((_, index) => (
            <ThumbnailItem
              key={index}
              slideIndex={index}
              isActive={index === currentSlideIndex}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
