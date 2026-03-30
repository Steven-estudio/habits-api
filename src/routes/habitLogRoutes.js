const express = require("express");
const router = express.Router();
const controller = require("../controllers/habitLogController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:id/check", authMiddleware, controller.checkHabit);
router.get("/:id/logs", authMiddleware, controller.getLogs);
router.get("/:id/stats", authMiddleware, controller.getStats);

module.exports = router;