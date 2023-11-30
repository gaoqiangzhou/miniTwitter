const express = require("express");
const router = express.Router();
//user and verification model
const User = require("../Models/user");
const Subscribe = require("../Models/subscribe");
const Post = require("../Models/post");
const Tip = require("../Models/tip");
//password handle
const bcrypt = require("bcrypt");
//env variables
require("dotenv").config();
//jsonwebtoken
const jwt = require("jsonwebtoken");
const { route } = require("./subscribe");
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
  } else if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name enterd",
    });
  } else if (password.length < 4) {
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
                account_balance: 1000,
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
    User.findOne({ name })
      .then((data) => {
        if (data) {
          //user exists
          const hashedPassword = data.password;
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
router.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    const subscribeInfo = await Subscribe.findOne({ userId: userId });
    if(subscribeInfo)
    {
        const followingNameIds = (
            await Promise.all(
              subscribeInfo.following
                .map((ea) => ea + "")
                .map(async (e) => User.findOne({ _id: e }))
            )
          ).map((el) => ({ _id: el._id, name: el.name }));
          const followerNameIds = (
            await Promise.all(
              subscribeInfo.follower
                .map((ea) => ea + "")
                .map(async (e) => User.findOne({ _id: e }))
            )
          ).map((el) => ({ _id: el._id, name: el.name }));
      
          const userInfo = {
            _id: user._id,
            name: user.name,
            type: user.type,
            balance: user.account_balance,
            followers: followerNameIds,
            followings: followingNameIds,
          };
      
          res.send(userInfo);
    }
    else
    {
        const userInfo = {
            _id: user._id,
            name: user.name,
            type: user.type,
            balance: user.account_balance,
            followers: [],
            followings: [],
        };
        res.send(userInfo);
    }
  } catch (err) {
    res.json({
      status: "FAILED",
      message: "error happens when finding the user",
    });
  }
});

router.put("/send-tip", async (req, res) => {
  const { senderId, receiverId, tipAmount } = req.body;

  try {
    // Find sender and receiver
    const sender = await User.findOne({ _id: senderId });
    const receiver = await User.findOne({ _id: receiverId });

    // Check if sender and receiver exist
    if (!sender || !receiver) {
      return res.json({
        status: "FAILED",
        message: "Sender or receiver not found",
      });
    }

    // Check if sender has enough balance for the tip
    if (sender.account_balance < tipAmount) {
      return res.json({
        status: "FAILED",
        message: "Insufficient funds for the tip",
      });
    }

    // Deduct tip amount from sender's account balance
    sender.account_balance -= tipAmount;

    // Add tip amount to receiver's account balance
    receiver.account_balance += tipAmount;

    // Save updated user information to the database
    await sender.save();
    await receiver.save();

    const newtip = new Tip({
      sender,
      receiver,
      tipAmount,
    });

    await newtip.save();
    res.json({
      status: "SUCCESS",
      message: "Tip sent successfully",
      sender: {
        _id: sender._id,
        name: sender.name,
        account_balance: sender.account_balance,
      },
      receiver: {
        _id: receiver._id,
        name: receiver.name,
        account_balance: receiver.account_balance,
      },
    });
  } catch (err) {
    console.error(err);
    res.json({
      status: "FAILED",
      message: "Error occurred while processing the tip",
    });
  }
});

module.exports = router;
