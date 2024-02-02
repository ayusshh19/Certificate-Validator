import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../config";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    console.log("fetching events");
    (async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/event/fetch`, {
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
