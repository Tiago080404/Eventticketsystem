import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export interface Events {
  name: string;
  date: string;
  availableTickets: number;
  price: number;
}
function Home() {
  const [text, setText] = useState("");
  const [events, setEvents] = useState<Events[]>([]);

  const handleInputChange = (value: string) => {
    if (value.length >= 2) {
      setText(value);
      console.log(value.length)
    } else {
      setText("");
    }
  };

  async function getSearchEvents(): Promise<Events[]> {
    console.log("searching...")
    const response = await fetch(
      `http://localhost:8080/api/events/search/${text}`,
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
    const getBySearchEvents = async () => {
      if(text===''){
        return
      }
      try {
        const events = await getSearchEvents();
        setEvents(events)
        console.log("matching events: ",events)
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    getBySearchEvents();
  }, [text]);
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 text-gray-900 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
        <Header onInputChange={handleInputChange} searchedEvents={events}></Header>
        {/*  <div className="flex justify-center flex-wrap">{eventsList}</div> */}
        {text}
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
