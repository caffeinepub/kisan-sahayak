import { useState } from 'react';
import { DeckViewer } from './components/deck/DeckViewer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <>
      <DeckViewer />
      <Toaster />
    </>
  );
}
