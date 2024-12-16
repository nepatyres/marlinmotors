import React, { useState, useEffect } from "react";
import { lists, plans, prices } from '@/constants';
import { checkMark, crossSign } from "@/components/svg";

interface PriceData {
  description: string[];
  [key: number]: {
    name: string;
    price: string;
    check: number;
  };
}

function Prices() {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    useEffect(() => {
        setSelectedItem(0);
    }, []);

    const handleItemClick = (index: number) => {
        setSelectedItem(index);
    };

    const selectedItemIndex = selectedItem === null ? 0 : selectedItem;
    const selectedPrice = prices[selectedItemIndex] as PriceData;

    return (
        <div id="scrollToPrices" className="min-h-screen overflow-hidden bg-[#141414]">
            <div className="text-center text-white/70 uppercase font-gruppo font-semibold  text-[30px] mb-[50px] mt-[60px] lg:text-[40px]">PRICE LIST OF SERVICES</div>
            <div className="bg-transparent text-black mb-[30px]">
                <div className="mx-auto max-w-[600px]">
                    <ul className="flex flex-row justify-center border-[1.8px] border-white/60 rounded-[35px] mb-0 p-1 bg-[#141414] text-white/70">
                        {lists.map((list, i) => (
                            <li key={i} className={`flex justify-center text-[14px] lg:text-[16px] text-white/70 w-full rounded-[25px] h-[50px] text-center items-center cursor-pointer font-ubuntuL list-none no-underline transition-colors ease-linear duration-300 mr-[7px] md:mr-2.5 last:mr-0 ${selectedItem === i ? 'bg-black text-white hover:bg-[#02161de6] transition-colors ease-in-out duration-300' : ''}`} onClick={() => handleItemClick(i)}>{list}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="packages-main flex flex-row w-[100%] h-auto overflow-x-auto m-0 left-[50%] pl-2.5 pr-2.5 whitespace-nowrap xl:w-[1160px] lg:mx-auto gap-[10px] mt-[25px] mb-[50px]">
                <div className="flex flex-row mx-auto gap-[10px]">
                    {plans.map((plan, i) => (
                        <div key={i} className={`${i !== 1 ? 'mt-2.5' : ''} ${selectedItem === 3 && i == 0 || selectedItem === 3 && i == 2 ? 'hidden' : ''} relative overflow-hidden border-[1.8px] border-white/60 bg-[#141414] rounded-[25px] w-[373px] h-[500px] mb-5 lg:mb-0`}>
                            <div className={`relative w-full h-[175px] overflow-hidden rounded-b-[50%] rounded-tr-[25px] ${i === 0 ? 'bg-[#a5a5a5]' : i === 1 ? 'bg-[#545E61]' : 'bg-[#02161d]'}`}></div>
                            <div className="absolute w-full text-center z-10 text-white/90 font-ubuntuL font-semibold text-[25px] top-[20px]">{plan}</div>
                            <div className="absolute w-full text-center z-10 font-ubuntuL text-[20px] font-thin text-white/50 top-[60px]">{selectedPrice[i].name}</div>
                            <div className="absolute w-full text-center z-10 font-ubuntuL font-extrabold text-[50px] top-[90px] text-white">{selectedPrice[i].price}</div>
                            <div className="absolute w-full text-start mt-2.5 z-10">
                                <ul className="pl-[15%] pr-[52px] font-ubuntuL">
                                    {selectedPrice.description.map((des, j) => (
                                        <li key={j} className="flex items-center font-ubuntuL mb-[5px] text-[18px] border-t text-white border-t-white/[0.08]">{selectedPrice[i].check > j ? checkMark : crossSign}{des}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Prices;