const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        "Travel",
        "Meals",
        "Supplies",
        "Taxi",
        "Accommodation",
        "Other",
      ],
      required: true,
    },

    claimDate: {
      type: Date,
      required: true,
    },

    receipt: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Paid",
      ],
      default: "Pending",
    },

    managerComment: {
      type: String,
      default: "",
    },

    financeComment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Claim", claimSchema);