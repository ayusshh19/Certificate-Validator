import axios from "axios";
import dayjs from "dayjs";

export const RegisterCertificate = async (
  register,
  setRegister,
  initialState,
  toggleLoading
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
  toggleLoading(true);
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
  toggleLoading(false);
};

export const DeleteCertificate = async (certificate_id) => {
  const { data } = await axios.delete(
    `/api/certificate/delete/${certificate_id}`
  );
  return data;
};

export const fetchCertificates = async (event_id, controller) => {
  const token = localStorage.getItem("accessToken");
  const { data } = await axios.get(`/api/certificate/fetch/event/${event_id}`, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const UpdateCertificate = async (newCertificate) => {
  const { data } = await axios.put(
    `/api/certificate/update/${newCertificate.id}`,
    {
      name: newCertificate.name,
      position: newCertificate.position,
    }
  );
  return data;
};

export const AuthCertificate = async (
  controller,
  uid,
  toggleLoading,
  setCertificateData,
  navigate,
  startConfetti
) => {
  toggleLoading(true);
  try {
    const { data } = await axios.get(`/api/certificate/verify/${uid}`, {
      signal: controller.signal,
    });
    setCertificateData(data.data);
    data.data?.position !== 0 &&
      setTimeout(() => {
        startConfetti();
      }, 500);
  } catch (err) {
    if (err.name === "CanceledError") return;
    alert(err.response?.data.message || err.message || err);
    navigate(-1);
  }
  toggleLoading(false);
};
