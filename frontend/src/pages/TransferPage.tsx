import { useEffect } from "react";

function TransferPage({ username }: any) {
  
  
    async function getTransferNotification() {
    const response = await fetch("", {
      method: "GET",
    });
  }

  useEffect(() => {
    const getTransfer = async () => {
      const tickets = await getTransferNotification();
    };
  });

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Deine Anfragen</h2>
        </div>
      </div>
    </>
  );
}
export default TransferPage;
