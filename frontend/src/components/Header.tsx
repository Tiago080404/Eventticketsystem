import { useState } from "react";
import { Link } from "react-router-dom";

type ChildProps = {
  onInputChange: (value: string) => void;
};

function Header({ onInputChange }: ChildProps) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <section className="relative h-[60vh] bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex items-center justify-center text-center text-white">
      <div className="absolute top-0 right-0 flex p-6 justify-end gap-6">
        <Link to="/tickets" className="hover:text-yellow-300 transition-colors">
          Tickets
        </Link>
        <Link to="/profile" className="hover:text-yellow-300 transition-colors">
          Profile
        </Link>
      </div>
      <div className="absolute top-0 left-25 right-25">
        <input type="date" className="text-black rounded-xl p-2" />
        <input
          type="text"
          placeholder="Event suchen"
          value={searchValue}
          className="rounded-xl p-2 text-black border-solid border-blue-400 border-4"
          onChange={(e) => {
            setSearchValue(e.target.value);
            onInputChange(e.target.value);
          }}
        />
        {searchValue}
        <button className="">Search</button>
      </div>

      <div className="flex flex-1 items-center justify-center text-center">
        <div>
          <h1 className="text-5xl font-extrabold mb-4">
            Finde dein nächstes Event
          </h1>
          <p className="text-lg mb-6">
            Konzerte, Sport, Theater & mehr – alles an einem Ort
          </p>
          <Link
            to="/events"
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
          >
            Alle Events ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Header;
