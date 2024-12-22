export default function ReservPopup({ setReservPopup }) {
    const reservCloseBtn = () => {
        setReservPopup(false);
    }
    return (
        <div className="h-screen absolute overflow-hidden m-0 z-[100] flex">
            <div className="noto flex fixed backdrop-blur-sm w-full h-screen top-0 left-0 justify-center items-center z-30 transition-opacity-transform duration-1000 ease-in-out transform">
                <div className="p-0 m-0 rounded-2xl relative w-[500px] h-[500px] items-center flex-col flex bg-black">
                    <svg onClick={() => reservCloseBtn()} className="fill-zinc-400 h-11 w-11 flex cursor-pointer absolute right-0 top-0 mr-3 mt-3 rounded-full hover:fill-[#ffffff99] hover:bg-white/5 transition-colors duration-500"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">
                        <path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
                    </svg>
                    <div className="flex flex-col text-center mt-16 mx-auto">
                        {/* <p className="inter-regular text-2xl mb-4 text-zinc-300"></p> */}
                        <form>
                            <input type="name" name="name" placeholder="Vardas"
                                className="w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                            <input type="email" name="email" placeholder="El. paštas"
                                className="w-80 h-14 border mb-4 pl-2 border-white/30 focus:outline focus:outline-white/50 focus:outline-2 rounded appearance-none text-base bg-transparent text-white z-10" />
                            <input type="text" name="number" placeholder="Tel.nr"
                                className="w-80 h-14 border mb-4 pl-2 border-white/30 rounded appearance-none focus:outline focus:outline-white/50 focus:outline-2 text-base bg-transparent text-white z-10" />
                            <button type="submit"
                                className="w-80 mt-10 self-start h-10 font-bold border-none rounded-md text-base cursor-pointer bg-slate-200 text-[#182f3d] hover:bg-slate-300 transition-colors duration-500">Rezervuoti</button>
                        </form>
                        <div className="mt-6 w-full overflow-x-auto">
                            <iframe
                                src="https://calendar.google.com/calendar/embed?src=marlinmotorslt%40gmail.com&ctz=Europe%2FVilnius"
                                style={{ border: 0 }}
                                width="400"
                                height="300"
                                frameBorder="0"
                                scrolling="no"
                                className="rounded-lg"
                            ></iframe>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}