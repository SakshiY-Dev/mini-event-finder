import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import "./App.css";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventPage />} />
      </Routes>
    </>
  );
}

export default App;
