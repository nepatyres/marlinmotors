import Calendar from "@/components/calendar/calendar";
import React, { useState, useEffect } from "react";

export default function CalPopup({ language, setCalPopup,setReservPopup}: any) {
    const calCloseBtn = () => {
        setCalPopup(false);
    };

    return (
        <div className="w-full h-full backdrop-blur-xl z-[9999] absolute flex justify-center items-center">
            <div className="p-0 m-0 rounded-2xl bg-black w-[500px] items-center flex-col flex relative">
                <svg onClick={() => calCloseBtn()} className="fill-zinc-400 h-11 w-11 flex cursor-pointer absolute right-0 top-0 mr-3 mt-3 rounded-full hover:fill-[#ffffff99] hover:bg-white/5 transition-colors duration-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                    <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
                </svg>
                <div className="flex flex-col text-center mt-16 mx-auto">
                    <span className="font-montserratR text-2xl mb-4 text-zinc-300">
                        {language ? "Pasirinkite data" : "Выберете дату"}
                    </span>
                    <div  className="flex flex-col justify-center items-center mx-auto text-monserratR">
                        <Calendar onDateClick={(date) => console.log("Selected Date:", date)} />
                        <button className="w-80 my-10 mx-auto self-start h-10 font-bold border-none rounded-md text-base cursor-pointer bg-slate-200 text-[#182f3d] hover:bg-slate-300 transition-colors duration-500">
                            {language ? "Toliau" : "Дальше"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}