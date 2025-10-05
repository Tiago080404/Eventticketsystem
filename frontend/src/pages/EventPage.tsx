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
  const [buyPopup, setBuyPopup] = useState(false);
  const [amount, setAmount] = useState("");

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

  function changePopUp() {
    setBuyPopup(!buyPopup);
  }

  async function buyTicket() {
    //vllt try catch bauen
    const response = await fetch(
      `http://localhost:8080/api/events/${name}/buy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "alice@example.com",
          amount: amount,
          moneypaid: Number(amount) * searchedEvent?.price,
        }),
      }
    );
    const data = response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error("Fehler beim Kaufen");
    }
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
            <button
              className="rounded-xl bg-blue-500 p-1 hover:bg-blue-600 transition cursor-pointer"
              onClick={changePopUp}
            >
              Tickets kaufen
            </button>
          </div>
        )}
        {buyPopup ? (
          <div className="fixed inset z-50 flex justify-center items-center">
            <div className="relative rounded-2xl bg-white text-center p-10 w-[28rem] max-w-[90%] h-[15rem] max-h-[90%]">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                onClick={changePopUp}
              >
                X
              </button>
              <h1 className="text-xl font-bold mb-4">Tickets kaufen</h1>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                onClick={buyTicket}
              >
                Kaufen
              </button>
              <input
                value={amount}
                type="number"
                className="rounded-xl bg-slate-200 w-10"
                max={8}
                onChange={(e) => setAmount(e.target.value)}
                min={0}
              />
              <p className="font-bold">
                Preis: {Number(amount) * searchedEvent?.price}
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
export default EventPage;
