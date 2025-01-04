import React, { useEffect } from "react";
export default function ReservPopup({ language, setReservPopup }) {
    const reservCloseBtn = () => {
        setReservPopup(false);
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className="h-screen absolute overflow-hidden m-0 z-[100] flex">
            <div className="noto flex fixed backdrop-blur-sm w-full h-screen top-0 left-0 justify-center items-center z-30 transition-opacity-transform duration-1000 ease-in-out transform">
                {/* <div className="p-0 m-0 rounded-2xl relative w-[500px] items-center flex-col flex bg-black">
                    <svg onClick={() => reservCloseBtn()} className="fill-zinc-400 h-11 w-11 flex cursor-pointer absolute right-0 top-0 mr-3 mt-3 rounded-full hover:fill-[#ffffff99] hover:bg-white/5 transition-colors duration-500"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                        <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
                    </svg>
                    <div className="flex flex-col text-center mt-16 mx-auto">
                        <span className="font-montserrat text-2xl mb-4 text-zinc-300">{language ? 'Rezervacija' : 'Резервация'}</span>
                        <form>
                            <input type="text" name="model" placeholder={language ? "Transporto Modelis" : 'Модель транспортного средства'}
                                className="w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                            <input type="text" name="plate" placeholder={language ? "Transporto Numeriai" : 'Номер транспортного средства'}
                                className="w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                            <input type="text" name="name" placeholder={language ? "Vardas" : 'Имя'}
                                className="w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                            <input type="email" name="email" placeholder={language ? "El. paštas" : 'Эл. почта'}
                                className="w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                            <input type="text" name="number" placeholder={language ? "Tel. numeris" : 'Тел. номер'}
                                className="w-80 h-14 border mb-4 pl-2 border-white/30 rounded appearance-none focus:outline focus:outline-white/50 focus:outline-2 text-base bg-transparent text-white z-10" />
                            <button type="submit"
                                className="w-80 mt-10 self-start h-10 font-bold border-none rounded-md text-base cursor-pointer bg-slate-200 text-[#182f3d] hover:bg-slate-300 transition-colors duration-500 mb-10">{language ? 'Rezervuoti' : 'Резервировать'}</button>
                        </form>
                    </div >
                </div > */}
                <div
                            className="calendly-inline-widget"
                            data-url="https://calendly.com/marlinmotorslt/120min?hide_event_type_details=1&hide_gdpr_banner=1"
                            style={{ minWidth: "500px", height: "700px" }}
                        ></div>
            </div >
        </div >
    )
}