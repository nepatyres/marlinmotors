import React from "react";

export default function EmailForm() {
    return (
        <div className="w-full lg:w-[42%]">
            <div className="font-ubuntuL text-white">
                <span className="flex justify-center mt-[50px] sm:mb-2.5 font-gruppo font-semibold text-white/90 tracking-wider text-[22px] sm:text-[30px] uppercase">Paskambinkite Mums</span>
                <div className="flex justify-center font-gruppo text-[30px] sm:text-[40px]">+370 607 39928</div>
            </div>
            <div className="font-ubuntuL text-white w-full">
                <span className="flex justify-center mt-[30px] mb-2.5 font-gruppo font-semibold text-white/90 tracking-wider text-[22px] sm:text-[30px] uppercase">Parašykite mums</span>
                <form className='w-full ' action="https://formsubmit.co/contactjulijus@gmail.com" method="POST">
                    <div className="mb-3">
                        <input type="name" className="bg-black text-white focus:bg-black py-[6px] px-3 focus:outline-2 focus:outline-blue-400 rounded-md focus:text-white border border-white w-full" id="exampleFormControlInput2" placeholder="Vardas" required />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="bg-black text-white focus:bg-black py-[6px] px-3 focus:outline-2 focus:outline-blue-400 rounded-md focus:text-white border border-white w-full" id="exampleFormControlInput1" placeholder="El. paštas" required />
                    </div>
                    <div className="mb-3">
                        <input type="phone" className="bg-black text-white focus:bg-black py-[6px] px-3 focus:outline-2 focus:outline-blue-400 rounded-md focus:text-white border border-white w-full" id="exampleFormControlInput3" placeholder="Tel. nr" required />
                    </div>
                    <div className="mb-3">
                        <textarea className="bg-black text-white focus:bg-black py-[6px] px-3 focus:outline-2 focus:outline-blue-400 rounded-md focus:text-white border border-white w-full" id="exampleFormControlTextarea1" rows={3} placeholder="Pranešimas" required></textarea>
                    </div>
                    <div className='email-btn'>
                        <button className='font-ubuntuL font-thin text-[20px] bg-transparent hover:bg-[#c1d8f026] transition-colors ease-in duration-500 bg-black text-white focus:bg-black focus:text-white border border-[#c1d8f0cc] rounded-[5px] mt-0 ml-0.5 py-px px-4' type="submit">
                            Siųsti
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}