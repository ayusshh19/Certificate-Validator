import axios from "axios";
import dayjs from "dayjs";

const removeCertificate = async (
  certificates,
  setCertificates,
  certificate_id
) => {
  setCertificates(
    certificates.filter((certificate) => certificate._id !== certificate_id)
  );
};

const editCertificate = async (
  certificates,
  setCertificates,
  newCertificate
) => {
  setCertificates(
    certificates.map((certificate) => {
      if (certificate._id === newCertificate.id) {
        return {
          ...certificate,
          name: newCertificate.name,
          position: newCertificate.position,
        };
      }
      return certificate;
    })
  );
};

export const RegisterCertificate = async (
  register,
  setRegister,
  initialState,
  toggleLoading
) => {
  toggleLoading(true);
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
  toggleLoading(false);
};

export const DeleteCertificate = async (
  certificate_id,
  certificates,
  setCertificates,
  toggleLoading
) => {
  toggleLoading(true);
  try {
    await axios.delete(`/api/certificate/delete/${certificate_id}`);
    removeCertificate(certificates, setCertificates, certificate_id);
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
  }
  toggleLoading(false);
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

export const UpdateCertificate = async (
  certificates,
  setCertificates,
  newCertificate,
  setEditModal,
  toggleLoading
) => {
  toggleLoading(true);
  try {
    await axios.put(`/api/certificate/update/${newCertificate.id}`, {
      name: newCertificate.name,
      position: newCertificate.position,
    });
    editCertificate(certificates, setCertificates, newCertificate);
    setEditModal(false);
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
  }
  toggleLoading(false);
};
export const AuthCertificate = async (
  uid,
  toggleLoading,
  setCertificateData
) => {
  toggleLoading(true);
  try {
    const { data } = await axios.get(`/api/certificate/verify/${uid}`);
    toggleLoading(false);
    setCertificateData(data.data);
    return data.data;
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
  }
  toggleLoading(false);
};
