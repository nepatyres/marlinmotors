import React, { useRef, useLayoutEffect } from 'react';
import { aboutUs, aboutUsSpan, aboutUsSpanRu } from '@/constants';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function AboutUs({ language }: any) {

    const refs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        refs.current.forEach((about, i) => {
            if (about) {
                const aboutTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: about,
                        start: 'top bottom',
                        end: '+=300px',
                        scrub: true,
                        // markers: true
                    }
                });

                aboutTimeline.fromTo(about,
                    { x: '25vw', opacity: 0 },
                    { x: '0vw', opacity: 1, duration: 2, ease: 'power2.out' }
                );
            }
        });
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div id='scrollToAboutUs' className="h-auto pb-10 sm:pb-20 xl:pb-20 overflow-hidden bg-gradient-to-b from-[#141414] to-black">
            <div className="flex-row lg:flex-row w-[90%] mx-auto grid grid-cols-12">
                <div className="aboutus-main xl:col-span-7 col-span-12">
                    <span className={`flex justify-center text-[30px] sm:text-[40px] uppercase text-white/80 pt-20 ${language ? 'font-gruppo font-semibold' : 'font-ubuntuL font-normal'}`}>{language ? 'Apie mus' : 'О нас'}</span>
                    <p className='items-center justify-center font-ubuntuL w-full mx-auto text-white/70 mt-6 sm:mt-10 xl:pr-[30px] text-[20px] xl:text-[30px] pl-4 sm:pl-[30px] xl:pl-[0] xl:border-r xl:border-white/70'>{language ? aboutUsSpan : aboutUsSpanRu}</p>
                </div>
                <div className="aboutus-ourvalues xl:pl-[30px] xl:col-span-5 col-span-12 xl:pb-[50px]">
                    <span className={`flex justify-center text-[30px] sm:text-[40px] uppercase text-white/80 pt-20 mb-6 xl:pb-[30px] ${language ? 'font-gruppo font-semibold' : 'font-ubuntuL font-normal'}`}>{language ? 'Mūsų vertybės' : 'Наши ценности'}</span>
                    {aboutUs.map((about, i) => (
                        <div key={i} ref={el => { refs.current[i] = el }} className='flex flex-row mt-3 items-center mb-10 sm:mb-0'>
                            <div>{about.svg}</div>
                            <div className="flex flex-col ml-[10px] sm:ml-[30px]">
                                <span className="text-white/70 text-[20px] sm:text-[25px] font-ubuntuL">{about.span}</span>
                                <p className="text-white/40 text-[15px] text-wrap">{about.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default AboutUs;