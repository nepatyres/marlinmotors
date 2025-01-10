import ReservLeftSide from "@/components/reservLeftSide";
import ReservPopup from "@/sections/reservPopup";
import ReservRightSide from "@/components/reservRightSide";
import { carTypes, moreToggles, selection } from "@/constants/reservation";
import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";
import CalPopup from "./calPopup";

export default function Reservation() {
    const { language, setLanguage } = useLanguage();
    const [carType, setCarType] = useState<number>(1);
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
    const [services, setServices] = useState<{ index: Number; price: number }[]>(selection.map(() => ({ index: -1, price: 0 })))
    const [toggler, setToggler] = useState(selection.map((item) => ({ name: item.name, price: item.price || null })));
    const [selectedStates, setSelectedStates] = useState<boolean[]>(Array(selection.length).fill(false));
    const [toggleStates, setToggleStates] = useState<{ [parentIndex: number]: { [toggleIndex: number]: boolean } }>({});
    const [moreToggleStates, setMoreToggleStates] = useState<{ [toggleIndex: number]: boolean }>({});
    const dropdownRefs = useRef<HTMLDivElement[]>([]);
    const [reservPopup, setReservPopup] = useState(false);
    const [accordionStates, setAccordionStates] = useState<boolean[]>([true, ...Array(selection.length + 1).fill(false)]);

    const [subtotal, setSubtotal] = useState<number>(0.00);
    const [promo, setPromo] = useState('');
    const [wrongPromo, setWrongPromo] = useState(false);
    const [promoCode, setPromoCode] = useState<number>(0.00);
    const [sum, setSum] = useState<number>(0.00);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRefs.current.some((ref) => ref && ref.contains(event.target as Node))) {
                return;
            }
            setSelectedStates(Array(selection.length).fill(false));
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const ltLanguage = () => {
        setLanguage(true);
    };

    const ruLanguage = () => {
        setLanguage(false);
    };

    const togglerBtn = (index: number) => {
        setToggler((prev) =>
            prev.map((item, i) => (i === index ? { ...item, toggled: !item.toggled } : item))
        );
    };

    const handleTypeClick = (index: number) => {
        const multiplier = index === 0 ? 1 : index === 1 || index === 2 ? 1.15 : 1.25;
        setCarType(multiplier);
        setSelectedType(index);
        calculatePromoCode();
        calculateSum(services, toggleStates, moreToggleStates, multiplier, promoCode);
    };

    const handleOptionOrToggle = (type: 'option' | 'toggle' | 'moreToggle', params: { option?: string, price: number, selectionIndex?: number, optionIndex?: number, parentIndex?: number, toggleIndex?: number }) => {
        let updatedServices = [...services];
        let updatedToggles = { ...toggleStates };
        let updatedMoreToggles = { ...moreToggleStates };

        if (type === 'option') {
            const { option, price, selectionIndex, optionIndex } = params;
            if (selectionIndex !== undefined && optionIndex !== undefined) {
                updatedServices[selectionIndex] = { index: optionIndex, price: Number(price) };
                setServices(updatedServices);
                setSelectedOption((prev) => ({ ...prev, [selectionIndex]: option }));
                setSelectedStates((prev) => prev.map((_, idx) => (idx === selectionIndex ? false : prev[idx])));
            }
        } else if (type === 'toggle') {
            const { parentIndex, toggleIndex } = params;
            if (parentIndex !== undefined && toggleIndex !== undefined) {
                const parentToggles = updatedToggles[parentIndex] || {};
                const isActive = !parentToggles[toggleIndex];
                updatedToggles[parentIndex] = {
                    ...parentToggles,
                    [toggleIndex]: isActive,
                };
                setToggleStates(updatedToggles);
            }
        } else if (type === 'moreToggle') {
            const { toggleIndex } = params;
            if (toggleIndex !== undefined) {
                const isActive = !updatedMoreToggles[toggleIndex];
                updatedMoreToggles[toggleIndex] = isActive;
                setMoreToggleStates(updatedMoreToggles);
            }
        }

        calculateSum(updatedServices, updatedToggles, updatedMoreToggles, carType, promoCode);
    };

    const handleOptionClick = (option: string, price: string, selectionIndex: number, optionIndex: number) => {
        handleOptionOrToggle('option', { option, price: Number(price), selectionIndex, optionIndex })
    }

    const handleToggle = (parentIndex: number, toggleIndex: number, togglePrice: number) => {
        handleOptionOrToggle('toggle', { parentIndex, toggleIndex, price: togglePrice });
    }

    const handleMoreToggle = (toggleIndex: number, togglePrice: number) => {
        handleOptionOrToggle('moreToggle', { toggleIndex, price: togglePrice });
    }

    const calculateSum = (servicesArray, toggleArray, moreTogglesStates, multiplier, promoCode) => {
        const totalServices = servicesArray.reduce((acc, service) => acc + service.price, 0);
        const totalToggles = Object.entries(toggleArray).reduce((total, [parentIndex, toggles]) => {
            const togglePrices = selection[parentIndex]?.toggle || [];
            return total + Object.entries(toggles).reduce((subTotal, [toggleIndex, isActive]) => {
                return subTotal + (isActive ? parseFloat(togglePrices[+toggleIndex]?.price || 0) : 0);
            }, 0);
        }, 0);
        const totalMoreToggle = Object.entries(moreTogglesStates).reduce((acc, [toggleIndex, isActive]) => {
            return acc + (isActive ? parseFloat(moreToggles[+toggleIndex]?.price || 0) : 0);
        }, 0);

        const subtotal = totalServices + totalToggles + totalMoreToggle;
        const totalSum = subtotal * multiplier;  // Calculate sum without promo
        const finalSum = totalSum - promoCode;  // Apply promo discount

        // Update state with calculated values
        setSubtotal(subtotal);
        setSum(finalSum);
    };

    useEffect(() => {
        calculatePromoCode();
    }, [promo, subtotal, carType]);


    const calculatePromoCode = () => {
        let discount = 0;
        if (promo.trim().toLowerCase() === 'a') {
            discount = subtotal * 0.1; // Assuming promo 'a' gives a 10% discount
            setWrongPromo(false);
        } else {
            setWrongPromo(true);
            setTimeout(() => setWrongPromo(false), 5000);
        }

        // Update the promo discount state
        setPromoCode(discount);

        // Recalculate the sum after applying the promo code
        calculateSum(services, toggleStates, moreToggleStates, carType, discount);
    };


    const toggleState = (index: number) => {
        setSelectedStates((prevStates) =>
            prevStates.map((state, i) => (i === index ? !state : false))
        );
    };


    return (
        <div className="w-screen bg-black flex justify-center flex-col overflow-auto">
            <div className="w-full flex flex-col">
                <div className='w-full h-[10vh] border-b border-b-white/60 justify-center items-center flex flex-col'>
                    <a href="/" className=" text-white mix-blend-difference text-2xl lg:text-4xl font-gruppo pb-1 tracking-tight cursor-pointer">MARLIN MOTORS</a>
                    <li className="flex justify-center items-center text-white gap-[8px] lg:my-4 lg:absolute right-5">
                        <div onClick={() => ltLanguage()} className={`${!language ? "text-white" : "text-white/50"} cursor-pointer`}>LT</div>
                        <div onClick={() => ruLanguage()} className={`${language ? "text-white" : "text-white/50"} cursor-pointer`}>RU</div>
                    </li>
                </div>
                <div className="flex w-full justify-center">
                    <div className="xl:w-10/12 rounded-md grid lg:grid-cols-2">
                        <ReservLeftSide language={language} carTypes={carTypes} accordionStates={accordionStates} setAccordionStates={setAccordionStates} handleTypeClick={handleTypeClick} selectedType={selectedType} services={services} selection={selection}
                            dropdownRefs={dropdownRefs} toggler={toggler} togglerBtn={togglerBtn} toggleState={toggleState} selectedOption={selectedOption}
                            selectedStates={selectedStates} handleOptionClick={handleOptionClick} handleToggle={handleToggle} toggleStates={toggleStates} handleMoreToggle={handleMoreToggle} moreToggleStates={moreToggleStates} />

                        <ReservRightSide language={language} toggler={toggler} services={services} selection={selection} handleOptionClick={handleOptionClick} toggleStates={toggleStates} moreToggleStates={moreToggleStates} moreToggles={moreToggles}
                            handleToggle={handleToggle} handleMoreToggle={handleMoreToggle} handleTypeClick={handleTypeClick} setReservPopup={setReservPopup} carType={carType} subtotal={subtotal} sum={sum} setPromo={setPromo} promo={promo} promoCode={promoCode} calculatePromoCode={calculatePromoCode} wrongPromo={wrongPromo} />
                    </div>
                    {/* {reservPopup && <ReservPopup language={language} setReservPopup={setReservPopup} sum={sum} />} */}
                    {<CalPopup />}
                </div>
            </div>
        </div >
    )
}