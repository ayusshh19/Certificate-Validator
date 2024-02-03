import React, { useState, createContext, useEffect } from "react";
import { fetchEvents } from "../utils/Event";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchEvents(controller, setEvents);
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
