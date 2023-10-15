// routes/login.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require('express');
const { createSecretToken } = require("../utils/SecretToken");
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.json({message:"All fields are required."});
    }

    User.findOne({username: username})
    .then(dbUser => {
        if (!dbUser) {
            return res.json({message: "Username or password is incorrect."});
        }
        bcrypt.compare(password, dbUser.password)
        .then(isCorrect => {
            if (isCorrect) {
                const token = createSecretToken(dbUser._id);
                res.cookie("token", token, {
                    withCredentials: true,
                    httpOnly: false,
                });
                res.status(200).json({
                    message: "User logged in successfully",
                    success: true,
                    id: dbUser._id
                 });

            } else {
                console.log(isCorrect);
                return res.json({message: "Username or password is incorrect."});
            }
        })
    })

});

module.exports = router;