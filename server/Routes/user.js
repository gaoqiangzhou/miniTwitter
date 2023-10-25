const express = require("express");
const router = express.Router();
//user and verification model
const User = require("../Models/user");
const UserVerif = require("../Models/userVerification");
//password handle
const bcrypt = require("bcrypt");
//email handler
const nodemailer = require("nodemailer");
//unique string
const {v4: uuidv4} = require("uuid");


router.get("/", (req, res) => {

});
//add a new user
router.post("/register", (req, res) => {
    let {name, type, email, password} = req.body;
    name.trim();
    email.trim();
    password.trim();

    if(name === "" || email ==="" || password ==="")
    {    res.json({
            status: "FAILED",
            message: "Empty input fields"
    })} else if(!/^[a-zA-Z]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid name enterd"
        })
    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email enterd"
        })
    } else if(password.length < 8){
        res.json({
            status: "FAILED",
            message: "password is too short"
        })
    } else {
        //check if account already exists
        User.find({email}).then(result => {
            if(result.length) {
                res.json({
                    status: "FAILED",
                    message: "User already exists"
                })
            }else {
                //add new user and hash the password

                //password hashing
                const saltRounds = 5;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        type,
                        email,
                        password: hashedPassword
                    });
                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "User registered sucessful",
                            data: result
                        })
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "error happend when saving user account"
                        })
                    })
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "error happend when hasing the password"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "an error has occured"
            })
        })
    }
    
});
//Log in
router.post("/login", (req, res) => {
    let {email, password} = req.body;
    email.trim();
    password.trim();
    if(email ==="" || password ==="")
    {
        res.json({
            status: "FAILED",
            message: "Empty input fields"
        })
    }else{
        User.find({email}).then(data => {
            if(data){
                //user exists
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result){
                        //password matchys
                        res.json({
                            status: "SUCCESS",
                            message: "login success",
                            data: data
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "invalid password entered"
                        })
                    }
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "error happens when comparing the password"
                    })
                })
            } else{
                //user not exists
                res.json({
                    status: "FAILED",
                    message: "User not exists"
                })
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "error happens when finding the user"
            })
        })
    }
})
module.exports = router;