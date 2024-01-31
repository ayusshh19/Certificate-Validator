import "./App.css";
import Button from "@mui/material/Button";
import MainScreen from "./pages/MainScreens/MainScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<MainScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
