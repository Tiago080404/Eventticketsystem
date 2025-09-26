import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

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
      className="flex flex-col items-center bg-gray-100 p-20 m-3 rounded-2xl shadow-xl hover:bg-gray-400 cursor-pointer w-55 h-58"
      onClick={() => navigate(`/event/${event.name}`)}
    >
      {event.name}
    </div>
  ));
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 text-gray-900">
        <Header></Header>
        {/*  <div className="flex justify-center flex-wrap">{eventsList}</div> */}

        <section className="py-12 px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Kategorien</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Konzerte", "Sport", "Theater", "Festivals"].map((cat) => (
              <div
                key={cat}
                className=" bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow p-6 text-center hover:scale-105 transform transition cursor-pointer"
              >
                <span className="text-xl font-semibold">{cat}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className=" py-12 px-6 w-full h-[60vh] bg-cover bg-center relative"
          style={{
            backgroundImage: "url('https://picsum.photos/600/300?random=1')",
          }}
        >
          <div className="relative max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-white">
              Letzte Chance
            </h1>

            <div className="grid grid-flow-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3].map((event) => (
                <div
                  key={event}
                  className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={`https://picsum.photos/600/300?random=${event}`}
                    alt="Event"
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-bold">Konzert #{event}</h3>
                    <p className="font-bold text-sm text-gray-500">
                      2025.09.22
                    </p>
                    <Link
                      to="/event"
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
      </div>
    </>
  );
}
export default Home;
