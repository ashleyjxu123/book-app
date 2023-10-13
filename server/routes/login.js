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
                // console.log(isCorrect);
                // const payload = {
                //     username: dbUser.username,
                //     password: dbUser.password,
                // }
                // jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 86400},
                //     (err, token) => {
                //         if (err) return res.json({message: `Login failed` + err});
                //         return res.json({message: "Login success", token: "Bearer " + token});
                //     } 
                // )
                res.status(200).json({ message: "User logged in successfully", success: true });

            } else {
                console.log(isCorrect);
                return res.json({message: "Username or password is incorrect."});
            }
        })
    })

});

// function verifyJWT(req, res, next) {
//     const token = req.headers["x-access-token"]?.split(' ')[1];
  
//     if (token) {
//       jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//         if (err) return res.json({
//           isLoggedIn: false,
//           message: "Failed to authenticate"
//         })
  
//         req.user = {};
//         req.user.username = decoded.username;
//         req.user.password = decoded.password;
//         next()
//       })
//     } else {
//       res.json({message: "Incorrect token given.", isLoggedIn: false});
//     }
// };

// router.get('/getUser', verifyJWT, (req, res) => {
//     res.json({isLoggedIn: true, username: req.user.username});
// });

module.exports = router;