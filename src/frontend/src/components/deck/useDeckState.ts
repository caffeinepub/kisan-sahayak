import { create } from 'zustand';

export interface SlideImage {
  url: string;
  caption: string;
  uploadedDataUrl?: string;
  originalFilename?: string;
}

interface DeckState {
  currentSlideIndex: number;
  slideImages: Record<number, SlideImage>;
  setCurrentSlide: (index: number) => void;
  setSlideImage: (slideId: number, image: SlideImage) => void;
  removeSlideImage: (slideId: number) => void;
  setBulkSlideImages: (mapping: Record<number, { dataUrl: string; filename: string }>) => void;
}

// Default image URLs for slides 1-10 as provided by the user
const defaultSlideImages: Record<number, SlideImage> = {
  1: {
    url: 'https://www.google.com/search?tbm=isch&q=farmer+using+smartphone+in+field',
    caption: ''
  },
  2: {
    url: 'https://www.google.com/search?tbm=isch&q=agriculture+field+research+workers',
    caption: ''
  },
  3: {
    url: 'https://www.google.com/search?tbm=isch&q=manual+farming+labour+hard+work',
    caption: ''
  },
  4: {
    url: 'https://www.google.com/search?tbm=isch&q=farmer+portrait+rural+worker',
    caption: ''
  },
  5: {
    url: 'https://www.google.com/search?tbm=isch&q=community+training+agriculture+workshop',
    caption: ''
  },
  6: {
    url: 'https://www.google.com/search?tbm=isch&q=smartphone+app+in+hand+outdoor',
    caption: ''
  },
  7: {
    url: 'https://www.google.com/search?tbm=isch&q=farmer+using+mobile+phone+in+field',
    caption: ''
  },
  8: {
    url: 'https://www.google.com/search?tbm=isch&q=successful+agriculture+growth+farm',
    caption: ''
  },
  9: {
    url: 'https://www.google.com/search?tbm=isch&q=smart+farming+technology+drone',
    caption: ''
  },
  10: {
    url: 'https://www.google.com/search?tbm=isch&q=happy+farmer+harvest+success',
    caption: ''
  }
};

export const useDeckState = create<DeckState>((set) => ({
  currentSlideIndex: 0,
  slideImages: defaultSlideImages,
  setCurrentSlide: (index) => set({ currentSlideIndex: index }),
  setSlideImage: (slideId, image) =>
    set((state) => ({
      slideImages: { ...state.slideImages, [slideId]: image }
    })),
  removeSlideImage: (slideId) =>
    set((state) => {
      const newImages = { ...state.slideImages };
      delete newImages[slideId];
      return { slideImages: newImages };
    }),
  setBulkSlideImages: (mapping) =>
    set((state) => {
      const newImages = { ...state.slideImages };
      Object.entries(mapping).forEach(([slideId, { dataUrl, filename }]) => {
        const id = parseInt(slideId);
        newImages[id] = {
          url: newImages[id]?.url || '',
          caption: newImages[id]?.caption || '',
          uploadedDataUrl: dataUrl,
          originalFilename: filename
        };
      });
      return { slideImages: newImages };
    })
}));
