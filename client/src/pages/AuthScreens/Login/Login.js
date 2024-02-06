import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Login as LoginFunction } from "../../../utils/Index";
import { StateContext } from "../../../context/StateContext";

const Login = () => {
  const { setToken } = useContext(StateContext);

  const [login, setLogin] = useState({
    username: "csi",
    password: "password",
    usernameError: false,
    passwordError: false,
  });
  return (
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={() => LoginFunction(login, setLogin, setToken)}>
          Login
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Login;
