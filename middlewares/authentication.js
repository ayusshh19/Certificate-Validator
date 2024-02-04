const jwt = require("jsonwebtoken");
const { JWT_SECRET, USERNAME, PASSWORD } = require("../config");
const ErrorResponse = require("../utils/errorResponse");

const tokenVerify = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new ErrorResponse("Token not found", 401);
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.username !== USERNAME || decoded.password !== PASSWORD)
      throw new ErrorResponse("Invalid token", 401);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return next(new ErrorResponse("Token expired", 401));
    next(err);
  }
};

module.exports = tokenVerify;
