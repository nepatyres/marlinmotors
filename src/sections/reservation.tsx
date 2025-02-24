import ReservLeftSide from "@/components/reservLeftSide";
import ReservPopup from "@/sections/reservPopup";
import ReservRightSide from "@/components/reservRightSide";
import { carTypes, selection } from "@/constants/reservation";
import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";

interface ToggleArray {
    [key: string]: {
        [key: string]: boolean;
    };
}

export default function Reservation() {
    const { language, setLanguage } = useLanguage();
    const [carType, setCarType] = useState<number>(1);
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
    const [services, setServices] = useState<{ index: Number; price: number }[]>(selection.map(() => ({ index: -1, price: 0 })))
    const [toggler, setToggler] = useState(selection.map((item) => ({ name: item.name, price: item.options[0]?.price || null, toggled: false })));
    const [selectedStates, setSelectedStates] = useState<boolean[]>(Array(selection.length).fill(false));
    const [toggleStates, setToggleStates] = useState<{ [parentIndex: number]: { [toggleIndex: number]: boolean } }>({});
    const dropdownRefs = useRef<HTMLDivElement[]>([]);
    const [reservPopup, setReservPopup] = useState(false);
    const [accordionStates, setAccordionStates] = useState<boolean[]>([true, ...Array(selection.length + 1).fill(false)]);

    const [subtotal, setSubtotal] = useState<number>(0.00);
    const [promoTog, setPromoTog] = useState(false);
    const [promo, setPromo] = useState('');
    const [wrongPromo, setWrongPromo] = useState(false);
    const [promoCode, setPromoCode] = useState<number>(0.00);
    const [promoActivated, setPromoActivated] = useState(false);
    const [sum, setSum] = useState<number>(0.00);

    const [isRegistered, setIsRegistered] = useState(false);

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
        calculateSum(services, toggleStates, multiplier, promoActivated);
    };

    const handleOptionOrToggle = (type: 'option' | 'toggle', params: { option?: string, price: number, selectionIndex?: number, optionIndex?: number, parentIndex?: number, toggleIndex?: number }) => {
        let updatedServices = [...services];
        let updatedToggles = { ...toggleStates };

        if (type === 'option') {
            const { option, price, selectionIndex, optionIndex } = params;
            const { parentIndex, toggleIndex } = params;
            if (selectionIndex !== undefined && optionIndex !== undefined) {
                updatedServices[selectionIndex] = { index: optionIndex, price: Number(price) };
                if (selectionIndex === 1) {
                    const section3Toggles = updatedToggles[3] || {};
                    updatedToggles[3] = {
                        ...section3Toggles,
                        0: false
                    };
                }
                if (selectionIndex === 0) {
                    if (optionIndex === 2) {
                        updatedToggles = {};
                    }
                }

                setServices(updatedServices);
                setSelectedOption((prev) => ({ ...prev, [selectionIndex]: option ?? "" }));
                setSelectedStates((prev) => prev.map((_, idx) => (idx === selectionIndex ? false : prev[idx])));
                setToggleStates(updatedToggles);
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
        }

        calculateSum(updatedServices, updatedToggles, carType, promoActivated);
    };

    const handleOptionClick = (option: string, price: string, selectionIndex: number, optionIndex: number) => {
        handleOptionOrToggle('option', { option, price: Number(price), selectionIndex, optionIndex })
    }

    const handleToggle = (parentIndex: number, toggleIndex: number, togglePrice: number) => {
        handleOptionOrToggle('toggle', { parentIndex, toggleIndex, price: togglePrice });
    }

    const calculateSum = (servicesArray: any, toggleArray: any, multiplier = 1, promoActive = false) => {
        const totalServices = servicesArray.reduce((acc: any, service: any) => acc + (service.price || 0), 0);
        const totalToggles = Object.entries(toggleArray as ToggleArray).reduce((total, [parentIndex, toggles]) => {
            const togglePrices = selection[Number(parentIndex)]?.toggle || [];
            return total + Object.entries(toggles).reduce((subTotal, [toggleIndex, isActive]) => {
                const price = parseFloat(togglePrices[Number(toggleIndex)]?.price || '0');
                return subTotal + (isActive ? price : 0);
            }, 0);
        }, 0);
        const baseSubtotal = totalServices + totalToggles;
        setSubtotal(baseSubtotal);
        const totalWithMultiplier = baseSubtotal * (multiplier || 1);
        const promoDiscount = promoActive ? totalWithMultiplier * 0.1 : 0;
        setPromoCode(promoDiscount);
        const finalSum = totalWithMultiplier - promoDiscount;
        setSum(finalSum);
    };


    const calculatePromoCode = () => {
        if (promo.trim() === 'KvKh5Wvc') {
            setWrongPromo(false);
            setPromoActivated(true);
            calculateSum(services, toggleStates, carType, true);
            setPromoTog(false)
        } else {
            setWrongPromo(true);
            setPromoActivated(false);
            setPromoCode(0);
            calculateSum(services, toggleStates, carType, false);
            setTimeout(() => setWrongPromo(false), 5000);
        }
    };

    const toggleState = (index: number) => {
        setSelectedStates((prevStates) =>
            prevStates.map((state, i) => (i === index ? !state : false))
        );
    };

    const handleRegister = () => {
        setIsRegistered(true);
        setTimeout(() => setIsRegistered(false), 3000);
    };

    useEffect(() => {
        const shouldTriggerRegister = localStorage.getItem("triggerRegister");
        if (shouldTriggerRegister) {
            handleRegister();
            localStorage.removeItem("triggerRegister");
        }
    }, []);


    return (
        <div className={`w-screen ${reservPopup ? 'h-screen' : 'min-h-screen'} bg-black flex justify-center flex-col overflow-auto`}>
            <div className="w-full flex flex-col">
                <div className='w-full h-[10vh] border-b border-b-white/60 justify-center items-center flex flex-col'>
                    <a href="/" className=" text-white mix-blend-difference text-2xl lg:text-4xl font-gruppo pb-1 tracking-tight cursor-pointer">MARLIN MOTORS</a>
                    <li className="flex justify-center items-center text-white gap-[8px] lg:my-4 lg:absolute right-5">
                        <div onClick={() => ltLanguage()} className={`${!language ? "text-white" : "text-white/50"} cursor-pointer`}>LT</div>
                        <div onClick={() => ruLanguage()} className={`${language ? "text-white" : "text-white/50"} cursor-pointer`}>RU</div>
                    </li>
                </div>
                <div className="flex w-full h-full justify-center">
                    <div className="xl:w-10/12 2xl:w-8/12 h-full rounded-md grid lg:grid-cols-2">
                        <ReservLeftSide language={language} carTypes={carTypes} accordionStates={accordionStates} setAccordionStates={setAccordionStates}
                            handleTypeClick={handleTypeClick} selectedType={selectedType} selection={selection} handleOptionClick={handleOptionClick}
                            dropdownRefs={dropdownRefs} toggler={toggler} togglerBtn={togglerBtn} toggleState={toggleState} selectedOption={selectedOption}
                            selectedStates={selectedStates} handleToggle={handleToggle} toggleStates={toggleStates} />

                        <ReservRightSide language={language} toggler={toggler} services={services} selection={selection} handleOptionClick={handleOptionClick}
                            toggleStates={toggleStates} handleToggle={handleToggle} handleTypeClick={handleTypeClick} setReservPopup={setReservPopup} carType={carType}
                            subtotal={subtotal} sum={sum} setPromoTog={setPromoTog} promoTog={promoTog} setPromo={setPromo} promo={promo} promoCode={promoCode}
                            calculatePromoCode={calculatePromoCode} wrongPromo={wrongPromo} />
                    </div>
                    {
                        reservPopup &&
                        <ReservPopup language={language} setReservPopup={setReservPopup} carType={carType} selectedType={selectedType} services={services}
                            toggleStates={toggleStates} subtotal={subtotal} promoCode={promoCode} sum={sum} selectedOption={selectedOption} toggler={toggler}
                            selection={selection} handleRegister={handleRegister} />}
                    {isRegistered && <span className="text-green-600 font-medium mt-4 fixed bg-green-50 border border-green-400 rounded-md px-4 py-2 shadow-sm">
                        {language ? 'Rezervacija sėkminga!' : 'Резервация удачна!'}
                    </span>}
                </div>
            </div>
        </div >
    )
}