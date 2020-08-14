const express = require("express");
const app = express();
const PORT = 3005;
const mongoose = require("mongoose");
const connectDB = require("./config/db");

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connect
connectDB();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route defines
require("./routes/admin/admin.js")(app);
require("./routes/user/user.js")(app);

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.listen(PORT, () => {
  console.log(`The server started at ${PORT}`);
});
