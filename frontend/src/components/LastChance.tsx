import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Events {
  name: string;
  date: string;
  availabletickets: number;
  price: number;
}

function LastChance() {
  const [lastChanceEvents, setLastChanceEvents] = useState<Events[]>([]);

  async function getLastChanceEvents(): Promise<Events[]> {
    const response = await fetch(
      "http://localhost:8080/api/events/lastchance",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Fehler beim Laden");
    }

    const json: Events[] = await response.json();
    return json;
  }

  useEffect(() => {
    const getLastChance = async () => {
      const events = await getLastChanceEvents();
      setLastChanceEvents(events);
    };
    getLastChance();
  }, []);

  console.log(lastChanceEvents);
  return (
    <>
      <section className="relative h-[60vh] bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex items-center justify-center text-center text-white">
        <div className="relative max-w-6xl mx-auto">

          <h1 className="text-2xl font-bold mb-6 text-white">Letzte Chance</h1>
          <div className="grid grid-flow-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {lastChanceEvents.map((ele) => (
              <div
                key={ele.name}
                className="bg-white rounded-2xl shadow p-16 text-center hover:shadow-lg transition cursor-pointer"
              >
                <div className="p-4">
                  <h3 className="text-lg font-bold text-black">{ele.name}</h3>
                  <p className="font-bold text-sm text-gray-500">{ele.date}</p>
                  <p className="font-bold text-sm text-gray-500">
                    {ele.price}€
                  </p>
                  <p className="font-bold text-sm text-gray-500">
                    {ele.availabletickets} Tickets available
                  </p>
                  <Link
                    to={`/event/${ele.name}`}
                    className="px-4 py-2 rounded-xl bg-purple-600 mt-3 p-1 inline-block text-white hover:bg-purple-700 transition"
                  >
                    Tickets
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default LastChance;
