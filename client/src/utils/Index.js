import axios from "axios";

const Login = async (
  login,
  setLogin,
  toggleLoading,
  setToken,
  initialState
) => {
  const { username, password } = login;
  if (!username.trim() || !password.trim()) {
    return setLogin({
      ...login,
      usernameError: !username.trim(),
      passwordError: !password.trim(),
    });
  }
  toggleLoading(true);
  try {
    const { data } = await axios.post("/api/login", login);
    const token = data.data.accessToken;
    if (!token) {
      throw new Error("Invalid token");
    }
    setToken(token);
    setLogin(initialState);
  } catch (err) {
    alert(err.response?.data.message || err.message || err);
  }
  toggleLoading(false);
};

export { Login };
