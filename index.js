const express = require("express");
const Schedule = require("./model/db.js");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mongoURI =
  "mongodb+srv://manish:sharepass%401@cluster0.lcxwt.mongodb.net/schedule?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((r) => app.listen(8080))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  Schedule.find().then((result) => res.send(result));
});

app.get("/oneWay", (req, res) => {
  Schedule.find({
    originCity: req.body.origin,
    destinationCity: req.body.destination,
    departureDate: req.body.ddate,
  }).then((result) => res.status(200).send(result));
});

app.get("/twoWay", (req, res) => {
  Schedule.find({
    $or: [
      {
        originCity: req.body.origin,
        destinationCity: req.body.destination,
        departureDate: req.body.ddate,
      },
      {
        originCity: req.body.destination,
        destinationCity: req.body.origin,
        departureDate: req.body.rdate,
      },
    ],
  }).then((result) => {
    const dept = [];
    const ret = [];
    result.map((r) => {
      if (r.departureDate === req.body.ddate) dept.push(r);
      else ret.push(r);
    });
    res.status(200).send({ d: dept, r: ret });
  });
});
