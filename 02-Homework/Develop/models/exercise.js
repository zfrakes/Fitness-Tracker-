const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
    // I should also be able to track the name, type, weight, sets, reps, and duration of exercise.
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
    
  },
    reps: {
    type: Number,
   
  },
    duration: {
    type: Number,
    default: 0.
  },
  lastUpdated: Date,
});

ExerciseSchema.methods.lastUpdatedDate = function() {
  this.lastUpdated = Date.now();
  return this.lastUpdated;
};
const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;