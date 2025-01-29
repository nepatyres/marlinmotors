import React, { useEffect, useState } from 'react';

const TimeSlotSelector = ({ setCalPopup, setReservPopup, formData, language, carType, selectedType, services, toggleStates, subtotal, promoCode, sum, selectedOption, toggler, selection}: any) => {
    const [events, setEvents] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const translations = {
        lt: {
            booking: "Užsakyti",
            submitting: "Vykdoma...",
            loading: "Kraunama...",
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
            loading: "Загрузка...",
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

    const t = language ? translations.lt : translations.ru;

    const timeSlots = [
        { start: '10:00', end: '11:00', value: '10:00' },
        { start: '11:00', end: '12:00', value: '11:00' },
        { start: '12:00', end: '13:00', value: '12:00' },
    ];

    useEffect(() => {
        const initializeCalendar = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/google-calendar");
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }

            const now = new Date();
            if (now.getHours() >= 12) {
                const nextDay = new Date(now);
                nextDay.setDate(now.getDate() + 1);
                setSelectedDate(nextDay);
            }
        };

        initializeCalendar();
    }, []);

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

    const formatDate = (date: Date) => {
        if (language) {
            const day = date.getDate();
            const month = (t.months as Record<number, string>)[date.getMonth()];
            const weekday = (t.weekdays as Record<number, string>)[date.getDay()];
            return `${weekday}, ${month} ${day} d.`;
        }
        return date.toLocaleDateString('ru-RU', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
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
            handleSubmit();
            if (response.ok) {
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
                promoCode, sum, selectedOption, toggler, selection, selectedDate, selectedSlot
            };

            const response = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });
            const result = await response.json();
        } catch (error) {
            console.log('something wrong');
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-full mx-auto bg-black p-4 rounded-lg flex items-center justify-center">
                <div className="text-white text-lg">{t.loading}</div>
            </div>
        );
    }

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