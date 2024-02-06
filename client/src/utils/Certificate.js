import axios from "axios";
import dayjs from "dayjs";

const removeCertificate = (certificates, setCertificates, certificate_id) => {
  setCertificates(
    certificates.filter((certificate) => certificate._id !== certificate_id)
  );
};

const editCertificate = (certificates, setCertificates, certificate) => {
  setCertificates(
    certificates.map((c) =>
      c._id === certificate._id ? { ...c, ...certificate } : c
    )
  );
};

export const RegisterCertificate = async (
  register,
  setRegister,
  initialState
) => {
  const { name, position, event } = register;
  if (!name.trim() || !position.trim() || !event.trim()) {
    return setRegister({
      ...register,
      nameError: !name.trim(),
      positionError: !position.trim(),
      eventError: !event.trim(),
    });
  }
  try {
    await axios.post("/api/certificate/register", {
      ...register,
      date: dayjs(register.date).format("YYYY-MM-DD"),
      event_id: register.event,
    });
    setRegister(initialState);
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
  }
};

export const DeleteCertificate = async (
  certificate_id,
  certificates,
  setCertificates,
  refreshFlag
) => {
  try {
    removeCertificate(certificates, setCertificates, certificate_id);
    await axios.delete(`/api/certificate/delete/${certificate_id}`);
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
    refreshFlag();
  }
};

export const fetchCertificates = async (
  event_id,
  controller,
  setCertificates,
  setEvent,
  toggleLoading,
  removeToken
) => {
  toggleLoading(true);
  try {
    const { data } = await axios.get(
      `/api/certificate/fetch/event/${event_id}`,
      {
        signal: controller.signal,
      }
    );
    setCertificates(data.data.certificates || []);
    setEvent(data.data.event || "");
    toggleLoading(false);
  } catch (err) {
    toggleLoading(false);
    if (err.name === "CanceledError") return;
    if (err.response?.data.name === "Unauthorized") {
      return removeToken();
    }
    alert(err.response?.data.message || err.message || err);
  }
};
