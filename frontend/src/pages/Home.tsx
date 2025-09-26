import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

interface Events {
  name: string;
  date: string;
  availableTickets: number;
  price: number;
}

function Home() {
  const [events, setEvents] = useState<Events[]>([]);
  const navigate = useNavigate();
  async function fetchUserEvents(): Promise<Events[]> {
    const response = await fetch("http://localhost:8080/api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Fehler beim Laden");
    }

    let json: Events[] = await response.json();
    return json;
  }

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await fetchUserEvents();
        setEvents(events);
        console.log(events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    getEvents();
  }, []);

  const eventsList = events.map((event, index) => (
    <div
      key={index}
      className="flex flex-col items-center bg-gray-100 p-20 m-3 rounded shadow hover:bg-gray-400 cursor-pointer w-55"
      onClick={() => navigate(`/event/${event.name}`)}
    >
      {event.name}
    </div>
  ));
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 text-gray-900">
        <Header></Header>
        <div className="flex justify-center flex-wrap">{eventsList}</div>
      </div>
    </>
  );
}
export default Home;
