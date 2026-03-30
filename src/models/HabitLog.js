const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: true,
  },
});

// evitar duplicados por día
habitLogSchema.index({ habitId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("HabitLog", habitLogSchema);
