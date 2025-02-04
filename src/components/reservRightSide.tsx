import React, { useState } from "react"
export default function ReservRightSide({ language, toggler, services, selection, handleOptionClick, toggleStates, handleToggle, setReservPopup, carType, subtotal, sum, promoCode, promoTog, setPromo, setPromoTog, promo, calculatePromoCode, wrongPromo }: any) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price);
    };

    const handlePromoChange = (event: any) => {
        setPromo(event.target.value);
    }

    const promoTogBtn = () => {
        setPromoTog(!promoTog);
    }

    const reservBtn = () => {
        setReservPopup((prev: any) => !prev && sum > 0);
    };

    return (
        <div className="flex flex-col lg:pl-10 w-[90%] lg:w-5/6 lg:pb-0 sm:mb-0 mx-auto sm:mx-0 sm:sticky sm:bottom-0">
            <div className="pb-[180px] sm:pb-0">
                <span className="flex justify-center text-[20px] sm:mt-4 lg:text-[30px] font-montserratR uppercase text-white/70 sm:pb-10">{language ? 'Sąskaita' : 'Счёт'}</span>
                {toggler.map((tog: any, i: number) => (
                    <ul key={i} className="w-full flex flex-col justify-center sm:justify-start items-center sm:items-start">
                        {Number(services[i].index) >= 0 && (
                            <li className='w-full flex flex-row border-b border-b-white/10 py-2' >
                                <div className='w-16 h-16 flex my-auto'>
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
                                        <div className='w-16 h-16 flex my-auto'>
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
                <div className="w-full flex flex-col font-montserratR fixed sm:sticky bottom-0 left-0 right-0 sm:bottom-20 bg-black/95 sm:bg-black p-4 border-t border-white/10 sm:border-none z-50 backdrop-blur-sm">
                    <div className="w-[90%] lg:w-full mx-auto">
                        <div className="w-full justify-between flex flex-row gap-5">
                            <span className="text-lg text-white/70">{language ? 'Tarpinė suma' : 'Промежуточная сумма'}</span>
                            <span className="text-2xl text-white/70">€{formatPrice(subtotal)}</span>
                        </div>
                        {carType > 1 && sum > 0 && (
                            <div className="w-full justify-between flex flex-row gap-5">
                                <span className="text-lg text-white/70">{language ? 'Kėbulo tipas' : 'Тип кузова'}</span>
                                <span className="text-2xl text-white/70">€{formatPrice((subtotal * carType) - subtotal)}</span>
                            </div>
                        )}
                        {promoCode > 0 && (
                            <div className="w-full justify-between flex flex-row gap-5">
                                <span className="text-lg text-white/70">{language ? 'Nuolaidu Kodas' : 'Nuolaidu Kodas'}</span>
                                <span className="text-xl sm:text-2xl text-white/70">-€{formatPrice(promoCode)}</span>
                            </div>
                        )}
                        <div className="w-full justify-between flex flex-row gap-5 mt-2">
                            <span className="text-xl text-white">{language ? 'Iš viso su PVM' : 'Итого с PVM'}</span>
                            <span className="text-2xl sm:text-3xl text-white">€{formatPrice(sum)}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex my-2 mt-5 sm:mt-0 sm:my-0 sm:mb-2">
                    <button onClick={reservBtn} className={`w-full flex justify-center items-center px-3 py-1.5 rounded-md font-montserratR ${sum > 0 ? 'bg-white text-black hover:bg-dot9' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}>{language ? 'Rezervuoti' : 'Резервация'}</button>
                </div>
                <div className="w-full justify-between items-center flex flex-row gap-5 cursor-pointer" onClick={() => promoTogBtn()}>
                    <span className="text-lg text-white/70 w-full">{language ? 'Turite nuolaidos kodą?' : 'У вас есть промокод?'} <span className="text-white/30">{language ? '(neprivaloma)' : '(необязательно)'}</span></span>
                    {!promoTog && <svg viewBox="0 0 24 24" className="fill-white h-6 w-6" focusable="false" aria-hidden="true"><path d="M2.859 7.475a.75.75 0 0 1 1.06 0l7.55 7.55a.75.75 0 0 0 1.06 0l7.551-7.55a.75.75 0 1 1 1.061 1.06l-7.55 7.55a2.25 2.25 0 0 1-3.182 0l-7.55-7.55a.75.75 0 0 1 0-1.06"></path></svg>}
                    {promoTog && <svg viewBox="0 0 24 24" className="fill-white h-6 w-6" focusable="false" aria-hidden="true"><path d="M2.64 15.994c0-.192.073-.384.219-.53l7.55-7.55a2.25 2.25 0 0 1 3.181 0l7.551 7.55a.75.75 0 1 1-1.06 1.06l-7.551-7.55a.75.75 0 0 0-1.06 0l-7.55 7.55a.75.75 0 0 1-1.28-.53"></path></svg>}
                </div>
                {promoTog &&
                    <div className="flex flex-col">
                        <div className="flex flex-row mt-2 mb-1 font-montserratR">
                            <input className="border border-white bg-black text-white px-2 lg:pr-12 py-1 rounded-md w-40" type="text" name="promo" value={promo} onChange={handlePromoChange} placeholder={language ? "Kodas" : 'Код'} />
                            <button onClick={calculatePromoCode} className="bg-white px-2 lg:px-6 py-1 rounded-md ml-4">{language ? 'Pritaikyti' : 'Применить'}</button>
                        </div>
                        {wrongPromo && <span className='font-montserratR text-rdot'>{language ? 'Neteisingas kodas' : 'Неверный код'}</span>}
                    </div>}
            </div>

        </div>
    )
}