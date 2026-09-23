const express = require("express");

const { getMonthlyReport } = require("../controllers/reportController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/monthly",
  protect,
  allowRoles("Finance"),
  getMonthlyReport
);

module.exports = router;