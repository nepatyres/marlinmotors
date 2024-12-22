import React, { useLayoutEffect, useRef } from 'react';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { services } from '@/constants';

export default function Services({language}) {
    const refs = useRef<Array<{ box: HTMLDivElement | null }>>(services.map(() => ({ box: null })));

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        refs.current.forEach((item, i) => {
            const { box } = item;

            if (box) {
                const boxTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: document.getElementById('box-trigger'),
                        start: 'top+100px bottom',
                        end: '+=550px',
                        scrub: true,
                        markers: true
                    }
                });

                boxTimeline.fromTo(box,
                    { x: `${i === 0 || i === 1 || i === 3 ? '-5vw' : '5vw'}`, opacity: 0 },
                    { x: '0vw', opacity: 1 }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="flex flex-col items-center bg-gradient-to-b from-black to-[#141414] min-h-screen overflow-hidden" id="scrollToServices">
            <span className={`text-[30px] mt-[50px] lg:mt-[60px] lg:text-[40px] xl:mt-20 uppercase text-white/70 text-center ${language ? 'font-gruppo font-semibold' : 'font-ubuntuL font-normal'}`}>{language ? 'Mūsų atliekamos paslaugos' : 'Нами выполняемые услуги'}</span>
            <div id='box-trigger' className="2xl:max-w-[85%] max-w-full flex flex-row justify-around mt-5 mb-[50px] mx-auto sm:mt-[50px] xl:mt-[170px] 2xl:mt-20">
                {/* <div className='mt-[30px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 xl:mt-20 gap-4 xl:gap-0 tranform-all ease-in duration-500'>
                    {services.map((service, i) => (
                        <div
                            key={i}
                            ref={el => {refs.current[i].box = el}}
                            className={`flip w-[250px] h-[250px] sm:w-[230px] sm:h-[230px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[300px] 2xl:w-[330px] 2xl:h-[330px] mb-[5px] transition-all ease-in duration-500 mr-5 ${i === 1 || i === 3 ? 'ml-[55px] sm:ml-[0px] sm:mt-[30px] xl:mt-[70px]' : ''}`}
                            style={{ perspective: '1000px' }}
                        >
                            <div className="w-full h-full inner transition-transform duration-[.6s]" style={{ transformStyle: 'preserve-3d' }}>
                                <div className="flex items-center justify-center text-center bg-[#3f3f3f] font-ubuntuL text-white text-wrap w-full h-full xl:text-[25px] absolute rounded-[20px] border border-[#02161d] text-[20px] bg-cover bg-center before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/50 before:rounded-[20px]" style={{ backgroundImage: `url(${service.url})`, backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}>
                                    <div className="w-[80%]" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}>{service.front}</div>
                                </div>
                                <div className="flex items-center justify-center bg-[#02161d] font-ubuntuL text-white text-[18px] sm:text-[15px] md:text-[18px] w-full h-full absolute rounded-[20px] border border-[#02161d]" style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d', transform: 'rotateY(180deg)' }}>
                                    <div className="w-[80%]" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}>{service.back}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
                <div className='mt-[30px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:mt-20 gap-4 xl:gap-0 tranform-all ease-in duration-500'>
                    {services.map((service, i) => (
                        <div key={i} ref={el => { refs.current[i].box = el }} className={`relative w-[250px] h-[250px] sm:w-[230px] sm:h-[230px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[300px] 2xl:w-[350px] 2xl:h-[350px] mb-4 sm:mr-5 overflow-hidden rounded-md`}>
                            <div className="z-0 flex w-full h-full brightness-[35%] hover:brightness-[50%] hover:scale-[103%] items-center justify-center text-center bg-cover bg-center transition transform duration-300 ease-in-out" style={{ backgroundImage: `url(${service.url})` }}></div>
                            <div className='absolute flex inset-0 justify-center items-center text-center pointer-events-none'>
                                <div className="w-[80%] text-white font-ubuntuL text-wrap xl:text-[25px] text-[20px]">{language ? service.front : service.frontRu}</div>
                            </div>
                        </div>
                    ))}
                    <a href='/rezervacija' className={`relative w-[250px] h-[250px] sm:w-[230px] sm:h-[230px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[300px] 2xl:w-[350px] 2xl:h-[350px] border border-white/10 mb-4 sm:mr-5 overflow-hidden rounded-md`}>
                        <div className="z-0 flex w-full h-full brightness-[35%] hover:brightness-[50%] hover:scale-[103%] items-center justify-center text-center bg-cover bg-center transition transform duration-300 ease-in-out"></div>
                        <div className='absolute flex inset-0 justify-center items-center text-center pointer-events-none'>
                            <div className="w-[80%] text-white font-ubuntuL text-wrap xl:text-[25px] text-[20px]">{language ? 'Paslaugu kainos' : 'Цена услуг'}</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
