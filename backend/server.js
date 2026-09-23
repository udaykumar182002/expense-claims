const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");
const approvalRoutes = require("./routes/approvalRoutes");
const financeRoutes = require("./routes/financeRoutes");
const reportRoutes = require("./routes/reportRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/approvals", approvalRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/reports", reportRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Expense Claims API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});