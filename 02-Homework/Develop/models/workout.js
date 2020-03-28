const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
exercises: [
{
    name: {
    type: String,
    trim: true,
  },
    type: {
    type: String,
    trim: true,
   
  },
    weight: {
    type: Number,
  
  },
    sets: {
    type: Number,
    default:0
    
  },
    reps: {
    type: Number,
   
  },
    duration: {
    type: Number,
    default: 0
  },
    distance: {
    type: Number,
    default: 0
  },
}
],
  day:Date,
  
  totalDuration:Number, 

  
});

WorkoutSchema.methods.setDate = function() {
  this.day = Date.now();
  return this.day;
};
WorkoutSchema.methods.setTotalDuration = function() {
  let totalDuration = 0;
  this.exercises.forEach(exercise => {
    totalDuration = totalDuration + exercise.duration;  
  });
  this.totalDuration = totalDuration;
  return this.totalDuration;
};
const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;