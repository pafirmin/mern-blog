const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
require("dotenv").config();

// Sign in
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .statusCode(400)
        .json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .statusCode(400)
        .json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
