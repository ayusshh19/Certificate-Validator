import "./App.css";
import Button from "@mui/material/Button";
import MainScreen from "./pages/MainScreens/MainScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/AuthScreens/Auth";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <div className="App">
      <Router>
        <Routes>
          {isAuth ? (
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
