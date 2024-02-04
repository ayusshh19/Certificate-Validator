const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE, USERNAME, PASSWORD } = require("../config");
const ErrorResponse = require("../utils/errorResponse");

const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username !== USERNAME || password !== PASSWORD)
      throw new ErrorResponse("Invalid credentials", 400);
    const token = await jwt.sign({ username, password }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    res.send({
      message: "Login successful",
      Authorization: token,
    });
  } catch (err) {
    next(err);
  }
};

const TokenVerify = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new ErrorResponse("Token not found", 401);
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.username !== USERNAME || decoded.password !== PASSWORD)
      throw new ErrorResponse("Invalid token", 401);
    res.send("Token verified");
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return next(new ErrorResponse("Token expired", 401));
    next(err);
  }
};

module.exports = { Login, TokenVerify };
