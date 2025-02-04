import React, { useState } from "react";
import CalPopup from "./calPopup";
export default function ReservPopup({ language, setReservPopup, carType, selectedType, services, toggleStates, subtotal, promoCode, sum, selectedOption, toggler, selection, handleRegister }: any) {
    const [calPopup, setCalPopup] = useState(false)
    const [addressTog, setAddressTog] = useState(false);
    const [formData, setFormData] = useState({
        model: "",
        plate: "",
        name: "",
        email: "",
        number: "",
        address: ''
    });

    const reservCloseBtn = () => {
        setReservPopup(false);
    };

    const calPopupBtn = () => {
        setCalPopup(true);
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const addressTogBtn = () => {
        setAddressTog(!addressTog);
    }

    const isFormComplete = () => {
        const requiredFields = {
            model: formData.model,
            plate: formData.plate,
            name: formData.name,
            email: formData.email,
            number: formData.number
        };
        return Object.values(requiredFields).every((value) => value.trim() !== "") &&
            isValidEmail(formData.email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex fixed inset-0 min-h-full w-full z-[9998] backdrop-blur-sm items-center justify-center">
            <div className="p-0 m-0 rounded-2xl w-[380px] sm:w-[500px] items-end flex-col flex bg-black">
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
                    <input type="phone" name="number" value={formData.number} onChange={handleChange} placeholder={language ? "Tel. numeris" : 'Тел. номер'} className="w-60 sm:w-80 h-14 border mb-2 pl-2 border-white/30 rounded appearance-none focus:outline focus:outline-white/50 focus:outline-2 text-base bg-transparent text-white z-10" required />
                    <div className="w-full flex mt-0 cursor-pointer justify-between text-montserratR" onClick={() => addressTogBtn()}>
                        <p className="text-white">{language ? 'Ar mums paimti jūsų automobilį?' : 'Нам взять ваш автомобиль?'}</p>
                        {!addressTog && <svg viewBox="0 0 24 24" className="fill-white h-6 w-6" focusable="false" aria-hidden="true"><path d="M2.859 7.475a.75.75 0 0 1 1.06 0l7.55 7.55a.75.75 0 0 0 1.06 0l7.551-7.55a.75.75 0 1 1 1.061 1.06l-7.55 7.55a2.25 2.25 0 0 1-3.182 0l-7.55-7.55a.75.75 0 0 1 0-1.06"></path></svg>}
                        {addressTog && <svg viewBox="0 0 24 24" className="fill-white h-6 w-6" focusable="false" aria-hidden="true"><path d="M2.64 15.994c0-.192.073-.384.219-.53l7.55-7.55a2.25 2.25 0 0 1 3.181 0l7.551 7.55a.75.75 0 1 1-1.06 1.06l-7.551-7.55a.75.75 0 0 0-1.06 0l-7.55 7.55a.75.75 0 0 1-1.28-.53"></path></svg>}
                    </div>
                    {addressTog &&
                        <div className="flex flex-row mt-2 font-montserratR">
                            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder={language ? "Automobilio lokacija" : 'Локация автомобиля'} className="w-60 sm:w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" required />
                        </div>}
                        <button onClick={() => calPopupBtn()} disabled={!isFormComplete()} className={`w-60 sm:w-80 mt-8 self-start h-10 font-montserratR border-none rounded-md text-base cursor-pointer transition-colors duration-200 mb-10  ${isFormComplete() ? "bg-white text-black hover:bg-dot9" : "bg-gray-600 text-gray-300 cursor-not-allowed"}`}>{language ? 'Toliau' : 'Дальше'}</button>

                </div >
            </div>
            {
                calPopup &&
                <CalPopup language={language} setCalPopup={setCalPopup} setReservPopup={setReservPopup} formData={formData} carType={carType} selectedType={selectedType} services={services} toggleStates={toggleStates} subtotal={subtotal} promoCode={promoCode} sum={sum} selectedOption={selectedOption} toggler={toggler} selection={selection} handleRegister={handleRegister} />}
        </div>
    )
}