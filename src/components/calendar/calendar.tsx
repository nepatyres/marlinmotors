import React, { useEffect, useState } from 'react';

interface TimeSlotSelectorProps {
    isLithuanian?: boolean;
}

const TimeSlotSelector = ({ isLithuanian = false }: TimeSlotSelectorProps) => {
    const [events, setEvents] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Translations
    const translations = {
        lt: {
            booking: "Užsakyti",
            submitting: "Vykdoma...",
            bookingConfirmed: "Rezervacija patvirtinta!",
            bookingFailed: "Nepavyko rezervuoti laiko. Bandykite dar kartą.",
            errorOccurred: "Įvyko klaida. Bandykite dar kartą.",
        },
        ru: {
            booking: "Забронировать",
            submitting: "Обработка...",
            bookingConfirmed: "Бронирование подтверждено!",
            bookingFailed: "Не удалось забронировать. Попробуйте еще раз.",
            errorOccurred: "Произошла ошибка. Попробуйте еще раз.",
        }
    };

    const t = isLithuanian ? translations.lt : translations.ru;

    const timeSlots = Array.from({ length: 4 }, (_, index) => {
        const startHour = 10 + (index * 2);
        const endHour = startHour + 2;
        return {
            start: `${startHour.toString().padStart(2, '0')}:00`,
            end: `${endHour.toString().padStart(2, '0')}:00`,
            value: `${startHour.toString().padStart(2, '0')}:00`
        };
    });

    useEffect(() => {
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
        
        if (prevDate >= new Date().setHours(0,0,0,0)) {
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
        return date.toLocaleDateString(isLithuanian ? 'lt-LT' : 'ru-RU', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
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
        const endTime = new Date(bookingDate.getTime() + 2 * 60 * 60 * 1000).toISOString();

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
                const updatedEvents = await response.json();
                setEvents(updatedEvents);
                setSelectedSlot(null);
                alert(t.bookingConfirmed);
            } else {
                alert(t.bookingFailed);
            }
        } catch (error) {
            console.error("Error booking slot:", error);
            alert(t.errorOccurred);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-full mx-auto bg-black p-4 rounded-lg">
            <div className="flex items-center justify-between mb-6 px-2">
                <button onClick={handlePrevDay} disabled={selectedDate <= new Date().setHours(0,0,0,0)} className={` p-2 rounded-md transition-colors duration-200 ${selectedDate <= new Date().setHours(0,0,0,0)? 'bg-gray-700 text-gray-400 cursor-not-allowed': 'bg-gray-800 text-white hover:bg-gray-700'}`}>{'<'}</button>
                <div className="text-white text-lg font-medium px-4 text-center"> {formatDate(selectedDate)}</div>
                <button onClick={handleNextDay} disabled={isMaxDateReached()} className={` p-2 rounded-md transition-colors duration-200 ${isMaxDateReached()? 'bg-gray-700 text-gray-400 cursor-not-allowed': 'bg-gray-800 text-white hover:bg-gray-700'}`}>{'>'}</button>
            </div>

            <div className="space-y-2">
                {timeSlots.map((slot) => (
                    <div key={slot.value} onClick={() => handleSlotSelect(slot.value)} className={`p-4 rounded-md cursor-pointer transition-colors duration-200 ${isTimeSlotBooked(slot.value) ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : selectedSlot === slot.value ? 'bg-indigo-600 text-white': 'bg-gray-800 text-white hover:bg-gray-700'}`}>
                        {slot.start} - {slot.end}
                    </div>
                ))}
            </div>
            
            <button  onClick={handleBooking} disabled={!selectedSlot || isSubmitting} className={` w-full mt-4 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${selectedSlot && !isSubmitting ? 'bg-indigo-600 text-white hover:bg-indigo-700': 'bg-gray-600 text-gray-300 cursor-not-allowed' }`}>
                {isSubmitting ? t.submitting : t.booking}
            </button>
        </div>
    );
};

export default TimeSlotSelector;