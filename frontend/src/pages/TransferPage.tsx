import { useEffect, useState } from "react";

interface TransferTickets {
  toUser: string;
  fromUser: string;
  quantity: number;
  transfer_id: number;
}

function TransferPage({ username }: any) {
  const [transferTickets, setTransferTickets] = useState<TransferTickets[]>([]);
  const [replied,setRepliped] = useState(false)

  async function getTransferNotification(): Promise<TransferTickets[]> {
    const response = await fetch(
      `http://localhost:8080/api/tickets/transfer/notification/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        //credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Error to fetch data for transfertickets");
    }
    const data = await response.json();
    console.log(data);
    const json: TransferTickets[] = data.data;
    return json;
  }

  async function replyTransferNotification(status: string, id: number) {
    console.log(status,id)
    const response = await fetch(
      "http://localhost:8080/api/tickets/transfer/response",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          statusChange: status,
          transferId: id,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Could not reply to transfer request");
    }
    setRepliped(true)
  }

  useEffect(() => {
    const getTransfer = async () => {
      const tickets = await getTransferNotification();
      console.log(tickets);
      setTransferTickets(tickets);
    };
    getTransfer();
  }, [replied]);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Deine Anfragen</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transferTickets.map((e, index) => (
            <div
              key={index}
              className="rounded-xl shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="p-4 rounded-xl border-4">
                <div className="flex justify-center items-center">
                  <span className="font-semibold text-lg">{e.fromUser}</span>
                  <span className="font-semibold bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
                    {e.quantity}x
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-black">TicketId:</span>
                  <span>{e.transfer_id}</span>
                </div>
              </div>
              <div className="p-4 flex justify-center gap-4">
                <button
                  className="rounded-xl bg-green-600 p-2 h-25"
                  onClick={() =>
                    replyTransferNotification("transfered", e.transfer_id)
                  }
                >
                  Accept
                </button>
                <button
                  className="rounded-xl bg-red-600 p-2 h-25"
                  onClick={async () =>
                    await replyTransferNotification("cancelled", e.transfer_id)
                  }
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default TransferPage;
