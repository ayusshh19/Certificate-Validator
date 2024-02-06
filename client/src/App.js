import "./App.css";
import MainScreen from "./pages/MainScreens/MainScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/AuthScreens/Auth";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { loading, isLogin } = useContext(AuthContext);

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
