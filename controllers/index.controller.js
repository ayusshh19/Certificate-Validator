const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE, USERNAME, PASSWORD } = require("../config");
const ApiError = require("../utils/ApiError");

const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username !== USERNAME || password !== PASSWORD)
      throw new ApiError("Invalid credentials", 400);
    const token = await jwt.sign({ username, password }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    res.send({
      message: "Login successful",
      authorization: token,
    });
  } catch (err) {
    next(err);
  }
};

const TokenVerify = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new ApiError("Token not found", 401);
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.username !== USERNAME || decoded.password !== PASSWORD)
      throw new ApiError("Invalid token", 401);
    res.send("Token verified");
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return next(new ApiError("Token expired", 401));
    next(err);
  }
};

module.exports = { Login, TokenVerify };
