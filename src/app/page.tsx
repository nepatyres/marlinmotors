'use client';
import HomePage from "../pages/homePage";
import React, { useEffect, useState } from "react";

export default function Home() {

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
      <HomePage />
    </main>
  );
}
