import React, { useState } from "react";
import CalPopup from "./calPopup";
export default function ReservPopup({ language, setReservPopup, carType, selectedType, services, toggleStates, subtotal, promoCode, sum, selectedOption, toggler, selection, handleRegister }: any) {
    const [calPopup, setCalPopup] = useState(false)
    const [formData, setFormData] = useState({
        model: "",
        plate: "",
        name: "",
        email: "",
        number: "",
    });

    const reservCloseBtn = () => {
        setReservPopup(false);
    };

    const calPopupBtn = () => {
        setCalPopup(true);
    }

    const isFormComplete = Object.values(formData).every((value) => value.trim() !== "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex fixed inset-0 min-h-full w-full z-[9998] backdrop-blur-sm items-center justify-center">
            <div className="p-0 m-0 rounded-2xl w-[380px] sm:w-[500px] h-[600px] items-end flex-col flex bg-black">
                <svg onClick={() => reservCloseBtn()} className="fill-zinc-400 h-11 w-11 flex cursor-pointer right-0 top-0 mr-3 mt-3 rounded-full hover:fill-[#ffffff99] hover:bg-white/5 transition-colors duration-500"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                    <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
                </svg>
                <div className="flex flex-col text-center mt-4 mx-auto">
                    <span className="font-montserrat text-2xl mb-4 text-zinc-300">{language ? 'Rezervacija' : 'Резервация'}</span>
                    <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder={language ? "Automobilio Modelis" : 'Модель автомобиля'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" required />
                    <input type="text" name="plate" value={formData.plate} onChange={handleChange} placeholder={language ? "Automobilio Numeriai" : 'Номера авто'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" required />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={language ? "Vardas" : 'Имя'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={language ? "El. paštas" : 'Эл. почта'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" required />
                    <input type="phone" name="number" value={formData.number} onChange={handleChange} placeholder={language ? "Tel. numeris" : 'Тел. номер'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 rounded appearance-none focus:outline focus:outline-white/50 focus:outline-2 text-base bg-transparent text-white z-10" required />
                    <button onClick={() => calPopupBtn()} disabled={!isFormComplete} className={`w-60 sm:w-80 mt-10 self-start h-10 font-montserratR border-none rounded-md text-base cursor-pointer transition-colors duration-200 mb-10  ${isFormComplete ? "bg-white text-black hover:bg-dot9" : "bg-gray-600 text-gray-300 cursor-not-allowed"}`}>{language ? 'Toliau' : 'Дальше'}</button>

                </div >
            </div>
            {
                calPopup &&
                <CalPopup language={language} setCalPopup={setCalPopup} setReservPopup={setReservPopup} formData={formData} carType={carType} selectedType={selectedType} services={services} toggleStates={toggleStates} subtotal={subtotal} promoCode={promoCode} sum={sum} selectedOption={selectedOption} toggler={toggler} selection={selection} handleRegister={handleRegister} />}
        </div>
    )
}