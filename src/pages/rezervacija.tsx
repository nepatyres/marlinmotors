'use client';
import React, { useEffect, useState } from "react";
import "../app/globals.css";
import Reservation from "@/sections/reservation";

export default function Rezervacija() {

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
      <Reservation />
    </main>
  );
}