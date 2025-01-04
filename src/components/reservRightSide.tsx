import React, { useState } from "react"
export default function ReservRightSide({ language, toggler, services, selection, handleOptionClick, toggleStates, handleToggle, subtotal, sum, setReservPopup, carType }: any) {

    const reservBtn = () => {
        if (sum > 0) {
            setReservPopup(true);
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price);
    };
    return (
        <div className="flex flex-col lg:pl-10 w-[95%] lg:w-2/3 pt-5 mb-20 sm:mb-0 mx-auto sm:mx-0">
                    <span className="text-white/70 flex font-montserratR text-2xl pt-3 justify-center">{language ? 'Saskaita' : 'Счёт'}</span>
                    {toggler.map((tog: any, i: number) => (
                        <ul key={i} className="w-full flex flex-col justify-center sm:justify-start items-center sm:items-start">
                            {Number(services[i].index) >= 0 && (
                                <li className='w-full flex flex-row border-b border-b-white/10 py-2' >
                                    <div className='w-16 h-16 flex'>
                                        <div style={{ backgroundImage: `url(${selection[i].options[Number(services[i].index)].url})` }} className="flex w-16 h-16 bg-cover bg-center rounded-lg brightness-[70%]" />
                                    </div>
                                    <div className="flex flex-row justify-start text-white text-2xl pl-3 pr-3">
                                        <div className="w-full flex flex-col">
                                            <span className="text-white/80 text-xl">{language ? selection[i].options[Number(services[i].index)].name : selection[i].options[Number(services[i].index)].nameRu}</span>
                                            <span className="flex text-white/90 items-end text-xl mr-1">€{selection[i].options[Number(services[i].index)].price}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between flex-col pl-auto ml-auto">
                                        <svg onClick={() => handleOptionClick('Pasirinkite paslaugą', '0', i, -1)} className="flex justify-end fill-white h-7 w-7 cursor-pointer rounded-full ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                                            <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"></path>
                                        </svg>
                                    </div>
                                </li>
                            )}
                            {toggleStates[i] && Object.values(toggleStates[i]).some((isActive) => isActive) && (
                                Object.entries(toggleStates[i]).map(([toggleIndex, isActive]) =>
                                    isActive && (
                                        <li key={toggleIndex} className={`w-full flex flex-row border-b border-b-white/10 justify-between py-2 `}>
                                            <div className='w-16 h-16 flex'>
                                                <div style={{ backgroundImage: `url(${selection[i].toggle[+toggleIndex]?.url})` }} className="flex w-16 h-16 bg-cover bg-center rounded-lg brightness-[70%]" />
                                            </div>
                                            <div className="flex flex-row justify-start text-white text-2xl pl-3 pr-3">
                                                <div className="w-full flex flex-col">
                                                    <span className="text-white/80 text-xl">{language ? selection[i].toggle[+toggleIndex]?.name : selection[i].toggle[+toggleIndex]?.nameRu}</span>
                                                    <span className="flex text-white/90 items-end text-xl mr-1">€{selection[i].toggle[+toggleIndex]?.price || 0}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-between flex-col pl-auto ml-auto">
                                                <svg onClick={() => handleToggle(i, +toggleIndex, -selection[i].toggle[+toggleIndex]?.price || 0)} className="flex justify-end fill-white h-7 w-7 cursor-pointer rounded-full ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                                                    <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"></path>
                                                </svg>
                                            </div>
                                        </li>
                                    )
                                )
                            )}
                        </ul>
                    ))}
                    <div className="w-full flex flex-col font-montserratR">
                        <div className="w-full justify-between flex flex-row gap-5 mt-10">
                            <span className="text-lg text-white/70">{language ? 'Tarpinė suma' : 'Промежуточная сумма'}</span>
                            <span className="text-2xl text-white/70">€{formatPrice(subtotal)}</span>
                        </div>
                        {carType > 1 && <div className="w-full justify-between flex flex-row gap-5">
                            <span className="text-lg text-white/70">{language ? 'Kėbulo tipas' : 'Тип кузова'}</span>
                            <span className="text-2xl text-white/70">€{formatPrice(sum - subtotal)}</span>
                        </div>}
                        <div className="w-full justify-between flex flex-row gap-5 mb-10 mt-2">
                            <span className="text-xl text-white">{language ? 'Iš viso su PVM' : 'Итого с НДС'}</span>
                            <span className="text-3xl text-white">€{formatPrice(sum)}</span>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <button onClick={() => reservBtn()} className="w-full flex justify-center items-center bg-white text-black px-3 py-1.5 rounded-md">{language ? 'Rezervuoti' : 'Резервация'}</button>
                    </div>
                </div>
    )
}