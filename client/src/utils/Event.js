import axios from "axios";

const RegisterEvent = async (
  register,
  setRegister,
  refreshFlag,
  handleClose
) => {
  if (!register.name.trim()) {
    setRegister({ ...register, nameError: true });
    return;
  }
  try {
    await axios.post("/api/event/register", register);
    refreshFlag();
    handleClose();
  } catch (err) {
    alert(err.response?.data.error || err.message || err);
  }
};

const DeleteEvent = async (e, event_id, refreshFlag) => {
  e.preventDefault();
  e.stopPropagation();
  if (!window.confirm("Are you sure you want to delete this event?")) return;
  try {
    await axios.delete(`/api/event/delete/${event_id}`);
    refreshFlag();
  } catch (err) {
    alert(err.response?.data.error || err.message || err);
  }
};

const fetchEvents = async (controller, setEvents) => {
  try {
    const { data } = await axios.get("/api/event/fetch", {
      signal: controller.signal,
    });
    setEvents(data);
  } catch (err) {
    if (err.name === "CanceledError") return;
    alert(err.response?.data.error || err.message || err);
  }
};

const updateEvent = async (
  selectedEditEvent,
  register,
  setRegister,
  refreshFlag,
  setEditModal
) => {
  const name = selectedEditEvent.name;
  const year = selectedEditEvent.year;
  const id = selectedEditEvent.id;
  if (!name.trim()) {
    setRegister({ ...register, nameError: true });
    return;
  }
  try {
    await axios.put(`/api/event/update/${id}`, { name, year });
    refreshFlag();
    setEditModal(false);
  } catch (err) {
    alert(err.response?.data.error || err.message || err);
  }
};

export { RegisterEvent, DeleteEvent, fetchEvents, updateEvent };
