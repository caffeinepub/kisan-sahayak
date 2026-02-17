import { SlideCanvas } from './SlideCanvas';
import { DeckNavigator } from './DeckNavigator';
import { SlideImageFields } from './SlideImageFields';
import { ExportPptxButton } from './ExportPptxButton';
import { BulkImageUploadMapper } from './BulkImageUploadMapper';
import { useDeckState } from './useDeckState';
import { Presentation } from 'lucide-react';

export function DeckViewer() {
  const currentSlideIndex = useDeckState((state) => state.currentSlideIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Presentation className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kisan Sahayak</h1>
                <p className="text-sm text-gray-600">Academic Presentation Builder</p>
              </div>
            </div>
            <ExportPptxButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Navigation */}
          <aside className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-180px)] sticky top-8">
              <DeckNavigator />
            </div>
          </aside>

          {/* Center - Slide Preview */}
          <div className="col-span-6">
            <div className="flex items-center justify-center">
              <SlideCanvas slideIndex={currentSlideIndex} />
            </div>
          </div>

          {/* Right sidebar - Image controls */}
          <aside className="col-span-3">
            <div className="sticky top-8 space-y-4">
              <BulkImageUploadMapper />
              <SlideImageFields slideIndex={currentSlideIndex} />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>© {new Date().getFullYear()}</span>
            <span>•</span>
            <span>Built with ❤️ using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
