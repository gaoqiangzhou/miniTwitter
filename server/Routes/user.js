const express = require("express");
const router = express.Router();
//user and verification model
const User = require("../Models/user");
//password handle
const bcrypt = require("bcrypt");
//env variables
require("dotenv").config();
//jsonwebtoken
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  //(payload, secret, options)
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {});
};

//add a new user
router.post("/register", (req, res) => {
  let { name, type, password } = req.body;
  name.trim();
  password.trim();

  if (name === "" || password === "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields",
    });
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name enterd",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "password is too short",
    });
  } else {
    //check if account already exists
    User.find({ name })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "FAILED",
            message: "User already exists",
          });
        } else {
          //add new user and hash the password

          //password hashing
          const saltRounds = 5;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                type,
                password: hashedPassword,
              });
              newUser
                .save()
                .then((result) => {
                  //once successfully add a user to the database
                  //create a token
                  const token = createToken(result._id);
                  res.json({
                    status: "SUCCESS",
                    message: "User registered sucessful",
                    data: result,
                    token: token,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "error happend when saving user account",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "error happend when hasing the password",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "an error has occured",
        });
      });
  }
});
//Log in
router.post("/login", (req, res) => {
  let { name, password } = req.body;
  name.trim();
  password.trim();
  if (name === "" || password === "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields",
    });
  } else {
    User.find({ name })
      .then((data) => {
        if (data) {
          //user exists
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                //password matchs
                //create a token for the user
                const token = createToken(data._id);
                res.json({
                  status: "SUCCESS",
                  message: "login success",
                  data: data,
                  token: token,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "invalid password entered",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "error happens when comparing the password",
              });
            });
        } else {
          //user not exists
          res.json({
            status: "FAILED",
            message: "User not exists",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "error happens when finding the user",
        });
      });
  }
});
module.exports = router;
