const Claim = require("../models/Claim");

// Get monthly expense report
const getMonthlyReport = async (req, res) => {
  try {
    const { month, year } = req.query;

    const currentDate = new Date();

    const selectedMonth =
      month !== undefined
        ? Number(month)
        : currentDate.getMonth() + 1;

    const selectedYear =
      year !== undefined
        ? Number(year)
        : currentDate.getFullYear();

    const startDate = new Date(
      selectedYear,
      selectedMonth - 1,
      1
    );

    const endDate = new Date(
      selectedYear,
      selectedMonth,
      1
    );

    const claims = await Claim.find({
      claimDate: {
        $gte: startDate,
        $lt: endDate,
      },
      status: {
        $in: ["Approved", "Paid"],
      },
    }).populate("employee", "name email role");

    const totalSpend = claims.reduce(
      (total, claim) => total + claim.amount,
      0
    );

    const byCategory = {};

    claims.forEach((claim) => {
      if (!byCategory[claim.category]) {
        byCategory[claim.category] = 0;
      }

      byCategory[claim.category] += claim.amount;
    });

    const byEmployee = {};

    claims.forEach((claim) => {
      const employeeId = claim.employee._id.toString();

      if (!byEmployee[employeeId]) {
        byEmployee[employeeId] = {
          employee: claim.employee,
          total: 0,
        };
      }

      byEmployee[employeeId].total += claim.amount;
    });

    res.json({
      month: selectedMonth,
      year: selectedYear,
      totalSpend,
      claimCount: claims.length,
      byCategory,
      byEmployee: Object.values(byEmployee),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate monthly report",
      error: error.message,
    });
  }
};

module.exports = {
  getMonthlyReport,
};