import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";

const RegisterCertificate = async (register, setRegister, initialState) => {
  const { name, position, event } = register;
  if (!name.trim() || !position.trim() || !event.trim()) {
    setRegister({
      ...register,
      nameError: !name.trim(),
      positionError: !position.trim(),
      eventError: !event.trim(),
    });
    return;
  }
  try {
    await axios.post("/api/certificate/register", {
      ...register,
      date: dayjs(register.date).format("YYYY-MM-DD"),
      event_id: register.event,
    });
    setRegister(initialState);
  } catch (err) {
    alert(err.response?.data.error || err.message || err);
  }
};

const DeleteCertificate = async (certificate_id, refreshCertificatesFlag) => {
  try {
    await axios.delete(`/api/certificate/delete/${certificate_id}`);
    refreshCertificatesFlag();
  } catch (err) {
    console.log(err);
    alert(err.response?.data.error || err.message || err);
  }
};

const fetchCertificates = async (
  event_id,
  controller,
  setCertificates,
  setEvent
) => {
  try {
    const { data } = await axios.get(
      `/api/certificate/fetch/event/${event_id}`,
      {
        signal: controller.signal,
      }
    );
    setCertificates(data.certificates || []);
    setEvent(data.event || "");
  } catch (err) {
    if (err.name === "CanceledError") return;
    alert(err.response?.data.error || err.message || err);
  }
};

export { RegisterCertificate, DeleteCertificate, fetchCertificates };
