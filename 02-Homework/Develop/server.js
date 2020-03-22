const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const User = require("./models/exercise.js");
const path = require('path');
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/FitnessTracker", { useNewUrlParser: true });
app.post("/submit", ({body}, res) => {
  const user = new User(body);
  user.setFullName();
  user.lastUpdatedDate();
  User.create(user)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'));
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

