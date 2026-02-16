import { slides } from '@/content/slides';
import { getSlideIcon } from './icons';

interface ThumbnailItemProps {
  slideIndex: number;
  isActive: boolean;
  onClick: () => void;
}

export function ThumbnailItem({ slideIndex, isActive, onClick }: ThumbnailItemProps) {
  const slide = slides[slideIndex];
  const Icon = getSlideIcon(slide.id);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-all ${
        isActive
          ? 'bg-blue-100 border-2 border-blue-600 shadow-md'
          : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className="text-xs font-bold text-gray-500 mt-0.5">{slide.id}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            {Icon && <Icon className="w-3 h-3 text-blue-600 shrink-0" />}
            <h3 className="text-xs font-semibold text-gray-900 truncate">{slide.title}</h3>
          </div>
          <p className="text-[10px] text-gray-500 line-clamp-2">
            {slide.bullets[0]}
          </p>
        </div>
      </div>
    </button>
  );
}
