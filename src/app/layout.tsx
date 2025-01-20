import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";
import Head from 'next/head'
import ClientProvider from '@/components/clientProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}