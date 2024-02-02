const { Schema, connection } = require("mongoose");

const EventSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
      match: [/^[a-zA-Z ]+$/, (props) => `${props.value} is not a valid name`],
      lowercase: true,
    },
    year: {
      type: Number,
      min: 2000,
      required: [true, "year is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection
  .useDb("certificate-validator")
  .model("Event", EventSchema);
