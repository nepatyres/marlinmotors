import React, { useState } from "react"
import Toggler from "./togglerSvg";
import { moreToggles } from "@/constants/reservation";
import MoreToggler from "./moreToggler";

export default function ReservLeftSide({ language, carTypes, handleTypeClick, selectedType, selection, handleOptionClick, dropdownRefs, toggleState, toggleStates, handleToggle, handleMoreToggle, moreToggleStates, selectedOption, selectedStates }: any) {
    const [priceCheck, setPriceCheck] = useState<string | null>(null);
    const [priceCheckMoreToggle, setPriceCheckMoreToggle] = useState<string | null>(null);

    const onMouseEnter = (parentIdx: number, idx: number) => {
        setPriceCheck(`${parentIdx}-${idx}`)
    }

    const onMouseLeave = () => {
        setPriceCheck(null);
    }

    const handleMouseEnterMoreToggle = (idx: number) => {
        setPriceCheckMoreToggle(idx.toString());
    };

    const onMouseLeaveMoreToggle = () => {
        setPriceCheckMoreToggle(null);
    }

    return (
        <div className="flex w-full flex-col border-r border-r-white/60 overflow-auto">
            {/* <span className="flex justify-center text-[20px] mt-4 lg:text-[30px] font-semibold font-gruppo uppercase text-white/70">Kainu Skaiciokle</span> */}
            <div className="flex w-full flex-col pb-5 items-end pr-10">
                <div className="flex flex-col w-5/6 border-b border-b-white/10 justify-center">
                    <span className='text-white/70 flex font-montserratR text-2xl pb-4 pt-8 justify-center'>{language ? 'Kėbulo tipas' : 'Тип кузова'}</span>
                    <div className="w-full grid flex-row gap-3 justify-center pb-6 grid-cols-2 sm:flex">
                        {carTypes.map((types: any, i: number) => (
                            <div key={i} onClick={() => handleTypeClick(i)} className={`flex justify-center items-center px-3 border rounded-md cursor-pointer ${selectedType === i ? 'bg-white/80 fill-black' : 'bg-transparent stroke-1 opacity-100 fill-white'}`}>
                                {types}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-5/6 flex flex-col mb-10">
                    {selection.map((s: any, i: number) => (
                        <div key={i} ref={(el) => (dropdownRefs.current[i] = el!)} className='relative pb-5 border-b border-b-white/10'>
                            <span className="text-white/70 flex font-montserratR text-2xl pt-8 pb-4 justify-center">{language ? s.span : s.spanRu}</span>
                            <div className="gap-5 mb-3">
                                <button onClick={() => toggleState(i)} className={`z-[9999] w-full justify-between ${selectedOption[i] && selectedOption[i] !== (language ? 'Pasirinkite paslaugą' : 'Выберите услугу') ? 'bg-white/80 text-black fill-black' : 'bg-transparent text-white/70 fill-white'} cursor-pointer flex items-center border border-white/50 focus:border-white rounded-md px-2 py-2 text-xl`}>{selectedOption[i] ? selectedOption[i] : language ? 'Pasirinkite paslaugą' : 'Выберете услугу'}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] ml-0.5 mt-0.5" viewBox="0 0 24 24">
                                        <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                                    </svg>
                                </button>
                                {selectedStates[i] &&
                                    <div>
                                        <ul className="shadow-xl w-full px-[4px] z-[100] text-white text-nowrap right-0 xl:right-auto items-center absolute">
                                            <li onClick={() => handleOptionClick(language ? 'Pasirinkite paslaugą' : 'Выберите услугу', '0', i, -1)} className="cursor-pointer border-b backdrop-blur-lg border-x border-x-white/30 bg-black/50 hover:bg-black/70 border-b-white/30 px-3 py-1.5 text-xl">{language ? 'Pasirinkite paslaugą' : 'Выберите услугу'}</li>
                                            {s.options.map((option: any, idx: number) => (
                                                <li key={idx} onClick={() => handleOptionClick(language ? option.name : option.nameRu, option.price, i, idx)} className={`cursor-pointer backdrop-blur-lg bg-black/50 hover:bg-black/70 flex-col ${s.options.length - 1 !== idx ? 'border-b border-b-white/30' : 'rounded-b-sm border-b border-b-white/30'} border-x border-x-white/30 px-3 py-1.5 text-xl`}>
                                                    <div className="flex flex-row justify-between">
                                                        <span>{language ? option.name : option.nameRu}</span>
                                                        <span>{language ? 'Nuo' : 'От'} €{option.price}</span>
                                                    </div>
                                                    <p className="text-white/50 text-sm text-wrap leading-tight mt-1.5">{language ? option.description : option.descriptionRu}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                {s.toggle.map((tog: any, idx: number) => (
                                    <div key={idx} className="flex flex-row items-center mt-2 px-1">
                                        <div className="relative flex items-center">
                                            <svg onMouseEnter={() => onMouseEnter(i, idx)} onMouseLeave={() => onMouseLeave()} xmlns="http://www.w3.org/2000/svg" className="fill-white/50 w-5 h-5 flex items-center" viewBox="0 0 24 24">
                                                <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8 0c0-.17.01-.336.031-.5H12a1 1 0 1 0 0-2H9.877A3.993 3.993 0 0 1 13 8c.902 0 1.731.297 2.4.8a1 1 0 0 0 1.2-1.6 6.001 6.001 0 0 0-9.057 2.3H7a1 1 0 0 0 0 2h.02a6.081 6.081 0 0 0 0 1H7a1 1 0 1 0 0 2h.544a6.001 6.001 0 0 0 9.057 2.3 1 1 0 0 0-1.201-1.6c-.669.503-1.498.8-2.4.8a3.992 3.992 0 0 1-3.123-1.5H12a1 1 0 1 0 0-2H9.031A4.039 4.039 0 0 1 9 12z" />
                                            </svg>
                                            {priceCheck === `${i}-${idx}` && <div className="absolute left-0 top-full mt-2 bg-black/80 text-white p-2 rounded z-30">{language ? 'Nuo' : 'От'} €{tog.price}</div>}
                                        </div>

                                        <div className="w-full flex flex-row items-center">
                                            <span className="text-white text-[20px] ml-2 pr-4">{language ? tog.name : tog.nameRu}</span>
                                            <Toggler toggled={!!(toggleStates[i] && toggleStates[i][idx])} onToggle={() => handleToggle(i, idx, parseFloat(tog.price))} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}

                    <div className={`relative pb-5 `}>
                        <span className="text-white/70 flex font-montserratR text-2xl pt-8 pb-4 justify-center">{language ? 'Papildomos paslaugos' : 'Дополнительные услуги'}</span>
                        <div className="gap-5 mb-3">
                            {moreToggles.map((tog: any, idx: number) => (
                                <div key={idx} className="flex flex-row items-center mt-2 px-1">
                                    <div className="relative flex items-center">
                                        <svg onMouseEnter={() => handleMouseEnterMoreToggle(idx)} onMouseLeave={() => onMouseLeaveMoreToggle()} xmlns="http://www.w3.org/2000/svg" className="fill-white/50 w-5 h-5 flex items-center" viewBox="0 0 24 24">
                                            <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8 0c0-.17.01-.336.031-.5H12a1 1 0 1 0 0-2H9.877A3.993 3.993 0 0 1 13 8c.902 0 1.731.297 2.4.8a1 1 0 0 0 1.2-1.6 6.001 6.001 0 0 0-9.057 2.3H7a1 1 0 0 0 0 2h.02a6.081 6.081 0 0 0 0 1H7a1 1 0 1 0 0 2h.544a6.001 6.001 0 0 0 9.057 2.3 1 1 0 0 0-1.201-1.6c-.669.503-1.498.8-2.4.8a3.992 3.992 0 0 1-3.123-1.5H12a1 1 0 1 0 0-2H9.031A4.039 4.039 0 0 1 9 12z" />
                                        </svg>
                                        {priceCheckMoreToggle === `${idx}` && <div className="absolute left-0 top-full mt-2 bg-black/80 text-white p-2 rounded z-30">{language ? 'Nuo' : 'От'} €{tog.price}</div>}
                                    </div>

                                    <div className="w-full flex flex-row items-center">
                                        <span className="text-white text-[20px] ml-2 pr-4">{language ? tog.name : tog.nameRu}</span>
                                        <Toggler
                                            toggled={!!moreToggleStates[idx]}
                                            onToggle={() => handleMoreToggle(idx, parseFloat(tog.price))}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}