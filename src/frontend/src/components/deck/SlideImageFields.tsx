import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDeckState } from './useDeckState';
import { slides } from '@/content/slides';
import { classifyImageUrl } from './imageUrlUtils';

interface SlideImageFieldsProps {
  slideIndex: number;
}

export function SlideImageFields({ slideIndex }: SlideImageFieldsProps) {
  const slide = slides[slideIndex];
  const slideImages = useDeckState((state) => state.slideImages);
  const setSlideImage = useDeckState((state) => state.setSlideImage);
  const removeSlideImage = useDeckState((state) => state.removeSlideImage);

  const existingImage = slideImages[slide.id];
  const [url, setUrl] = useState(existingImage?.url || '');
  const [caption, setCaption] = useState(existingImage?.caption || '');
  const [uploadedFile, setUploadedFile] = useState<string | null>(existingImage?.uploadedDataUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync local state when slide changes or when store image changes
  useEffect(() => {
    const currentImage = slideImages[slide.id];
    setUrl(currentImage?.url || '');
    setCaption(currentImage?.caption || '');
    setUploadedFile(currentImage?.uploadedDataUrl || null);
  }, [slide.id, slideImages]);

  const urlClassification = classifyImageUrl(url);

  const handleSave = () => {
    if (url.trim() || uploadedFile) {
      setSlideImage(slide.id, { 
        url: url.trim(), 
        caption: caption.trim(),
        uploadedDataUrl: uploadedFile || undefined
      });
    }
  };

  const handleRemove = () => {
    removeSlideImage(slide.id);
    setUrl('');
    setCaption('');
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, etc.)');
      return;
    }

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadedFile(dataUrl);
      // Auto-save when file is uploaded
      setSlideImage(slide.id, {
        url: url.trim(),
        caption: caption.trim(),
        uploadedDataUrl: dataUrl,
        originalFilename: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveUpload = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Update store to remove uploaded image
    setSlideImage(slide.id, {
      url: url.trim(),
      caption: caption.trim(),
      uploadedDataUrl: undefined
    });
  };

  // Allow uploads for slides 2-11
  const allowUpload = slide.id >= 2 && slide.id <= 11;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Image className="w-5 h-5" />
          Add Image to Slide {slide.id}
        </CardTitle>
        <CardDescription>
          {allowUpload 
            ? 'Upload an image or paste a direct image URL with optional caption'
            : 'Paste a direct image URL and optional caption'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload option for slides 2-11 */}
        {allowUpload && (
          <div className="space-y-2">
            <Label htmlFor="image-upload">Upload Image (PNG/JPG)</Label>
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="flex-1"
              />
              {uploadedFile && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleRemoveUpload}
                  title="Remove uploaded image"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {uploadedFile && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                ✓ Image uploaded successfully
                {existingImage?.originalFilename && (
                  <span className="block text-xs text-green-600 mt-1">
                    {existingImage.originalFilename}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* URL input (available for all slides) */}
        <div className="space-y-2">
          <Label htmlFor="image-url">
            {allowUpload ? 'Or use Image URL' : 'Image URL'}
          </Label>
          <Input
            id="image-url"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          
          {/* Show guidance for non-direct URLs */}
          {urlClassification.guidanceMessage && (
            <Alert variant="default" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                {urlClassification.guidanceMessage}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-caption">Caption / Attribution (optional)</Label>
          <Textarea
            id="image-caption"
            placeholder="Image source or description..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={2}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleSave} 
            disabled={!url.trim() && !uploadedFile} 
            className="flex-1"
          >
            {existingImage ? 'Update Image' : 'Add Image'}
          </Button>
          {existingImage && (
            <Button variant="outline" onClick={handleRemove}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
