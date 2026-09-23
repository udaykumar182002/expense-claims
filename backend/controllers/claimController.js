const Claim = require("../models/Claim");

const createClaim = async (req, res) => {
  try {
    const {
      title,
      description,
      amount,
      category,
      claimDate,
      receipt,
    } = req.body;

    if (!title || !description || !amount || !category || !claimDate) {
      return res.status(400).json({
        message: "All required claim fields must be provided",
      });
    }

    // Check for a possible duplicate claim
    const startOfDay = new Date(claimDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(claimDate);
    endOfDay.setHours(23, 59, 59, 999);

    const possibleDuplicate = await Claim.findOne({
      employee: req.user.id,
      amount: Number(amount),
      category,
      claimDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (possibleDuplicate) {
      return res.status(409).json({
        message: "Possible duplicate claim detected",
        duplicateClaim: possibleDuplicate,
      });
    }

    const claim = await Claim.create({
      employee: req.user.id,
      title,
      description,
      amount: Number(amount),
      category,
      claimDate,
      receipt: receipt || "",
    });

    res.status(201).json({
      message: "Claim created successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create claim",
      error: error.message,
    });
  }
};

const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      employee: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      claims,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch claims",
      error: error.message,
    });
  }
};

module.exports = {
  createClaim,
  getMyClaims,
};