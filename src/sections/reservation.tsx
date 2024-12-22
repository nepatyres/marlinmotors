import ReservLeftSide from "@/components/reservLeftSide";
import ReservPopup from "@/components/reservPopup";
import ReservRightSide from "@/components/reservRightSide";
import ReservRight from "@/components/reservRightSide";
import { carTypes, moreToggles, selection } from "@/constants/reservation";
import React, { useState, useEffect, useRef } from "react";

export default function Reservation() {
    const [carType, setCarType] = useState<number>(1);
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
    const [services, setServices] = useState<{ index: Number; price: number }[]>(selection.map(() => ({ index: -1, price: 0 })))
    const [toggler, setToggler] = useState(selection.map((item) => ({ name: item.name, price: item.price || null })));
    const [selectedStates, setSelectedStates] = useState<boolean[]>(Array(selection.length).fill(false));
    const [sum, setSum] = useState<number>(0.00);
    const [subtotal, setSubtotal] = useState<number>(0.00);
    const [toggleStates, setToggleStates] = useState<{ [parentIndex: number]: { [toggleIndex: number]: boolean } }>({});
    const [moreToggleStates, setMoreToggleStates] = useState<{ [toggleIndex: number]: boolean }>({});
    const dropdownRefs = useRef<HTMLDivElement[]>([]);
    const [reservPopup, setReservPopup] = useState(false);

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

    const togglerBtn = (index: number) => {
        setToggler((prev) =>
            prev.map((item, i) => (i === index ? { ...item, toggled: !item.toggled } : item))
        );
    };

    const handleTypeClick = (index: number) => {
        const multiplier = index === 0 ? 1 : index === 1 || index === 2 ? 1.15 : 1.25;
    
        setCarType(multiplier); // Update state asynchronously
        setSelectedType(index);
    
        // Pass the multiplier explicitly to calculateSum to ensure correct calculations
        calculateSum(services, toggleStates, moreToggleStates, multiplier);
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

        const serviceSum = updatedServices.reduce((acc, service) => acc + service.price, 0);

        const toggleSum = Object.entries(updatedToggles).reduce((total, [parentIndex, toggles]) => {
            const togglePrices = selection[parentIndex].toggle || [];
            return total + Object.entries(toggles).reduce((subTotal, [toggleIndex, isActive]) => {
                return subTotal + (isActive ? parseFloat(togglePrices[+toggleIndex].price) : 0);
            }, 0);
        }, 0);

        const moreToggleSum = Object.entries(updatedMoreToggles).reduce((acc, [toggleIndex, isActive]) => {
            return acc + (isActive ? parseFloat(moreToggles[+toggleIndex]?.price || '0') : 0);
        }, 0);

        const subtotal = (serviceSum + toggleSum + moreToggleSum);
        const totalSum = subtotal * carType;

        setSubtotal(subtotal);
        setSum(totalSum);
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

    const calculateSum = (servicesArray: { price: number }[], toggleArray: { [parentIndex: number]: { [toggleIndex: number]: boolean } }, moreTogglesStates: { [toggleIndex: number]: boolean }, multiplier: number) => {
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
        const totalSum = subtotal * multiplier;

        setSubtotal(subtotal);
        setSum(totalSum);
    };

    const toggleState = (index: number) => {
        setSelectedStates((prevStates) =>
            prevStates.map((state, i) => (i === index ? !state : false))
        );
    };


    return (
        <div className="w-screen bg-black min-h-screen flex justify-center flex-col">
            <div className="w-full flex flex-col min-h-screen">
                <div className='w-full h-[10vh] border-b border-b-white/60 justify-center items-center flex'>
                    <a href="/" className=" text-white mix-blend-difference text-4xl font-gruppo pb-1 tracking-tight cursor-pointer">MARLIN MOTORS</a>
                </div>
                <div className="flex w-full justify-center">
                    <div className="xl:w-10/12 rounded-md grid lg:grid-cols-2">
                        <ReservLeftSide carTypes={carTypes} handleTypeClick={handleTypeClick} selectedType={selectedType} services={services} selection={selection}
                            dropdownRefs={dropdownRefs} toggler={toggler} togglerBtn={togglerBtn} toggleState={toggleState} selectedOption={selectedOption}
                            selectedStates={selectedStates} handleOptionClick={handleOptionClick} handleToggle={handleToggle} toggleStates={toggleStates} handleMoreToggle={handleMoreToggle} moreToggleStates={moreToggleStates} />
                        <ReservRightSide toggler={toggler} services={services} selection={selection} handleOptionClick={handleOptionClick} toggleStates={toggleStates}
                            handleToggle={handleToggle} subtotal={subtotal} sum={sum} handleTypeClick={handleTypeClick} setReservPopup={setReservPopup} />
                    </div>
                    {reservPopup && <ReservPopup setReservPopup={setReservPopup} />}
                </div>
            </div>
        </div >
    )
}