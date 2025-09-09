'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientRootProps {
  children: ReactNode;
}

export default function ClientRoot({ children }: ClientRootProps) {
  const [selectedFont, setSelectedFont] = useState('Arial, sans-serif');
  const [fontSize, setFontSize] = useState(16);

  // Load saved settings on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont');
    const savedSize = localStorage.getItem('fontSize');
    const savedTime = localStorage.getItem('settingsTime');

    const now = Date.now();

    if (savedTime && now - parseInt(savedTime) > 24 * 60 * 60 * 1000) {
      // Expired -> reset
      localStorage.removeItem('selectedFont');
      localStorage.removeItem('fontSize');
      localStorage.removeItem('settingsTime');
      return;
    }

    if (savedFont) setSelectedFont(savedFont);
    if (savedSize) setFontSize(parseInt(savedSize));
  }, []);

  // Apply settings to root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--app-font-family', selectedFont);
    root.style.setProperty('--app-font-size', `${fontSize}px`);
  }, [selectedFont, fontSize]);

  return <>{children}</>;
}
