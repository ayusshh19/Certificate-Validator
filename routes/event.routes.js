const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const fieldHandler = require("../middlewares/fieldHandler.middleware");
const {
  Register: RegisterEvent,
  Delete: DeleteEvent,
  Fetch: FetchEvent,
  FetchYear: FetchYearEvent,
  FetchAll: FetchAllEvent,
  Update: UpdateEvent,
} = require("../controllers/event.controller");

router.post(
  "/register",
  body("name").trim().notEmpty().withMessage("name is required"),
  body("year")
    .trim()
    .notEmpty()
    .withMessage("year is required")
    .isNumeric()
    .withMessage("year should be a number"),
  fieldHandler,
  RegisterEvent
);

router.delete(
  "/delete/:event_id",
  param("event_id").trim().notEmpty().withMessage("event id is required"),
  fieldHandler,
  DeleteEvent
);

router.get(
  "/fetch/:event_id",
  param("event_id").trim().notEmpty().withMessage("event id is required"),
  fieldHandler,
  FetchEvent
);

router.get("/fetch", FetchYearEvent);

router.get("/fetch/all", FetchAllEvent);

router.put(
  "/update/:event_id",
  param("event_id").trim().notEmpty().withMessage("event id is required"),
  fieldHandler,
  UpdateEvent
);

module.exports = router;
