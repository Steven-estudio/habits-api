const HabitLog = require("../models/HabitLog");

// marcar hábito como completado
exports.checkHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const today = new Date().toISOString().split("T")[0];

    const log = await HabitLog.create({
      habitId: id,
      date: today,
    });

    res.status(201).json(log);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Ya marcaste hoy" });
    }

    res.status(500).json(error);
  }
};

// obtener logs
exports.getLogs = async (req, res) => {
  try {
    const { id } = req.params;

    const logs = await HabitLog.find({ habitId: id }).sort({ date: 1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getStats = async (req, res) => {
  try {
    const { id } = req.params;

    const logs = await HabitLog.find({ habitId: id }).sort({ date: 1 });

    let streak = 0;
    let maxStreak = 0;
    let prevDate = null;

    logs.forEach((log) => {
      const currentDate = new Date(log.date);

      if (prevDate) {
        const diff = (currentDate - prevDate) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
          streak++;
        } else {
          streak = 1;
        }
      } else {
        streak = 1;
      }

      if (streak > maxStreak) {
        maxStreak = streak;
      }

      prevDate = currentDate;
    });

    res.json({
      total: logs.length,
      currentStreak: streak,
      maxStreak,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
