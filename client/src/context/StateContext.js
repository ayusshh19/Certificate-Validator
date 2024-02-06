import React, { useState, createContext, useEffect } from "react";
import { fetchEvents } from "../utils/Event";
import axios from "axios";
import { set } from "mongoose";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("accessToken") ? true : false
  );
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  const toggleLoading = (state) => {
    setLoading(state);
  };

  const setToken = (newToken) => {
    localStorage.setItem("accessToken", newToken);
    setIsLogin(true);
  };

  const removeToken = () => {
    localStorage.removeItem("accessToken");
    setIsLogin(false);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      localStorage.setItem("accessToken", accessToken);
      setIsLogin(true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    const controller = new AbortController();
    fetchEvents(controller, setEvents, toggleLoading, removeToken);
    return () => controller.abort();
  }, [isLogin, fetchFlag]);

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
        setToken,
        removeToken,
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
