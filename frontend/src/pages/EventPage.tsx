import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface Event {
  name: string;
  date: string;
  availabletickets: number;
  price: number;
}

function EventPage() {
  const { name } = useParams();
  const [searchedEvent, setEvent] = useState<Event | null>(null);
  async function getEvent() {
    const response = await fetch(`http://localhost:8080/api/events/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Fehler beim Laden");
    }

    const json: Event = await response.json();
    console.log(json);
    return json;
  }

  useEffect(() => {
    const getEventByRender = async () => {
      const fetchedEvent = await getEvent();
      setEvent(fetchedEvent);
    };
    getEventByRender();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-6">
        {!searchedEvent ? (
          <div className="text-gray-500 text-lg">Lade Eventdaten</div>
        ) : (
          <div className="bg-gray-300 rounded-2xl w-96 flex flex-col items-center shadow-lg">
            <h2 className="text-3xl font-bold mb-6">
              {searchedEvent?.name.toLocaleUpperCase()}
            </h2>
            <p className="mb-4 font-bold">{searchedEvent?.date}</p>
            <p className="mb-4 font-bold">
              Verfügbare Tickets: {searchedEvent?.availabletickets}
            </p>
            <p className="mb-4 font-bold">Preis: {searchedEvent?.price}€</p>
            <button className="rounded-xl bg-blue-500 p-1 hover:bg-blue-600 transition cursor-pointer">
              Tickets kaufen
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default EventPage;
