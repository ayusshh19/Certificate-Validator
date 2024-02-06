const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE, USERNAME, PASSWORD } = require("../config");

const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username !== USERNAME || password !== PASSWORD) {
      throw new ApiError("Invalid credentials", 400, "BadRequest");
    }

    const accessToken = await jwt.sign({ username, password }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    return res
      .cookie("accessToken", accessToken)
      .json(new ApiResponse({ accessToken }, "Login successful", 200));
  } catch (err) {
    next(err);
  }
};

const TokenVerify = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      throw new ApiError("Token not found", 401, "Unauthorized");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.username !== USERNAME || decoded.password !== PASSWORD) {
      throw new ApiError("Invalid token", 401, "Unauthorized");
    }

    return res.json(new ApiResponse(null, "Token verified successfully", 200));
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new ApiError("Token expired", 401, "Unauthorized"));
    }
    
    next(err);
  }
};

module.exports = { Login, TokenVerify };
