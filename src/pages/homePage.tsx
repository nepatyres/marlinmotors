'use client';
import AboutUs from "@/sections/aboutUs";
import Footer from "@/sections/footer";
import Header from "@/sections/header";
import Prices from "@/sections/prices";
import Services from "@/sections/services";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const [language, setLanguage] = useState(true);
  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  const handleSwitchChange = () => {
    setIsSwitchChecked((prev) => !prev);
  };

  return (
    <main>
      <Header language={language} setLanguage={setLanguage} />
      <Services language={language} />
      {/* <Prices /> */}
      <AboutUs language={language}/>
      <Footer language={language}/>
    </main>
  );
}