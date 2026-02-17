import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { exportDeckToPptx } from '@/pptx/exportDeckToPptx';
import { useDeckState } from './useDeckState';
import { toast } from 'sonner';

export function ExportPptxButton() {
  const [isExporting, setIsExporting] = useState(false);
  const slideImages = useDeckState((state) => state.slideImages);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const result = await exportDeckToPptx(slideImages);
      
      if (result.success) {
        toast.success('Presentation exported successfully!', {
          description: 'Open the HTML file and use Print to PDF, then import into PowerPoint. Or take screenshots of each slide.',
          duration: 6000
        });
        
        // Show warnings if any images couldn't be embedded
        if (result.warnings.length > 0) {
          setTimeout(() => {
            toast.warning('Some images may not display correctly', {
              description: 'To ensure all images appear, use direct image URLs (ending in .jpg, .png, etc.) or upload image files.',
              duration: 8000
            });
          }, 1500);
        }
      } else {
        toast.error('Failed to export presentation', {
          description: result.error || 'An unknown error occurred. Please try again.'
        });
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export presentation', {
        description: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      size="lg"
      className="gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Export Presentation
        </>
      )}
    </Button>
  );
}
