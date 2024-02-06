import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const setToken = (newToken) => {
    setAccessToken(newToken);
  };

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      localStorage.setItem("accessToken", accessToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const toggleLoading = (state) => {
    setLoading(state);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        loading,
        setLoading,
        alerts,
        setAlerts,
        accessToken,
        setToken,
        toggleLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
