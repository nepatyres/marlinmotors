import { navbar } from "@/constants";
import { phoneSvg, togglerSvg } from "./svg";
import React, { useState, useEffect } from "react";

export default function Navbar({ language, setLanguage }: any) {
    const [navbarVisible, setNavbarVisible] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        localStorage.setItem('language', JSON.stringify(language));
    }, [language]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 0 || navbarVisible);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [navbarVisible]);

    useEffect(() => {
        setScrolling(window.scrollY > 0 || navbarVisible);
    }, [navbarVisible]);

    const scrollTo = (target: any) => {
        const targetElement = document.getElementById(target);
        const navbarNav = document.getElementById("navbarNav");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
            navbarNav?.classList.add("hidden");
        }
    };

    const toggleNavbar = () => {
        setNavbarVisible((prevNavbarVisible) => !prevNavbarVisible);
    };

    const ltLanguage = () => {
        setLanguage(true);
    };

    const ruLanguage = () => {
        setLanguage(false);
    };

    return (
        <>
            <nav className={`fixed left-0 w-full top-0 h-[60px] z-50 flex justify-center ${scrolling ? "backdrop-blur-md bg-black/20" : ""}`} id="nav-blur">
                <div className="w-[95%] 2xl:max-w-[80%] grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_2fr_1fr] m-auto">
                    <a className="flex p-0 items-center font-semibold w-[250px] sm:w-full text-[20px] sm:text-[25px] lg:text-[23px] 2xl:text-[28px] text-white/80 select-none font-gruppo drop-shadow-md tracking-[3px]" href="/">MARLIN MOTORS</a>
                    <div className="hidden lg:flex flex-row justify-center items-center gap-5">
                        <a href={"/reservation"} className={`text-white font-UbuntuR text-[20px] tracking-wide cursor-pointer transition-colors ease-in duration-500 hover:text-[#c1d8f0] ${language ? 'font-ubuntuR' : 'font-montserrat'}`}>{language ? "Kainos" : "Цены"}</a>
                        {navbar.map((nav, i) => (
                            <a key={i} onClick={() => scrollTo(nav.scrollT)} className={`text-white text-[20px] tracking-wide cursor-pointer transition-colors ease-in duration-500 hover:text-[#c1d8f0] ${language ? 'font-ubuntuR' : 'font-montserrat'}`}>{language ? nav.nameLt : nav.nameRu}</a>
                        ))}
                    </div>
                    <div className="hidden lg:flex justify-end items-center text-white gap-3">
                        <div onClick={() => ltLanguage()} className={`${!language ? "text-white" : "text-white/50"} cursor-pointer`}>LT</div>
                        <div onClick={() => ruLanguage()} className={`${language ? "text-white" : "text-white/50"} cursor-pointer`}>RU</div>
                    </div>
                    <div className="flex lg:hidden justify-end items-center">
                        <button onClick={toggleNavbar} id="toggler" className="bg-[#ffffff14] py-1 px-3 rounded-[15px] flex border-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">{togglerSvg}</button>
                    </div>
                </div>
            </nav>

            {navbarVisible && (
                <div className="fixed lg:hidden w-full top-[60px] bg-black/20 z-50 backdrop-blur-md" id="navbarNav">
                    <ul className="text-center items-center">
                        <a href={"/reservation"} className={`text-white font-gruppo font-medium text-[20px] tracking-wide cursor-pointer transition-colors ease-in duration-500 hover:text-[#c1d8f0] ${language ? 'font-ubuntuR' : 'font-montserrat'}`}>{language ? "Kainos" : "Цены"} </a>
                        {navbar.map((nav, index) => (
                            <li key={index} className="pt-3">
                                <a onClick={() => scrollTo(nav.scrollT)} className={`text-white font-UbuntuR font-light text-[20px] tracking-wide cursor-pointer transition-colors ease-in duration-500 hover:text-[#c1d8f0] ${language ? 'font-ubuntuR' : 'font-montserrat'}`}>{language ? nav.nameLt : nav.nameRu}</a>
                            </li>
                        ))}

                        <li className="flex justify-center items-center text-white gap-[8px] my-4">
                            <div onClick={() => ltLanguage()} className={`${!language ? "text-white" : "text-white/50"} cursor-pointer`}>LT</div>
                            <div onClick={() => ruLanguage()} className={`${language ? "text-white" : "text-white/50"} cursor-pointer`}>RU</div>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
