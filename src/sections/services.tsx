import React, { useLayoutEffect, useRef } from 'react';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { services } from '@/constants';

export default function Services({ language }) {
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
            <span className={`text-[30px] mt-[50px] lg:mt-[60px] lg:text-[40px] xl:mt-20 uppercase text-white/70 text-center ${language ? 'font-gruppo font-semibold' : 'font-montserratR'}`}>{language ? 'Mūsų atliekamos paslaugos' : 'Наши услуги'}</span>
            <div id='box-trigger' className="2xl:max-w-[85%] max-w-full flex flex-row justify-around mt-5 mb-[50px] mx-auto sm:mt-[50px] 2xl:mt-[170px]">
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
                        <div className='absolute flex flex-row inset-0 justify-center items-center text-center pointer-events-none'>
                            <div className=" text-white font-ubuntuL text-wrap xl:text-[25px] text-[20px]">{language ? 'Paslaugu kainos' : 'Цена услуг'}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className='flex justify-center items-center fill-white w-4 h-10 ml-1' viewBox="0 0 330 330" xmlSpace="preserve">
                                <path xmlns="http://www.w3.org/2000/svg" id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
