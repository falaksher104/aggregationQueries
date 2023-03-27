const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

require("dotenv").config();

app.use("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(require("./routes/router"));

const PORT = process.env.PORT || 8888;

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
