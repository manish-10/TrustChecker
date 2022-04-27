var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var scheduleSchema = new Schema(
  {
    id: String,
    name: String,
    price: Number,
    originCity: String,
    destinationCity: String,
    departureDate: String,
    departureTime: String,
  },
  { collection: "flightSchedule" }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
