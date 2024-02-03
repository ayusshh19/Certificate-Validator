import "./App.css";
import Button from "@mui/material/Button";
import MainScreen from "./pages/MainScreens/MainScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/AuthScreens/Auth";
import { useContext, useState } from "react";
import { StateContext } from "./context/StateContext";

function App() {
  const { loading, isLogin } = useContext(StateContext);

  return (
    <div className="App">
      {loading && (
        <div className="loading-screen">
          <div className="loader"></div>
        </div>
      )}
      <Router>
        <Routes>
          {isLogin ? (
            <Route path="/*" element={<MainScreen />} />
          ) : (
            <Route path="/*" element={<Auth />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
