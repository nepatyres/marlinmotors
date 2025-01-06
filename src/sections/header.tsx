import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Navbar from '@/components/navbar';

export default function Header({ language, setLanguage }: any) {
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

    useEffect(() => {
        setScrolling(window.scrollY > 0 || navbarVisible);
    }, [navbarVisible]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className='hidden md:block'>
                <Image
                    src="/images/tiguan.png"
                    alt="Intro Image"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-[25%] custom-bg"
                    loading="eager"
                />
            </div>
            <div className='block md:hidden'>
                <Image
                    src="/images/tiguan-small.png"
                    alt="Intro Image"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-[25%] custom-bg"
                    loading="eager"
                />
            </div>

            <div className='intro xl:bottom-[5%] absolute inset-0 flex flex-col items-center justify-center'>
                <h1 className={`font-gruppo font-extrabold text-white tracking-wider mb-0 ${language ? 'font-gruppo text-[25px] sm:text-[40px] lg:text-[55px]' : 'font-montserrat text-[28px] sm:text-[35px] md:text-[40px] lg:text-[48px] pb-1'}`}>{language ? 'Aesthetic Detail Studio' : 'Студия детейлинга'}</h1>
                <h2 className={`lg:mt-[-15px] font-light text-[22px] lg:text-[28px] text-white/70 flex-wrap text-center mb-[20px] leading-6 md:leading-10 ${language ? 'font-gruppo' : 'font-raleway'}`}>{language ? 'Mes turime viską Jūsų automobilio grožiui.' : 'У нас есть все для красоты вашего автомобиля'}</h2>
                <a href={'/reservation'} className="font-ubuntuL cursor-pointer font-thin rounded-[5px] mt-3 lg:mt-5 text-[18px] xl:text-[22px] border border-[#c1d8f080] bg-transparent text-white py-2 px-8 transition-colors duration-500 hover:bg-[#c1d8f01a]">
                    {language ? 'Rezervacija' : 'Резервация'}
                </a>
            </div>
            <Navbar language={language} setLanguage={setLanguage} />

        </div>
    );
}
