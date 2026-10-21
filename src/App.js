const BUILD_TAG = "wn-1726";
/* eslint-disable import/first */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/data/events.json", { signal: controller.signal })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError("Không tải được dữ liệu");
        setLoading(false);
      });
  }, []);

  const addEvent = (data) => {
    const maxId = events.reduce((max, e) => (e.id > max ? e.id : max), 0);
    setEvents((prev) => [...prev, { ...data, id: maxId + 1, registered: 0 }]);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const registerEvent = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id && e.registered < e.capacity
          ? { ...e, registered: e.registered + 1 }
          : e
      )
    );
  };

  return (
    <div data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout loading={loading} error={error} />}>
          <Route index element={<Home />} />
          <Route
            path="events"
            element={
              <EventList
                events={events}
                onDelete={deleteEvent}
                onRegister={registerEvent}
              />
            }
          />
          <Route path="events/new" element={<AddEvent onAdd={addEvent} />} />
          <Route path="events/:id" element={<EventDetail events={events} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
