import React, { useEffect, useState } from 'react';

interface Translations {
    lt: LanguageStrings;
    ru: LanguageStrings;
}

interface LanguageStrings {
    booking: string;
    submitting: string;
    bookingConfirmed: string;
    bookingFailed: string;
    errorOccurred: string;
    months: { [key: number]: string };
    weekdays: { [key: number]: string };
}

const TimeSlotSelector = ({ setCalPopup, setReservPopup, formData, language, carType, selectedType, services, toggleStates, subtotal, promoCode, sum, selectedOption, toggler, selection }: any) => {
    const [events, setEvents] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log('Current language:', language);
    }, [language]);

    const translations = {
        lt: {
            booking: "Rezervuoti",
            submitting: "Vykdoma...",
            bookingConfirmed: "Rezervacija patvirtinta!",
            bookingFailed: "Nepavyko rezervuoti laiko. Bandykite dar kartą.",
            errorOccurred: "Įvyko klaida. Bandykite dar kartą.",
            months: {
                0: 'sausio', 1: 'vasario', 2: 'kovo', 3: 'balandžio', 4: 'gegužės', 5: 'birželio', 
                6: 'liepos', 7: 'rugpjūčio', 8: 'rugsėjo', 9: 'spalio', 10: 'lapkričio', 11: 'gruodžio'
            },
            weekdays: {
                0: 'sekmadienis', 1: 'pirmadienis', 2: 'antradienis', 3: 'trečiadienis', 
                4: 'ketvirtadienis', 5: 'penktadienis', 6: 'šeštadienis'
            }
        },
        ru: {
            booking: "Забронировать",
            submitting: "Обработка...",
            bookingConfirmed: "Бронирование подтверждено!",
            bookingFailed: "Не удалось забронировать. Попробуйте еще раз.",
            errorOccurred: "Произошла ошибка. Попробуйте еще раз.",
            months: {
                0: 'января', 1: 'февраля', 2: 'марта', 3: 'апреля', 4: 'мая', 5: 'июня',
                6: 'июля', 7: 'августа', 8: 'сентября', 9: 'октября', 10: 'ноября', 11: 'декабря'
            },
            weekdays: {
                0: 'воскресенье', 1: 'понедельник', 2: 'вторник', 3: 'среда',
                4: 'четверг', 5: 'пятница', 6: 'суббота'
            }
        },
    };


    const timeSlots = [
        { start: '10:00', end: '11:00', value: '10:00' },
        { start: '11:00', end: '12:00', value: '11:00' },
        { start: '12:00', end: '13:00', value: '12:00' },
    ];

    useEffect(() => {
        const now = new Date();
        if (now.getHours() >= 12) {
            const nextDay = new Date(now);
            nextDay.setDate(now.getDate() + 1);
            setSelectedDate(nextDay);
        }

        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch("/api/google-calendar");
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    const getCurrentLanguage = () => {
        // Check if language is boolean (for backward compatibility)
        if (typeof language === 'boolean') {
            return language ? 'lt' : 'ru';
        }
        // Check if language is string
        if (typeof language === 'string') {
            return language.toLowerCase() === 'lt' ? 'lt' : 'ru';
        }
        // Default to Russian if language is undefined or invalid
        return 'ru';
    };

    const t = translations[getCurrentLanguage()];

    const formatDate = (date: Date) => {
        const day = date.getDate();
        const monthIndex = date.getMonth() as keyof typeof translations.lt.months;
        const weekdayIndex = date.getDay() as keyof typeof translations.lt.weekdays;
        
        const month = t.months[monthIndex];
        const weekday = t.weekdays[weekdayIndex];
        
        if (language === 'lt') {
            return `${weekday}, ${month} ${day} d.`;
        } else {
            return `${weekday}, ${day} ${month}`;
        }
    };

    const isTimeSlotBooked = (timeSlot: string) => {
        const [hours] = timeSlot.split(':');
        const bookingDate = new Date(selectedDate);
        bookingDate.setHours(parseInt(hours), 0, 0, 0);

        return events.some((event: any) => {
            const eventStart = new Date(event.start);
            return eventStart.getTime() === bookingDate.getTime();
        });
    };

    const handleNextDay = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDate);
        setSelectedSlot(null);
    };

    const handlePrevDay = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(selectedDate.getDate() - 1);

        const now = new Date();
        const isPastWorkingDay = now.getHours() >= 12 && prevDate.toDateString() === now.toDateString();

        if (!isPastWorkingDay && prevDate.getTime() >= new Date().setHours(0, 0, 0, 0)) {
            setSelectedDate(prevDate);
            setSelectedSlot(null);
        }
    };

    const handleSlotSelect = (timeSlot: string) => {
        if (!isTimeSlotBooked(timeSlot)) {
            setSelectedSlot(timeSlot);
        }
    };

    const isMaxDateReached = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 13);
        return selectedDate >= maxDate;
    };

    const handleBooking = async () => {
        if (!selectedSlot) return;
        setIsSubmitting(true);
        const bookingDate = new Date(selectedDate);
        const [hours] = selectedSlot.split(':');
        bookingDate.setHours(parseInt(hours), 0, 0, 0);
        const startTime = bookingDate.toISOString();
        const endTime = new Date(bookingDate.getTime() + 1 * 60 * 60 * 1000).toISOString();

        try {
            const response = await fetch("/api/google-calendar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    start: startTime,
                    end: endTime,
                    summary: "User Booking",
                }),
            });
            
            if (response.ok) {
                await handleSubmit();
                const updatedEvents = await response.json();
                setEvents(updatedEvents);
                setSelectedSlot(null);
                localStorage.setItem("triggerRegister", "true");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error booking slot:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const bookingData = {
                formData, carType, selectedType, services, toggleStates, subtotal, 
                promoCode, sum, selectedOption, toggler, selection, 
                selectedDate, selectedSlot
            };

            const response = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to submit booking:', error);
            throw error;
        }
    };

    return (
        <div className="w-full h-full mx-auto bg-black p-4 rounded-lg">
            <div className="flex items-center justify-between mb-6 px-2">
                <button 
                    onClick={handlePrevDay} 
                    disabled={selectedDate.getTime() <= new Date().setHours(0, 0, 0, 0)} 
                    className={`py-2 px-4 text-[20px] rounded-md transition-colors duration-200 ${
                        selectedDate.getTime() <= new Date().setHours(0, 0, 0, 0) 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                >
                    {'<'}
                </button>
                <div className="text-white text-lg font-medium px-4 text-center">
                    {formatDate(selectedDate)}
                </div>
                <button 
                    onClick={handleNextDay} 
                    disabled={isMaxDateReached()} 
                    className={`py-2 px-4 text-[20px] rounded-md transition-colors duration-200 ${
                        isMaxDateReached() 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                >
                    {'>'}
                </button>
            </div>

            <div className="space-y-2">
                {timeSlots
                    .filter((slot) => {
                        if (selectedDate.toDateString() === new Date().toDateString() && 
                            new Date().getHours() >= 12) {
                            const [startHour] = slot.start.split(':');
                            return parseInt(startHour) >= 12;
                        }
                        return true;
                    })
                    .map((slot) => (
                        <div 
                            key={slot.value} 
                            onClick={() => handleSlotSelect(slot.value)} 
                            className={`p-4 text-[22px] rounded-md cursor-pointer transition-colors duration-200 ${
                                isTimeSlotBooked(slot.value) 
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                : selectedSlot === slot.value 
                                ? 'bg-white/80 text-black' 
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                        >
                            {slot.start}
                        </div>
                    ))}
            </div>

            <button 
                onClick={handleBooking} 
                disabled={!selectedSlot || isSubmitting} 
                className={`w-full mt-16 py-2 px-4 rounded-md font-montserratR transition-colors duration-200 ${
                    selectedSlot && !isSubmitting 
                    ? 'bg-white text-black hover:bg-dot9' 
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
            >
                {isSubmitting ? t.submitting : t.booking}
            </button>
        </div>
    );
};

export default TimeSlotSelector;