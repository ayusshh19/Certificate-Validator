const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE, USERNAME, PASSWORD } = require("../config");
const ErrorResponse = require("../utils/errorResponse");

const login = async (req, res, next) => {
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

module.exports = login;
