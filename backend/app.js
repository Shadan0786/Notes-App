const express = require("express");
require('dotenv').config();
const cors = require("cors");
const connectDB = require("./config/db");

const noteRoutes = require("./routes/noteRoutes");

const app = express();


connectDB();


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/notes", noteRoutes);
module.exports = app;
