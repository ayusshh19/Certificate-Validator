import axios from "axios";

const Login = async (login, setLogin, setToken) => {
  const { username, password } = login;
  if (!username.trim() || !password.trim()) {
    return setLogin({
      ...login,
      usernameError: !username.trim(),
      passwordError: !password.trim(),
    });
  }
  try {
    const { data } = await axios.post("/api/login", login);
    const token = data.data.accessToken;
    setToken(token);
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
  }
};

const TokenVerify = async (controller, setEvents, toggleLoading) => {
  toggleLoading(true);
  try {
    const { data } = await axios.get("/api/token/verify", {
      signal: controller.signal,
    });
    console.log(data);
    toggleLoading(false);
  } catch (err) {
    if (err.name === "CanceledError") return;
    toggleLoading(false);
    alert(err.response?.data.message || err.message || err);
  }
};

export { Login, TokenVerify };
