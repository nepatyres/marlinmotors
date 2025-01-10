import React, { useState } from "react";
import CalPopup from "./calPopup";
export default function ReservPopup({ language, setReservPopup, sum }: any) {
    const [calPopup, setCalPopup] = useState(false)
    const reservCloseBtn = () => {
        setReservPopup(false);
    };

    const calPopupBtn = () => {
        setCalPopup(true);
        console.log(sum)
    }

    return (
        <div className="flex fixed inset-0 min-h-full w-full z-[9998] backdrop-blur-sm items-center justify-center">
            <div className="p-0 m-0 rounded-2xl w-[380px] sm:w-[500px] items-end flex-col flex bg-black">
                <svg onClick={() => reservCloseBtn()} className="fill-zinc-400 h-11 w-11 flex cursor-pointer right-0 top-0 mr-3 mt-3 rounded-full hover:fill-[#ffffff99] hover:bg-white/5 transition-colors duration-500"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                    <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
                </svg>
                <div className="flex flex-col text-center mt-4 mx-auto">
                    <span className="font-montserrat text-2xl mb-4 text-zinc-300">{language ? 'Rezervacija' : 'Резервация'}</span>
                    <input type="text" name="model" placeholder={language ? "Automobilio Modelis" : 'Модель транспортного средства'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                    <input type="text" name="plate" placeholder={language ? "Automobilio Numeriai" : 'Номер транспортного средства'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                    <input type="text" name="name" placeholder={language ? "Vardas" : 'Имя'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                    <input type="email" name="email" placeholder={language ? "El. paštas" : 'Эл. почта'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                    <input type="text" name="number" placeholder={language ? "Tel. numeris" : 'Тел. номер'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 rounded appearance-none focus:outline focus:outline-white/50 focus:outline-2 text-base bg-transparent text-white z-10" />
                    <button onClick={() => calPopupBtn()} className="w-60 sm:w-80 mt-10 self-start h-10 font-bold border-none rounded-md text-base cursor-pointer bg-slate-200 text-[#182f3d] hover:bg-slate-300 transition-colors duration-500 mb-10">{language ? 'Toliau' : 'Дальше'}</button>
                </div >
            </div>
            {calPopup && <CalPopup language={language} setCalPopup={setCalPopup} setReservPopup={setReservPopup}/>}
        </div>
    )
}


{/* <span className="font-montserratR text-2xl mb-4 text-zinc-300">
                        {language ? "Pasirinkite data" : "Выберете дату"}
                    </span>
                    <div onSubmit={handleSubmit} className="flex flex-col justify-center items-center mx-auto text-monserratR">
                        <Calendar onDateClick={(date) => console.log("Selected Date:", date)} />
                        <button type="submit" className="w-80 my-10 mx-auto self-start h-10 font-bold border-none rounded-md text-base cursor-pointer bg-slate-200 text-[#182f3d] hover:bg-slate-300 transition-colors duration-500">
                            {language ? "Toliau" : "Дальше"}
                        </button>
                    </div> */}