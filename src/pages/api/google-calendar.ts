import { google } from "googleapis";
import fs from "fs";
import path from "path";

const credentialsPath = path.resolve("./config/service-account.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ["https://www.googleapis.com/auth/calendar"]
);

const calendar = google.calendar({ version: "v3", auth });

export default async function handler(req, res) {
    const calendarId = "marlinmotorslt@gmail.com";
    const timeZone = "Europe/Vilnius";

    if (req.method === "GET") {
        try {
            const response = await calendar.events.list({
                calendarId,
                timeMin: new Date().toISOString(),
                maxResults: 50,
                singleEvents: true,
                orderBy: "startTime",
            });

            const events = response.data.items.map((event) => ({
                title: event.summary,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date,
            }));

            res.status(200).json(events);
        } catch (error) {
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "Failed to fetch events" });
        }
    } else if (req.method === "POST") {
        const { start, end, summary } = req.body;

        try {
            const event = {
                summary,
                start: { dateTime: start, timeZone },
                end: { dateTime: end, timeZone },
            };

            await calendar.events.insert({
                calendarId,
                resource: event,
            });

            const response = await calendar.events.list({
                calendarId,
                timeMin: new Date().toISOString(),
                maxResults: 50,
                singleEvents: true,
                orderBy: "startTime",
            });

            const updatedEvents = response.data.items.map((event) => ({
                title: event.summary,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date,
            }));

            res.status(201).json(updatedEvents);
        } catch (error) {
            console.error("Error creating event:", error);
            res.status(500).json({ error: "Failed to create event" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
