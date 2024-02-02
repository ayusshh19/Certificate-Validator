import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(true);

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
  }, [fetchFlag]);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 2; i++) {
      years.push(i);
    }
    return years;
  };

  const refreshFlag = () => {
    setFetchFlag(!fetchFlag);
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
        refreshFlag,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
