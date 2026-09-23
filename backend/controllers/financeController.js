const Claim = require("../models/Claim");

// Get approved claims
const getApprovedClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      status: "Approved",
    })
      .populate("employee", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      claims,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch approved claims",
      error: error.message,
    });
  }
};

// Mark claim as paid
const markClaimAsPaid = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found",
      });
    }

    // Only approved claims can be paid
    if (claim.status !== "Approved") {
      return res.status(400).json({
        message: "Only approved claims can be marked as paid",
      });
    }

    claim.status = "Paid";
    claim.financeComment = req.body.comment || "";

    await claim.save();

    res.json({
      message: "Claim marked as paid successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark claim as paid",
      error: error.message,
    });
  }
};

module.exports = {
  getApprovedClaims,
  markClaimAsPaid,
};