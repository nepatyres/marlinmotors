'use client';
import { useEffect, useState } from 'react';
import { LanguageProvider } from '../context/LanguageContext';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <LanguageProvider>{children}</LanguageProvider>;
}