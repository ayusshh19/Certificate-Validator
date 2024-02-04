const express = require("express");
const router = express.Router();
const { body, header } = require("express-validator");
const fieldHandler = require("../middlewares/fieldHandler");
const { Login, TokenVerify } = require("../controller/Login");

router.post(
  "/login",
  body("username").trim().notEmpty().withMessage("username is required"),
  body("password").trim().notEmpty().withMessage("password is required"),
  fieldHandler,
  Login
);

router.get(
  "/token/verify",
  header("authorization").trim().notEmpty().withMessage("token is required"),
  fieldHandler,
  TokenVerify
);

module.exports = router;
