const EventSchema = require("../models/EventSchema");

const Register = async (req, res, next) => {
  try {
    const { name, year } = req.body;
    const response = await EventSchema.create({
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
    await EventSchema.findByIdAndDelete(event_id);
    res.send("event deleted");
  } catch (err) {
    next(err);
  }
};

const Fetch = async (req, res, next) => {
  try {
    const events = await EventSchema.aggregate([
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

const Update = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    await EventSchema.findByIdAndUpdate(event_id, req.query);
    res.send("event updated");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  Register,
  Delete,
  Fetch,
  Update,
};
