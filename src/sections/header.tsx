import React, { useEffect, useState } from 'react';
import { navbar } from '@/constants';
import { phoneSvg, togglerSvg } from '@/components/svg';
import Image from 'next/image'
import Navbar from '@/components/navbar';

export default function Header() {
    const [navbarVisible, setNavbarVisible] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 0 || navbarVisible);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [navbarVisible]);

    const toggleNavbar = () => {
        setNavbarVisible(prevNavbarVisible => !prevNavbarVisible);
    };

    useEffect(() => {
        setScrolling(window.scrollY > 0 || navbarVisible);
    }, [navbarVisible]);

    const scrollTo = (target: any) => {
        const targetElement = document.getElementById(target);
        const navbarNav = document.getElementById('navbarNav');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            navbarNav?.classList.add('hidden');
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Image
                src="/images/intro.jpg"
                alt="Intro Image"
                layout="fill"
                objectFit="cover"
                className="brightness-[15%] custom-bg"
                loading="eager"
            />
            <div className='intro xl:bottom-[5%] absolute inset-0 flex flex-col items-center justify-center'>
                <h1 className="font-gruppo text-[25px] sm:text-[40px] lg:text-[55px] font-extrabold text-white tracking-wider mb-0">Aesthetic Detail Studio</h1>
                <h2 className="lg:mt-[-15px] font-light text-[22px] lg:text-[28px] text-white/70 flex-wrap font-gruppo text-center mb-[20px]">Mes turime viską Jūsų automobilio grožiui.</h2>
                <a href={'/rezervacija'} className="font-ubuntuL cursor-pointer font-thin rounded-[5px] mt-3 lg:mt-5 text-[18px] xl:text-[22px] border border-[#c1d8f080] bg-transparent text-white py-2 px-8 transition-colors duration-500 hover:bg-[#c1d8f01a]">
                    Rezervacija
                </a>
            </div>
            <Navbar />

        </div>
    );
}
