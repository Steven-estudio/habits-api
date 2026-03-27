const Habit = require("../models/Habit");

// crear hábito
exports.createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    const habit = await Habit.create({
      name,
      userId: req.userId,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json(error);
  }
};

// obtener hábitos del usuario
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json(error);
  }
};

// eliminar hábito
exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    await Habit.deleteOne({ _id: id, userId: req.userId });

    res.json({ message: "Hábito eliminado" });
  } catch (error) {
    res.status(500).json(error);
  }
};
