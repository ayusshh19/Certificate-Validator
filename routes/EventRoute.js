const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const fieldHandler = require("../middlewares/fieldHandler");
const {
  Register: RegisterEvent,
  Delete: DeleteEvent,
  Fetch: FetchEvent,
  Update: UpdateEvent,
} = require("../controller/Event");

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

router.get("/fetch", FetchEvent);

router.put(
  "/update/:event_id",
  param("event_id").trim().notEmpty().withMessage("event id is required"),
  fieldHandler,
  UpdateEvent
);

module.exports = router;
