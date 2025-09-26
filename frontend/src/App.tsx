import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import "./App.css";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event/:name" element={<EventPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
