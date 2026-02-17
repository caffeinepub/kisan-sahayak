import { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useDeckState } from './useDeckState';
import { slides } from '@/content/slides';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UploadedImage {
  filename: string;
  dataUrl: string;
}

export function BulkImageUploadMapper() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isAutoAssigned, setIsAutoAssigned] = useState(false);
  const setBulkSlideImages = useDeckState((state) => state.setBulkSlideImages);
  const slideImages = useDeckState((state) => state.slideImages);

  // The required order for slides 2-11: 3, 9, 10, 2, 7, 6, 4, 11, 5, 8
  const slideOrder = [3, 9, 10, 2, 7, 6, 4, 11, 5, 8];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    // Validate all files are images
    const invalidFiles = files.filter(f => !f.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      alert(`Please select only image files. ${invalidFiles.length} non-image file(s) detected.`);
      return;
    }

    // Read all files
    const readers = files.map(file => {
      return new Promise<UploadedImage>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            filename: file.name,
            dataUrl: event.target?.result as string
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(images => {
      setUploadedImages(images);
      setIsAutoAssigned(false);
    });
  };

  const handleAutoAssign = () => {
    if (uploadedImages.length === 0) return;

    const mapping: Record<number, { dataUrl: string; filename: string }> = {};
    
    // Map images to slides in the specified order
    uploadedImages.forEach((img, index) => {
      if (index < slideOrder.length) {
        const slideId = slideOrder[index];
        mapping[slideId] = {
          dataUrl: img.dataUrl,
          filename: img.filename
        };
      }
    });

    setBulkSlideImages(mapping);
    setIsAutoAssigned(true);
  };

  const handleClear = () => {
    setUploadedImages([]);
    setIsAutoAssigned(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSlideTitle = (slideId: number) => {
    const slide = slides.find(s => s.id === slideId);
    return slide?.title || `Slide ${slideId}`;
  };

  const getAssignedSlideForImage = (imageIndex: number): number | null => {
    if (imageIndex >= slideOrder.length) return null;
    return slideOrder[imageIndex];
  };

  const unusedImages = uploadedImages.slice(slideOrder.length);
  const missingSlides = slideOrder.slice(uploadedImages.length);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Upload className="w-5 h-5" />
          Bulk Image Upload
        </CardTitle>
        <CardDescription>
          Upload multiple images at once and auto-assign them to slides 2-11
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File input */}
        <div className="space-y-2">
          <Label htmlFor="bulk-upload">Select Images (up to 10)</Label>
          <Input
            ref={fileInputRef}
            id="bulk-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
          />
        </div>

        {/* Upload summary */}
        {uploadedImages.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {uploadedImages.length} image(s) uploaded
              </p>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>

            {/* Auto-assign button */}
            {!isAutoAssigned && (
              <Button onClick={handleAutoAssign} className="w-full">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Auto-Assign to Slides 2-11
              </Button>
            )}

            {isAutoAssigned && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Images successfully assigned to slides!
                </AlertDescription>
              </Alert>
            )}

            {/* Mapping preview */}
            <div className="border rounded-lg p-3 space-y-2 max-h-64 overflow-y-auto">
              <p className="text-xs font-semibold text-gray-700 mb-2">Image Mapping:</p>
              {uploadedImages.map((img, index) => {
                const assignedSlide = getAssignedSlideForImage(index);
                const isAssigned = assignedSlide !== null && slideImages[assignedSlide]?.uploadedDataUrl === img.dataUrl;
                
                return (
                  <div key={index} className="flex items-start gap-2 text-xs p-2 bg-gray-50 rounded">
                    <div className="flex-shrink-0 w-4 h-4 mt-0.5">
                      {isAssigned ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{img.filename}</p>
                      {assignedSlide ? (
                        <p className="text-gray-600">
                          → Slide {assignedSlide}: {getSlideTitle(assignedSlide)}
                        </p>
                      ) : (
                        <p className="text-amber-600">→ Unused (more than 10 images)</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Warnings */}
            {unusedImages.length > 0 && (
              <Alert variant="default" className="bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800 text-xs">
                  {unusedImages.length} image(s) will not be used (only 10 slides need images).
                </AlertDescription>
              </Alert>
            )}

            {missingSlides.length > 0 && (
              <Alert variant="default" className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 text-xs">
                  {missingSlides.length} slide(s) missing images: {missingSlides.map(s => `Slide ${s}`).join(', ')}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
