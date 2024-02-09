import axios from "axios";

const removeEvent = async (events, setEvents, year, event_id) => {
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

const editEvent = async (events, setEvents, year, event_id, name) => {
  setEvents(
    events.map((years) => {
      if (years.year === year) {
        years.events = years.events.map((event) => {
          if (event._id === event_id) {
            event.name = name;
          }
          return event;
        });
      }
      return years;
    })
  );
};

export const RegisterEvent = async (
  register,
  setRegister,
  refreshFlag,
  handleClose
) => {
  if (!register.name.trim()) {
    return setRegister({ ...register, nameError: true });
  }
  try {
    await axios.post("/api/event/register", register);
    refreshFlag();
    handleClose();
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
  }
};

export const DeleteEvent = async (
  e,
  events,
  setEvents,
  year,
  event_id,
  toggleLoading
) => {
  e.preventDefault();
  e.stopPropagation();
  if (!window.confirm("Are you sure you want to delete this event?")) return;
  toggleLoading(true);
  try {
    await axios.delete(`/api/event/delete/${event_id}`);
    removeEvent(events, setEvents, year, event_id);
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
  }
  toggleLoading(false);
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

export const updateEvent = async (
  selectedEditEvent,
  register,
  setRegister,
  events,
  setEvents,
  refreshFlag,
  setEditModal
) => {
  const name = selectedEditEvent.name;
  const year = selectedEditEvent.year;
  const id = selectedEditEvent.id;
  if (!name.trim()) {
    return setRegister({ ...register, nameError: true });
  }
  try {
    await axios.put(`/api/event/update/${id}`, { name, year });
    // editEvent(events, setEvents, year, id, name);
    refreshFlag();
    setEditModal(false);
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
  }
};
