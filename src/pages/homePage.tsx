'use client';
import AboutUs from "@/sections/aboutUs";
import Footer from "@/sections/footer";
import Header from "@/sections/header";
import Services from "@/sections/services";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [language, setLanguage] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage !== null) {
      setLanguage(JSON.parse(savedLanguage));
    }
  }, []);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  return (
    <main>
      <Header language={language} setLanguage={setLanguage} />
      <Services language={language} />
      <AboutUs language={language}/>
      <Footer language={language}/>
    </main>
  );
}