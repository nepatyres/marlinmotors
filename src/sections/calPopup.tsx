import TimeSlotSelector from "@/components/calendar/TimeSlotSelector";
import Calendar from "@/components/calendar/TimeSlotSelector";
import React, { useState, useEffect } from "react";

export default function CalPopup({ language, setCalPopup, setReservPopup, formData, carType, selectedType, services, toggleStates, moreToggleStates, subtotal, promoCode, sum, selectedOption, toggler,selection, moreToggles,handleRegister }: any) {
    const calCloseBtn = () => {
        setCalPopup(false);
        setReservPopup(false);
    };

    const calBackBtn = () => {
        setCalPopup(false);
    }

    return (
        <div className="w-full h-full z-[9999] absolute flex justify-center items-center">
            <div className="p-0 m-0 rounded-2xl w-[500px] h-[620px] items-center flex-col flex relative border bg-black border-bdot05">
                <div className="flex flex-row justify-between">
                    <svg onClick={calBackBtn} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" className="p-2.5 rotate-180 fill-zinc-400 h-11 w-11 flex cursor-pointer absolute left-0 top-0 ml-3 mt-3 rounded-full hover:fill-[#ffffff99] hover:bg-white/5 transition-colors duration-500" viewBox="0 0 330 330" xmlSpace="preserve">
                        <path stroke="#182f3d" strokeWidth="1" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z" />
                    </svg>
                    <svg onClick={() => calCloseBtn()} className="fill-zinc-400 h-11 w-11 flex cursor-pointer absolute right-0 top-0 mr-3 mt-3 rounded-full hover:fill-[#ffffff99] hover:bg-white/5 transition-colors duration-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                        <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
                    </svg>
                </div>
                <div className="flex flex-col text-center mt-16 mx-auto">
                    <span className="font-montserratR text-2xl mb-4 text-zinc-300">
                        {language ? "Pasirinkite data ir laika" : "Выберете дату и время"}
                    </span>
                    <div className="flex flex-col justify-center items-center mx-auto text-monserratR">
                        <TimeSlotSelector language={language} setCalPopup={setCalPopup} setReservPopup={setReservPopup} formData={formData} carType={carType} selectedType={selectedType} services={services} toggleStates={toggleStates} moreToggleStates={moreToggleStates} subtotal={subtotal} promoCode={promoCode} sum={sum} selectedOption={selectedOption} toggler={toggler} selection={selection} moreToggles={moreToggles} handleRegister={handleRegister}/>
                    </div>
                </div>
            </div>
        </div >
    );
}