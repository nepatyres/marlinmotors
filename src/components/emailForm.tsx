import React, { useState, useEffect } from "react";

export default function EmailForm({ language }) {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(language ? "Siunčiama..." : "Отправка...");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.success) {
                setStatus(language ? "Žinutė išsiųsta!" : "Сообщение отправлено!");
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                setStatus(language ? "Nepavyko išsiųsti žinutės." : "Не удалось отправить сообщение.");
            }
        } catch (error) {
            setStatus(language ? "Įvyko klaida. Bandykite dar kartą." : "Произошла ошибка. Попробуйте еще раз.");
        }
    };

    return (
        <div className="w-full lg:w-[42%]">
            <div className="font-ubuntuL text-white">
                <span className={`flex justify-center mt-[50px] sm:mb-2.5 text-white/90 tracking-wider text-[22px] sm:text-[30px] uppercase ${language ? "font-gruppo font-semibold" : "font-montserratR"}`}>
                    {language ? "Paskambinkite Mums" : "позвоните нам"}
                </span>
                <div className="flex justify-center font-gruppo text-[30px] sm:text-[40px]">+370 607 39928</div>
            </div>
            <div className="font-ubuntuL text-white w-full">
                <span className={`flex justify-center mt-[30px] mb-2.5 text-white/90 tracking-wider text-[22px] sm:text-[30px] uppercase ${language ? "font-gruppo font-semibold" : "font-montserratR"}`}>
                    {language ? "Parašykite mums" : "напишите нам"}
                </span>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" name="name" className="bg-black text-white focus:bg-black py-[6px] px-3 focus:outline-2 focus:outline-blue-400 rounded-md focus:text-white border border-white w-full" placeholder={language ? "vardas" : "Имя"} value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="email" name="email" className="bg-black text-white focus:bg-black py-[6px] px-3 focus:outline-2 focus:outline-blue-400 rounded-md focus:text-white border border-white w-full" placeholder={language ? "El. paštas" : "Эл. почта"} value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="phone" name="phone" className="bg-black text-white focus:bg-black py-[6px] px-3 focus:outline-2 focus:outline-blue-400 rounded-md focus:text-white border border-white w-full" placeholder={language ? "Tel. numeris" : "Тел. номер"} value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <textarea name="message" className="bg-black text-white focus:bg-black py-[6px] px-3 focus:outline-2 focus:outline-blue-400 rounded-md focus:text-white border border-white w-full" rows={3} placeholder={language ? "Pranešimas" : "Сообщение"} value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <div className="email-btn">
                        <button className="font-ubuntuL font-thin text-[20px] bg-transparent hover:bg-[#c1d8f026] transition-colors ease-in duration-500 bg-black text-white focus:bg-black focus:text-white border border-[#c1d8f0cc] rounded-[5px] mt-0 ml-0.5 py-px px-4" type="submit">
                            {language ? "Siųsti" : "Отправить"}
                        </button>
                    </div>
                </form>
                <div className="mt-2 text-center text-white">{status}</div>
            </div>
        </div>
    );
}

