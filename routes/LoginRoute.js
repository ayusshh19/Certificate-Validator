const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fieldHandler = require("../middlewares/fieldHandler");
const Login = require("../controller/Login");

router.post(
  "/login",
  body("username").trim().notEmpty().withMessage("username is required"),
  body("password").trim().notEmpty().withMessage("password is required"),
  fieldHandler,
  Login
);

module.exports = router;
