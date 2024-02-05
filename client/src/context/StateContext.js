import React, { useState, createContext, useEffect } from "react";
import { fetchEvents } from "../utils/Event";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  const toggleLoading = (state) => {
    setLoading(state);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchEvents(controller, setEvents, toggleLoading);
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
    setFetchFlag((prev) => !prev);
  };

  const toggleMobileNav = (state) => {
    setMobileNav(state);
  };

  const positionOption = [
    { name: "Participant", value: "0" },
    { name: "Winner", value: "1" },
    { name: "1st Runner-Up", value: "2" },
    { name: "2nd Runner-Up", value: "3" },
  ];

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
        toggleMobileNav,
        mobileNav,
        toggleLoading,
        positionOption,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
