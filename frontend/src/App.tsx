import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import "./App.css";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import AllEventsPage from "./pages/AllEventsPage";
import UserTickets from "./pages/UserTickets";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event/:name" element={<EventPage />} />
          <Route path="/events" element={<AllEventsPage />}></Route>
          <Route path="/tickets" element={<UserTickets />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
