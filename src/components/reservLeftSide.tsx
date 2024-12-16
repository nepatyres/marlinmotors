import React, { useState } from "react"
import Toggler from "./togglerSvg";

export default function ReservLeftSide({ carTypes, handleTypeClick, selectedType, selection, handleOptionClick, dropdownRefs, toggleState, toggleStates, handleToggle, selectedOption, selectedStates }: any) {
    const [priceCheck, setPriceCheck] = useState<string | null>(null);
    
    const onMouseEnter = (parentIdx: number, idx: number) => {
        setPriceCheck(`${parentIdx}-${idx}`)
    }

    const onMouseLeave = () => {
        setPriceCheck(null);
    }

    return (
        <div className="flex justify-end w-full flex-col border-r border-r-white/60 overflow-auto">
            <span className="text-[20px] mt-4 lg:text-[30px] font-semibold font-gruppo uppercase text-white/70">Kainu Skaiciokle</span>
            <div className="flex w-full flex-col pb-5">
                <div className="flex flex-col w-2/3 border-b border-b-white/10 justify-center">
                    <span className="text-white/70 flex font-gruppo text-3xl pb-4 pt-8 justify-center">*Automobilio tipas</span>
                    <div className="w-full flex flex-row gap-3 justify-center pb-6">
                        {carTypes.map((types: any, i: number) => (
                            <div key={i} onClick={() => handleTypeClick(i)} className={`px-3 border rounded-md cursor-pointer ${selectedType === i ? 'bg-white/80 fill-black' : 'bg-transparent stroke-1 opacity-100 fill-white'}`}>
                                {types}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-2/3 flex flex-col mb-10">
                    {selection.map((s: any, i: number) => (
                        <div key={i} ref={(el) => (dropdownRefs.current[i] = el!)} className={`relative pb-5 ${i === selection.length - 1 ? '' : 'border-b border-b-white/10'}`}>
                            <span className="text-white/70 flex font-gruppo text-3xl pt-8 pb-4 justify-center">{s.span}</span>
                            <div className="gap-5 mb-3">
                                <button onClick={() => toggleState(i)} className={`z-[9999] w-full justify-between ${selectedOption[i] && selectedOption[i] !== null ? 'bg-white/80 text-black fill-black' : 'bg-transparent text-white/70 fill-white'} cursor-pointer flex items-center border border-white/50 focus:border-white rounded-md px-2 py-2 text-xl`}>{selectedOption[i] || "Pasirinkite paslaugą"}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] ml-0.5 mt-0.5" viewBox="0 0 24 24">
                                        <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                                    </svg>
                                </button>
                                {selectedStates[i] &&
                                    <div>
                                        <ul className="shadow-xl w-full px-[4px] z-[100] text-white text-nowrap right-0 xl:right-auto items-center absolute">
                                            <li onClick={() => handleOptionClick('Pasirinkite paslaugą', '0', i, -1)} className="cursor-pointer border-b backdrop-blur-lg border-x border-x-white/30 bg-black/50 hover:bg-black/70 border-b-white/30 px-3 py-1.5 text-xl">Pasirinkite paslaugą</li>
                                            {s.options.map((option: any, idx: number) => (
                                                <li key={idx} onClick={() => handleOptionClick(option.name, option.price, i, idx)} className={`cursor-pointer backdrop-blur-lg bg-black/50 hover:bg-black/70 flex-col ${s.options.length - 1 !== idx ? 'border-b border-b-white/30' : 'rounded-b-sm border-b border-b-white/30'} border-x border-x-white/30 px-3 py-1.5 text-xl`}>
                                                    <div className="flex flex-row justify-between">
                                                        <span>{option.name}</span>
                                                        <span>Nuo €{option.price}</span>
                                                    </div>
                                                    <p className="text-white/50 text-sm text-wrap leading-tight mt-1.5">{option.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                {s.toggle.map((tog: any, idx: number) => (
                                    <div key={idx} className="flex flex-row items-center mt-2 px-1">
                                        <div className="relative">
                                            <svg onMouseEnter={() => onMouseEnter(i, idx)} onMouseLeave={() => onMouseLeave()} xmlns="http://www.w3.org/2000/svg" className="fill-white/50 w-4 h-4" viewBox="0 0 16 16">
                                                <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 5C7.17157 5 6.5 5.67157 6.5 6.5V7H4.5V6.5C4.5 4.567 6.067 3 8 3C9.933 3 11.5 4.567 11.5 6.5C11.5 8.433 9.933 10 8 10H7V8H8C8.82843 8 9.5 7.32843 9.5 6.5C9.5 5.67157 8.82843 5 8 5ZM9 11V13H7V11H9Z" />
                                            </svg>
                                            {priceCheck === `${i}-${idx}` && <div className="absolute left-0 top-full mt-2 bg-black/80 text-white p-2 rounded z-30">Nuo €{tog.price}</div>}
                                        </div>

                                        <div className="w-full flex flex-row justify-between items-center">
                                            <span className="text-white text-[20px] ml-2">{tog.name}</span>
                                            <Toggler toggled={!!(toggleStates[i] && toggleStates[i][idx])} onToggle={() => handleToggle(i, idx, parseFloat(tog.price))} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}