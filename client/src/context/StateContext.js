import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const { data } = await axios.get("/api/event/fetch", {
          signal: controller.signal,
        });
        setEvents(data);
      } catch (err) {
        if (err.name === "CanceledError") return;
        console.log(err);
        alert(err.response?.data.error || err.message || err);
      }
    })();
    return () => controller.abort();
  }, []);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 2; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <StateContext.Provider
      value={{
        isLogin,
        setIsLogin,
        loading,
        setLoading,
        alerts,
        setAlerts,
        events,
        generateYearOptions,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
