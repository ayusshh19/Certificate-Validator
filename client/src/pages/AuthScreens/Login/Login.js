import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { StateContext } from "../../../context/StateContext";
import { Login as LoginFunction } from "../../../utils/Index";
import "./Login.css";

const initialState = {
  username: "",
  password: "",
  usernameError: false,
  passwordError: false,
};

const Login = () => {
  const { setToken, toggleLoading } = useContext(StateContext);

  const [login, setLogin] = useState(initialState);

  const handleInputChange = (field, value) => {
    setLogin({
      ...login,
      [field]: value,
      [`${field}Error`]: false,
    });
  };

  return (
    <div className="login">
      <div className="container rounded-4 shadow">
        <div className="text-center">
          <h2>CSI Admin Login</h2>
        </div>
        <div className="container-fluid my-3">
          <Box component="form" noValidate autoComplete="off">
            <div className="row gy-4">
              <div className="d-flex align-items-end">
                <TextField
                  style={{ width: "100%" }}
                  id="standard-basic"
                  label="Username"
                  variant="standard"
                  value={login.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  error={login.usernameError}
                  helperText={
                    login.usernameError ? "Username cannot be empty" : ""
                  }
                />
              </div>
              <div className=" d-flex align-items-end">
                <TextField
                  type="password"
                  style={{ width: "100%" }}
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  value={login.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  error={login.passwordError}
                  helperText={
                    login.passwordError ? "Password cannot be empty" : ""
                  }
                />
              </div>
            </div>
          </Box>
        </div>
        <div className="mt-5 w-100 d-flex align-items-center justify-content-center">
          <Button
            disableElevation
            variant="contained"
            style={{
              borderRadius: "12px",
              padding: "10px 50px",
              width: "100%",
            }}
            onClick={() =>
              LoginFunction(
                login,
                setLogin,
                toggleLoading,
                setToken,
                initialState
              )
            }
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
