const ApiError = require("../utils/ApiError");
const EventModel = require("../models/event.model");

const Register = async (req, res, next) => {
  try {
    const { name, year } = req.body;
    const event = await EventModel.findOne({
      name,
      year,
    });
    if (event) throw new ApiError("event already registered", 400);
    const response = await EventModel.create({
      name,
      year,
    });
    res.send(response);
  } catch (err) {
    next(err);
  }
};

const Delete = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    await EventModel.findByIdAndDelete(event_id);
    res.send("event deleted");
  } catch (err) {
    next(err);
  }
};

const Fetch = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    const event = await EventModel.findById(event_id).lean();
    res.json(event);
  } catch (err) {
    next(err);
  }
};

const FetchYear = async (req, res, next) => {
  try {
    const events = await EventModel.aggregate([
      {
        $group: {
          _id: "$year",
          events: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id",
          events: 1,
        },
      },
      {
        $sort: { year: -1 },
      },
    ]);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const FetchAll = async (req, res, next) => {
  try {
    const events = await EventModel.find()
      .sort({ year: -1 })
      .select(["_id", "name"]);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const Update = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    await EventModel.findByIdAndUpdate(event_id, req.body);
    res.send("Event updated");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  Register,
  Delete,
  Fetch,
  FetchYear,
  FetchAll,
  Update,
};
