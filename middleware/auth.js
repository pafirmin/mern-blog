const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");

    const token = bearer[1];

    req.token = token;
    next();
  } else {
    res.status(403);
  }
};
