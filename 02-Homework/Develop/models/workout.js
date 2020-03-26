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
    
  },
    reps: {
    type: Number,
   
  },
    duration: {
    type: Number,
    default: 0
  }
}
],
  lastUpdated: Date,
});

WorkoutSchema.methods.lastUpdatedDate = function() {
  this.lastUpdated = Date.now();
  return this.lastUpdated;
};
const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;