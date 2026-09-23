const express = require("express");

const {
  getPendingClaims,
  approveClaim,
  rejectClaim,
} = require("../controllers/approvalController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("Manager"),
  getPendingClaims
);

router.put(
  "/:id/approve",
  protect,
  allowRoles("Manager"),
  approveClaim
);

router.put(
  "/:id/reject",
  protect,
  allowRoles("Manager"),
  rejectClaim
);

module.exports = router;