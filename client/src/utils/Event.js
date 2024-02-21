import axios from "axios";

const removeEvent = (events, setEvents, year, event_id) => {
  setEvents(
    events.filter((years) => {
      if (years.year === year) {
        years.events = years.events.filter((event) => event._id !== event_id);
      }
      if (years.events.length === 0) {
        return false;
      }
      return years;
    })
  );
};

export const RegisterEvent = async (register) => {
  const { data } = await axios.post("/api/event/register", register);
  return data;
};

export const DeleteEvent = async (events, setEvents, year, event_id) => {
  const { data } = await axios.delete(`/api/event/delete/${event_id}`);
  removeEvent(events, setEvents, year, event_id);
  return data;
};

export const fetchEvents = async (
  controller,
  setEvents,
  toggleLoading,
  removeToken
) => {
  toggleLoading(true);
  try {
    const { data } = await axios.get("/api/event/fetch", {
      signal: controller.signal,
    });
    setEvents(data.data);
  } catch (err) {
    if (err.name === "CanceledError") return;
    if (err.response?.data.name === "Unauthorized") {
      toggleLoading(false);
      return removeToken();
    }
    alert(err.response?.data.message || err.message || err);
  }
  toggleLoading(false);
};

export const updateEvent = async (selectedEditEvent) => {
  const name = selectedEditEvent.name;
  const year = selectedEditEvent.year;
  const id = selectedEditEvent.id;

  const { data } = await axios.put(`/api/event/update/${id}`, { name, year });
  return data;
};
