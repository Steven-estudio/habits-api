const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, habitController.createHabit);
router.get("/", authMiddleware, habitController.getHabits);
router.delete("/:id", authMiddleware, habitController.deleteHabit);

module.exports = router;