// Minimal academic theme: white background, blue accent
export const deckTheme = {
  colors: {
    background: '#FFFFFF',
    text: '#1a1a1a',
    accent: '#2563eb', // Professional blue
    accentLight: '#3b82f6',
    muted: '#6b7280',
    border: '#e5e7eb'
  },
  fonts: {
    title: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    titleSize: '32px',
    subtitleSize: '20px',
    bodySize: '16px'
  },
  spacing: {
    slideWidth: 960,
    slideHeight: 540,
    padding: 48,
    bulletIndent: 24
  }
} as const;
