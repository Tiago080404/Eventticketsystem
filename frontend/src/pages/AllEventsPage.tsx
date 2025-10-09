import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Events {
  name: string;
  date: string;
  availableTickets: number;
  price: number;
}

function AllEventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [allEvents, setAllEvents] = useState<Events[]>([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  async function getAllEvents(): Promise<Events[]> {
    const response = await fetch("http://localhost:8080/api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Fehler beim Laden");
    }

    const json: Events[] = await response.json();
    return json;
  }

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await getAllEvents();
        setEvents(events);
        setAllEvents(events);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    const filterEvents = () => {
      if (value === "") {
        setEvents(allEvents);
      } else {
        let filteredEvents = events.filter((event) =>
          event.name.toLowerCase().includes(value.toLowerCase())
        );
        setEvents(filteredEvents);
      }
    };
    filterEvents();
  }, [value]);

  const eventsList = events.map((event, index) => (
    <div
      key={index}
      className="flex flex-col items-center hover:scale-105 transform transition bg-gray-100 p-20 m-3 rounded-2xl shadow-xl cursor-pointer w-55 h-58"
      onClick={() => navigate(`/event/${event.name}`)}
    >
      <h3 className="text-2xl font-bold mb-6">{event.name}</h3>
      <p className="text-xl font-bold">{event.price}€</p>
      <p className="text-xl font-bold">Am {event.date}</p>
    </div>
  ));

  return (
    <>
      {/* justify center flex */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Event suchen"
            className="rounded-xl p-3 w-64 m-3 text-gray-900 font-medium shadow-inner border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-xl shadow hover:bg-yellow-400 transition">
            Search
          </button>
        </div>
        <section className="py-12 px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">Alle Konzerte</h2>
          <div className="flex justify-center items-center flex-wrap">
            {eventsList}
          </div>
        </section>
      </div>
    </>
  );
}
export default AllEventsPage;
