import { useState, useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { fetchCertificates } from "../utils/Certificate";

function useCertificates(event_id) {
  const [certificates, setCertificates] = useState([]);
  const [event, setEvent] = useState("");
  const { removeToken } = useStateContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const data = await fetchCertificates(
          event_id,
          controller,
          setCertificates,
          setEvent
        );
        setCertificates(data.data.certificates || []);
        setEvent(data.data.event || "");
      } catch (err) {
        if (err.name === "CanceledError") return;
        if (err.response?.data.name === "Unauthorized") {
          setLoading(false);
          return removeToken();
        }
        alert(err.response?.data.message || err.message || err);
      }
      setLoading(false);
    })();

    return () => controller.abort();
  }, [event_id]);

  return { certificates, setCertificates, event, loading };
}

export default useCertificates;
