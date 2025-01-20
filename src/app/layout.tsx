import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";
import Head from 'next/head'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <LanguageProvider>
      <body>{children}</body>
      </LanguageProvider>
    </html>
  );
}
