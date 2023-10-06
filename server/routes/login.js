// routes/login.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const userLoggedIn = req.body;

    User.findOne({username: userLoggedIn.username})
    .then(dbUser => {
        if (!dbUser) {
            return res.json({message: "Username or password is incorrect."});
        }
        bcrypt.compare(userLoggedIn.password, dbUser.password)
        .then(isCorrect => {
            if (isCorrect) {
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username,
                }
                jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 86400},
                    (err, token) => {
                        if (err) return res.json({message: `Login failed` + err});
                        return res.json({message: "Login success", token: "Bearer " + token});
                    } 
                )
            } else {
                return res.json({message: "Username or password is incorrect."});
            }
        })
    })

});

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1];
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.json({
          isLoggedIn: false,
          message: "Failed to authenticate"
        })
  
        req.user = {};
        req.user.id = decoded.id;
        req.user.username = decoded.username;
        next()
      })
    } else {
      res.json({message: "Incorrect token given.", isLoggedIn: false});
    }
};

router.get('/getUser', verifyJWT, (req, res) => {
    res.json({isLoggedIn: true, username: req.user.username});
});

module.exports = router;