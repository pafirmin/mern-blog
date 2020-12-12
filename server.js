const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const path = require("path");

const app = express();

connectDB();

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build"));
});

app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/tags", require("./routes/api/tags"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
