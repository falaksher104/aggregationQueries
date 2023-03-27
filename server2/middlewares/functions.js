const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { isUserExists } = require("../db/userQueries");

function authenticate(req, res, next) {
  const token = (req.headers.authtoken) ? req.headers.authtoken : req.cookies.token;
  jwt.verify(token, process.env.JWT_KEY, (err, check) => {
    if (check) next();
    else res.send(JSON.stringify({ error: { msg: `Please log in` } }));
  });
}

function inputValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.send(JSON.stringify({ error: errors.array() }));
  else next();
}

function generateRandomPassword(req, res, next) {
  const password = req.body.password ? req.body.password : Math.random().toString(36).slice(-8);
  bcrypt.hash(password, 10, function (err, hash) {
    if (err)
      res.send(
        JSON.stringify({
          error: {
            msg: `An error occurred while generating the password`,
          },
        })
      );
    else {
      req.body.password = hash;
      next();
    }
  });
}

function decodeToken(req, res, next) {
  const token = (req.headers.authtoken) ? req.headers.authtoken : req.cookies.token;
  req.tokenDecoded = jwt.decode(token);
  next();
}


function verifyUserUnique(req, res, next) {
  isUserExists(req.body.email).then(user => {
    if (user) throw "User Already Exists";
    else next();
  }).catch(err => {
    res.send(JSON.stringify({ error: { msg: err } }));
  })
}


module.exports = {
  authenticate,
  inputValidation,
  generateRandomPassword,
  decodeToken,
  verifyUserUnique
};
