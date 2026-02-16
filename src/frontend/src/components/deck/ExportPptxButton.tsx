import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText } from 'lucide-react';
import { exportDeckToPptx } from '@/pptx/exportDeckToPptx';
import { useDeckState } from './useDeckState';
import { toast } from 'sonner';

export function ExportPptxButton() {
  const [isExporting, setIsExporting] = useState(false);
  const slideImages = useDeckState((state) => state.slideImages);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportDeckToPptx(slideImages);
      toast.success('Presentation exported as HTML!', {
        description: 'Open the file and print to PDF, or copy content to PowerPoint.'
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export presentation. Please try again.');
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
