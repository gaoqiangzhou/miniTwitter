const express = require("express");
const router = express.Router();
const User = require("../Models/user");

router.get("/", (req, res) => {

});
//add a new user
router.post("/", (req, res) => {
    const newUser = req.body;
    const addUser = new User(newUser);
    addUser.save()
    .then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({error: "cannot create a new user"})
    })
});
router.put("/", (req, res) => {

});
router.delete("/", (req, res) => {

});
module.exports = router;