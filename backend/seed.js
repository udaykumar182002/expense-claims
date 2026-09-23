const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");
const Claim = require("./models/Claim");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany({});
    await Claim.deleteMany({});

    const hashedPassword = await bcrypt.hash("Password123", 10);

    const staff = await User.create({
      name: "Rahul Sharma",
      email: "staff@example.com",
      password: hashedPassword,
      role: "Staff",
    });

    const manager = await User.create({
      name: "Priya Reddy",
      email: "manager@example.com",
      password: hashedPassword,
      role: "Manager",
    });

    const finance = await User.create({
      name: "Arjun Kumar",
      email: "finance@example.com",
      password: hashedPassword,
      role: "Finance",
    });

    await Claim.create([
      {
        employee: staff._id,
        title: "Client Dinner",
        description: "Dinner with client at Hyderabad restaurant",
        amount: 1850,
        category: "Meals",
        claimDate: new Date("2026-09-05"),
        status: "Pending",
      },
      {
        employee: staff._id,
        title: "Uber Office Travel",
        description: "Taxi from office to client location",
        amount: 620,
        category: "Taxi",
        claimDate: new Date("2026-09-08"),
        status: "Approved",
        managerComment: "Approved for client visit",
      },
      {
        employee: staff._id,
        title: "Stationery Purchase",
        description: "Notebooks, pens and office supplies",
        amount: 2400,
        category: "Supplies",
        claimDate: new Date("2026-09-10"),
        status: "Paid",
      },
      {
        employee: manager._id,
        title: "Business Travel",
        description: "Train ticket for business meeting",
        amount: 3200,
        category: "Travel",
        claimDate: new Date("2026-09-12"),
        status: "Pending",
      },
      {
        employee: manager._id,
        title: "Hotel Stay",
        description: "Hotel accommodation for business trip",
        amount: 4800,
        category: "Accommodation",
        claimDate: new Date("2026-09-15"),
        status: "Approved",
      },
    ]);

    console.log("Demo users created");
    console.log("Demo claims created");

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedData();