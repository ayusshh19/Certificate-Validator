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

export { Login };
