const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect("mongodb://127.0.0.1:27017/smarthire")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Default Route
app.get("/", (req, res) => {
  res.send("SmartHire API Running");
});

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));


// Server Start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
