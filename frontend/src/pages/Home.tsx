import { useEffect, useState } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import LastChance from "../components/LastChance";

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
      console.log(value.length);
    } else {
      setText("");
    }
  };

  async function getSearchEvents(): Promise<Events[]> {
    console.log("searching...");
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
      if (text === "") {
        return;
      }
      try {
        const events = await getSearchEvents();
        setEvents(events);
        console.log("matching events: ", events);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    getBySearchEvents();
  }, [text]);
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 text-gray-900 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
        <Header
          onInputChange={handleInputChange}
          searchedEvents={events}
        ></Header>

        <Categories></Categories>

        <LastChance></LastChance>
      </div>
    </>
  );
}
export default Home;
