import { useState } from "react";
type ChildProps = {
  onLoginChange: () => void;
};
function Login({onLoginChange}: ChildProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Fehler beim Login");
      }

      const data = await response.json();
      console.log(data);
      onLoginChange();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-6">
        <div className="cursor-pointer shadow-lg bg-slate-300 p-60 rounded-2xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-center font-bold mb-4">Login</h1>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="password"
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={login}
              className="bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
