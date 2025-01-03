'use client';
import React, { useEffect, useState } from "react";
import "../app/globals.css";
import Reservation from "@/sections/reservation";
import { LanguageProvider } from "@/context/LanguageContext";

export default function ReservationPage() {

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
      <LanguageProvider>
        <Reservation />
      </LanguageProvider>
    </main>
  );
}