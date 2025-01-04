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
                <svg onClick={() => reservCloseBtn()} className="fill-zinc-400 h-11 w-11 flex cursor-pointer absolute right-0 top-0 mr-3 mt-3 rounded-full hover:fill-[#ffffff99] hover:bg-white/5 transition-colors duration-500"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                    <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
                </svg>
                <div className="calendly-inline-widget" data-url="https://calendly.com/marlinmotorslt/120min?hide_event_type_details=1&hide_gdpr_banner=1" style={{ minWidth: "500px", height: "700px" }}></div>
            </div >
        </div >
    )
}