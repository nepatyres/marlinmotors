import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

const Calendar = ({ onDateClick }: { onDateClick: (date: string) => void }) => {
    const [events, setEvents] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/google-calendar");
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const injectTimeIntoSlots = () => {
            const timeSlots = document.querySelectorAll(
                "td.fc-timegrid-slot.fc-timegrid-slot-lane"
            );
            timeSlots.forEach((slot) => {
                const time = slot.getAttribute("data-time");
                if (time) {
                    const formattedTime = time.split(":").slice(0, 2).join(":");
                    slot.innerHTML = `<div class="time-in-slot" data-time="${time}">${formattedTime}</div>`;
                }
            });

            const timeInSlots = document.querySelectorAll(".time-in-slot");
            timeInSlots.forEach((element) => {
                element.addEventListener("click", () => {
                    const time = element.getAttribute("data-time");
                    if (time) {
                        setSelectedSlot(time);
                    }
                });
            });
        };

        injectTimeIntoSlots();
    }, [events]);

    useEffect(() => {
        const timeInSlots = document.querySelectorAll(".time-in-slot");
        timeInSlots.forEach((element) => {
            const time = element.getAttribute("data-time");
            if (time === selectedSlot) {
                element.classList.add("selected-slot");
            } else {
                element.classList.remove("selected-slot");
            }
        });
    }, [selectedSlot]);

    const today = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(today.getDate() + 14);
    const validRange = {
        start: today.toISOString().split("T")[0],
        end: new Date(twoWeeksFromNow.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    };

    const handleSlotSelect = async (slot: string) => {
        setSelectedSlot(slot);
        const startTime = new Date(slot).toISOString();
        const endTime = new Date(new Date(slot).getTime() + 2 * 60 * 60 * 1000).toISOString();

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
                alert("Booking confirmed!");
                setSelectedSlot(null);
                const updatedEvents = await response.json();
                setEvents(updatedEvents);
            } else {
                console.error("Failed to book slot:", await response.text());
            }
        } catch (error) {
            console.error("Error booking slot:", error);
        }
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            events={events}
            dateClick={(info) => handleSlotSelect(info.dateStr)}
            headerToolbar={{
                start: "prev",
                center: "title",
                end: "next",
            }}
            titleFormat={{ month: 'numeric', year: 'numeric', day: 'numeric' }}
            slotDuration="02:00:00"
            slotMinTime="10:00:00"
            slotMaxTime="18:00:00"
            // nowIndicator={true}
            editable={true}
            selectable={true}
            eventDisplay="block"
            height="auto"
            contentHeight="auto"
            validRange={validRange}
        />
    );
};

export default Calendar;