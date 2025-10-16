import { useState } from "react";
import { Link } from "react-router-dom";

type ChildProps = {
  onInputChange: (value: string) => void;
  searchedEvents: Events[];
};
export interface Events {
  name: string;
  date: string;
  availabletickets: number;
  price: number;
}

function Header({ onInputChange, searchedEvents }: ChildProps) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <section className="relative h-[60vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center text-center text-white">
      <div className="absolute top-0 right-0 flex p-6 justify-end gap-6">
        <Link
          to="/transfer"
          className="hover:text-yellow-400 transition-colors font-medium"
        >
          Transfer notification
        </Link>

        <Link
          to="/tickets"
          className="hover:text-yellow-400 transition-colors font-medium"
        >
          Tickets
        </Link>
        <Link
          to="/profile"
          className="hover:text-yellow-400 transition-colors font-medium"
        >
          Profile
        </Link>
      </div>
      <div className="absolute top-24 left-1/2  transform -translate-x-1/2 flex flex-col md:flex-row items-center gap-4 w-[90%] max-w-3xl">
        <input
          type="date"
          className="rounded-xl p-3 w-full md:w-auto text-gray-900 font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="text"
          placeholder="Event suchen"
          value={searchValue}
          className="rounded-xl p-3 w-full md:flex-1 text-gray-900 font-medium shadow-inner border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onChange={(e) => {
            setSearchValue(e.target.value);
            onInputChange(e.target.value);
          }}
        />
        <button className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-xl shadow hover:bg-yellow-400 transition">
          Search
        </button>

        {searchedEvents.length > 0 && (
          <ul className="bg-gray-800 text-white mt-2 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10 w-full md:absolute md:top-16">
            {searchedEvents.map((event, idx) => (
              <li
                key={idx}
                className="p-3 hover:bg-gray-700 cursor-pointer rounded-lg transition"
              >
                <Link to={`/event/${event.name}`} className="block">
                  <div className="font-semibold">{event.name}</div>
                  <div className="text-sm text-gray-400">
                    {event.date} • {event.availabletickets} Tickets ab{" "}
                    {event.price}€
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center text-center mt-24 md:mt-0 px-4">
        <div>
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Finde dein nächstes Event
          </h1>
          <p className="text-lg mb-6 text-gray-300">
            Konzerte, Sport, Theater & mehr – alles an einem Ort
          </p>
          <Link
            to="/events"
            className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-xl shadow hover:bg-yellow-400 transition"
          >
            Alle Events ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Header;
