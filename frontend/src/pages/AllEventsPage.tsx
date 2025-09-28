import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Events {
  name: string;
  date: string;
  availableTickets: number;
  price: number;
}

function AllEventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
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
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    getEvents();
  }, []);

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
      <div className="absolute top-0 left-25 right-25">
        <input
          type="text"
          placeholder="Event suchen"
          className="rounded-xl p-2 text-black"
        />
        <button>Search</button>
      </div>
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Alle Konzerte</h2>
        <div className="flex justify-center items-center flex-wrap">
          {eventsList}
        </div>
      </section>
    </>
  );
}
export default AllEventsPage;
