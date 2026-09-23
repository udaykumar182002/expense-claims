const express = require("express");

const {
  getApprovedClaims,
  markClaimAsPaid,
} = require("../controllers/financeController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("Finance"),
  getApprovedClaims
);

router.put(
  "/:id/pay",
  protect,
  allowRoles("Finance"),
  markClaimAsPaid
);

module.exports = router;