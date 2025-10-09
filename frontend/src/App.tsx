import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import "./App.css";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import AllEventsPage from "./pages/AllEventsPage";
import UserTickets from "./pages/UserTickets";
import { useEffect, useState } from "react";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  async function checkAuth() {
    try {
      console.log("checkauth läuft");
      const response = await fetch("http://localhost:8080/api/auth/check", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        setLoggedIn(false);
        setUsername("");
        setAuthChecked(true);
        return;
      }
      const data = await response.json();
      setLoggedIn(true);
      console.log(data)
      setUsername(data.email);
    } catch (error) {
      console.error("Fehler bei checkAuth", error);
      setLoggedIn(false);
      setUsername("");
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);
  if (!authChecked) {//dann wird das andere erst gar nicht gerendert(die routes)
    return (
      <div className="text-white text-center mt-10">
        Checking authentication...
      </div>
    );
  }
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home checkAuth={checkAuth} checkLoggedIn={loggedIn} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/event/:name"
            element={
              <ProtectedRoutes loggedIn={loggedIn}>
                {" "}
                <EventPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoutes loggedIn={loggedIn}>
                <AllEventsPage />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/tickets"
            element={
              <ProtectedRoutes loggedIn={loggedIn}>
                <UserTickets useremail={username} />
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
