const Claim = require("../models/Claim");

// Get claims waiting for manager approval
const getPendingClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      status: "Pending",
      employee: { $ne: req.user.id },
    })
      .populate("employee", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      claims,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pending claims",
      error: error.message,
    });
  }
};

// Approve a claim
const approveClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found",
      });
    }

    // Manager cannot approve their own claim
    if (claim.employee.toString() === req.user.id) {
      return res.status(403).json({
        message: "You cannot approve your own claim",
      });
    }

    if (claim.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending claims can be approved",
      });
    }

    claim.status = "Approved";
    claim.managerComment = req.body.comment || "";

    await claim.save();

    res.json({
      message: "Claim approved successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve claim",
      error: error.message,
    });
  }
};

// Reject a claim
const rejectClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found",
      });
    }

    if (claim.employee.toString() === req.user.id) {
      return res.status(403).json({
        message: "You cannot reject your own claim",
      });
    }

    if (claim.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending claims can be rejected",
      });
    }

    claim.status = "Rejected";
    claim.managerComment = req.body.comment || "";

    await claim.save();

    res.json({
      message: "Claim rejected successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject claim",
      error: error.message,
    });
  }
};

module.exports = {
  getPendingClaims,
  approveClaim,
  rejectClaim,
};