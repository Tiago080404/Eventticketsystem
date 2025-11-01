import { useEffect, useState } from "react";

type UserData = {
  username: string;
  name: string;
  date: Date;
  availableTickets: number;
  price: number;
};

function Profile() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [user, setUser] = useState("");

  async function fetchUserData(): Promise<UserData[]> {
    const response = await fetch(
      "http://localhost:8080/api/auth/userdata/bob@example.com", //hier noch der richtige user
      {
        method: "GET",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Fehler beim Login");
    }
    const data: UserData[] = await response.json();
    setUser(data[0].username);
    return data;
  }

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <header className="flex flex-col items-center justify-center py-12 space-y-3">
          <div className="text-5xl font-bold text-indigo-400">👤</div>
          <h1 className="text-3xl font-bold">Profil von {user || "..."}</h1>
          <p className="text-gray-400">Hier findest du deine alten Events</p>
        </header>
        {/*   {userData.map((user, index) => (
          <div key={index} className="text-white">
            <div>{user.name}</div>
            <div>{user.price}</div>
          </div>
        ))} */}

        <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {userData.length === 0 ? (
            <p className="text-center text-gray-400 col-span-2">
              Keine alten Events gefunden...
            </p>
          ) : (
            userData.map((event, index) => (
              <div
                key={index}
                className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold text-indigo-400">
                    {event.name}
                  </h2>
                  <span className="text-sm text-gray-400">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
}
export default Profile;
