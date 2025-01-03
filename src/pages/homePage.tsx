'use client';
import AboutUs from "@/sections/aboutUs";
import Footer from "@/sections/footer";
import Header from "@/sections/header";
import Services from "@/sections/services";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { language, setLanguage } = useLanguage();
  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
    <main>
      <Header language={language} setLanguage={setLanguage} />
      <Services language={language} />
      <AboutUs language={language}/>
      <Footer language={language}/>
    </main>
  );
}