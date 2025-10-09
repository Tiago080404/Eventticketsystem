import { useState } from "react";
type ChildProps = {
  onLoginChange: (value: string) => void;
};
function Login({ onLoginChange }: ChildProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Fehler beim Login");
      }

      const data = await response.json();
      onLoginChange(data.user.username);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center p-6">
        <div className="cursor-pointer shadow-2xl bg-gray-900/80 p-12 rounded-2xl border border-gray-700 backdrop-blur-md">
          <div className="flex flex-col gap-6 text-gray-200">
            <h1 className="text-3xl text-center font-bold mb-4 text-white tracking-wide">
              Login
            </h1>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-100"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-100"
            />

            <button
              onClick={login}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-md transition transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30"
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
