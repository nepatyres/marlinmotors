import React, { useState } from "react"
export default function ReservRightSide({ toggler, services, selection, handleOptionClick, toggleStates, handleToggle, handleTypeClick, sum, setReservPopup }: any) {
    
    const reservBtn = () => {
        if (sum > 0) {
            setReservPopup(true);
        }
    }
    return (
        <div className="flex flex-col pl-10 w-2/3 pt-5">
            {toggler.map((tog: any, i: number) => (
                <ul key={i} className="w-full flex flex-col justify-start">
                    {Number(services[i].index) >= 0 && (
                        <li className={`w-full flex flex-row border-b border-b-white/10 justify-between py-2 `}>
                            <div className="w-full flex flex-row justify-between text-white text-2xl pr-3">
                                <div className="w-full flex flex-col">
                                    <span className="text-white/60 text-lg">{selection[i].span}</span>
                                    <span className="text-white/80 text-xl">{selection[i].options[Number(services[i].index)].name}</span>
                                </div>
                                <span className="flex text-white/90 items-end">€{selection[i].options[Number(services[i].index)].price}</span>
                            </div>
                            <div className="flex items-start">
                                <svg onClick={() => handleOptionClick('Pasirinkite paslaugą', '0', i, -1)} className="fill-white h-7 w-7 flex cursor-pointer rounded-full mr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                                    <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"></path>
                                </svg>
                            </div>
                        </li>
                    )}
                    {toggleStates[i] && Object.values(toggleStates[i]).some((isActive) => isActive) && (
                        Object.entries(toggleStates[i]).map(([toggleIndex, isActive]) =>
                            isActive && (
                                <li key={toggleIndex} className={`w-full flex flex-row border-b border-b-white/10 justify-between py-2 `}>
                                    <div className="w-full flex flex-row justify-between text-white text-2xl pr-3">
                                        <div className="w-full flex flex-col">
                                            <span className="text-white/60 text-lg">{selection[i].span}</span>
                                            <span className="text-white/80 text-xl">{selection[i].toggle[+toggleIndex]?.name}</span>
                                        </div>
                                        <span className="flex text-white/90 items-end">€{selection[i].toggle[+toggleIndex]?.price || 0}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <svg onClick={() => handleToggle(i, +toggleIndex, -selection[i].toggle[+toggleIndex]?.price || 0)} className="fill-white h-7 w-7 flex cursor-pointer rounded-full mr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                                            <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"></path>
                                        </svg>
                                    </div>
                                </li>
                            )
                        )
                    )}
                </ul>
            ))}
            <div className="w-full flex flex-col">
                <div className="w-full justify-between flex flex-row gap-5 mt-10 mb-10">
                    <span className="text-xl text-white">Kaina su PVM </span>
                    <span className="text-3xl text-white">€{sum}</span>
                </div>
            </div>
            <div className="w-full flex">
                <button onClick={() => reservBtn()} className="w-full flex justify-center items-center bg-white text-black px-3 py-1.5 rounded-md">Rezervuoti</button>
            </div>
        </div>
    )
}