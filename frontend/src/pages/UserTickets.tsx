import { useEffect, useState } from "react";
import type { Events } from "./AllEventsPage";
import { QRCodeSVG } from "qrcode.react";

interface Tickets {
  ticketId: number;
  events: Events;
  user: User;
  quantity: number;
  purchased_at: string;
  ticket_UUID: string;
}

interface User {
  email: string;
  password: string;
  role: string;
}
function UserTickets({ useremail }: any) {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [qrCode, setQrCode] = useState(false);
  const [activeTicket, setActiveTicket] = useState<string | null>(null);
  const [transferTicket, setTransferTicket] = useState(false);

  async function getUserTickets(): Promise<Tickets[]> {
    console.log(useremail);
    const response = await fetch(
      `http://localhost:8080/api/tickets/user/${useremail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        //credentials:"include"
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

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <h2 className="text-3xl font-bold mb-6 text-white">🎟️ Deine Tickets</h2>
        {tickets.length === 0 ? (
          <p className="text-white">Du hast noch keine Tickets</p>
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
                  <button
                    className="bg-blue-400 rounded-xl p-1 text-black hover:scale-105 transform transition cursor-pointer"
                    onClick={() => {
                      setQrCode(!qrCode);
                      setActiveTicket(ticket.ticket_UUID);
                    }}
                  >
                    See TicketCode
                  </button>
                  <button
                    className="bg-blue-400 rounded-xl p-1 text-black hover:scale-105 transform transition cursor-pointer"
                    onClick={() => {
                      setTransferTicket(!transferTicket);
                      setActiveTicket(ticket.ticket_UUID);
                    }}
                  >
                    Transfer
                  </button>
                </div>
                {transferTicket && activeTicket === ticket.ticket_UUID ? (
                  <div className="fixed inset-0 bg-black rounded-xl z-50 bg-opacity-50 flex justify-center items-center">
                    <div className="p-24 w-80 bg-black h-50 flex justify-end items-center flex-col">
                      <p className="text-yellow-400">
                        Want to transfer your Ticket
                      </p>
                      <input
                        type="text"
                        placeholder="Enter Name"
                        className="rounded-xl p-3 w-64 m-3 text-gray-900 font-medium shadow-inner border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <button className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-xl shadow hover:bg-yellow-400 transition">
                        Transfer
                      </button>
                    </div>
                  </div>
                ) : null}
                {activeTicket === ticket.ticket_UUID && qrCode ? (
                  <div className="mt-4 flex justify-center">
                    <QRCodeSVG
                      value={ticket.ticket_UUID}
                      size={128}
                    ></QRCodeSVG>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default UserTickets;
