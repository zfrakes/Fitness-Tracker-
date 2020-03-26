const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const Workout = require("./models/workout.js");
const path = require('path');
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/FitnessTracker", { useNewUrlParser: true });
app.post("/api/workouts", ({body}, res) => {
  const workout = new Workout(body);
  workout.lastUpdatedDate();
  Workout.create(workout)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'));
  });

  app.put("/api/workouts/:id", (req, res) => {
     Workout.findById(req.params.id,function(err,workout){
      if (!err){
        workout.exercises.push({
        name:req.body.name,
        type:req.body.type,
        weight:req.body.weight,
        sets:req.body.set,
        reps:req.body.reps,
        duration:req.body.duration,
        })
        workout.save(function(err){
          if (err){
           console.log(err);
          } else {
           res.json(workout);
         }
         })
       }
    })      
  });
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});