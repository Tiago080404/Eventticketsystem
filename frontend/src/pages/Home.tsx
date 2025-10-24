import { useEffect, useState } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import LastChance from "../components/LastChance";
import Login from "../components/Login";

export interface Events {
  name: string;
  date: string;
  availabletickets: number;
  price: number;
}
type authFuncProp = {
  checkAuth: () => void;
  checkLoggedIn: boolean;
  username: string;
};

function Home({ checkAuth, checkLoggedIn, username }: authFuncProp) {
  const [text, setText] = useState("");
  const [events, setEvents] = useState<Events[]>([]);
  const [loggedIn, setLoggedIn] = useState(checkLoggedIn);

  const handleInputChange = (value: string) => {
    if (value.length >= 2) {
      setText(value);
      console.log(value.length);
    } else {
      setText("");
    }
  };

  const handleLoginChange = (value: string) => {
    setLoggedIn(true);
    //setUsername(value);
    checkAuth();
  };

  const handleLogoutChange = () => {
    setLoggedIn(false);
    checkAuth();
  };

  async function getSearchEvents(): Promise<Events[]> {
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
      {loggedIn || checkLoggedIn ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
          <h1>{username}</h1>
          <Header
            onInputChange={handleInputChange}
            searchedEvents={events}
            logoutChange={handleLogoutChange}
          ></Header>

          <Categories></Categories>

          <LastChance></LastChance>
        </div>
      ) : (
        <Login onLoginChange={handleLoginChange}></Login>
      )}
    </>
  );
}
export default Home;
