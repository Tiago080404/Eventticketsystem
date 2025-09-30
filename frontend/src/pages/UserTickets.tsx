import { useEffect, useState } from "react";
import type { Events } from "./AllEventsPage";

interface Tickets {
  ticketId: number;
  events: Events;
  user: User;
  quantity: number;
  purchased_at: string;
  ticketUUID: string;
}

interface User {
  email: string;
  password: string;
  role: string;
}

function UserTickets() {
  const [tickets, setTickets] = useState<Tickets[]>([]);

  async function getUserTickets(): Promise<Tickets[]> {
    const response = await fetch(
      "http://localhost:8080/api/tickets/user/alice@example.com",
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

    const json: Tickets[] = await response.json();
    console.log(json);
    return json;
  }

  useEffect(() => {
    const getTickets = async () => {
      try {
        const events = await getUserTickets();
        setTickets(events);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    getTickets();
  }, []);

  const ticketList = tickets.map((ticket, index) => (
    <div key={index}>
      <h3>{ticket.events.name}</h3>
    </div>
  ));
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 p-6">
        <h2 className="text-3xl font-bold mb-6">🎟️ Deine Tickets</h2>
        {tickets.length === 0 ? (
          <p className="text-gray-500">Du hast noch keine Tickets</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="p-4 rounded-xl border-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">
                      {ticket.events.name}
                    </span>
                    <span className="font-semibold bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
                      {ticket.quantity}x
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{ticket.events.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{ticket.user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>KaufDatum {ticket.purchased_at}</span>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <button className="bg-blue-400 rounded-xl p-1 text-black hover:scale-105 transform transition cursor-pointer">
                    See Your Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default UserTickets;
