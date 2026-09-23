const express = require("express");

const {
  createClaim,
  getMyClaims,
} = require("../controllers/claimController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new claim
router.post("/", protect, createClaim);

// Get logged-in user's claims
router.get("/my", protect, getMyClaims);

module.exports = router;