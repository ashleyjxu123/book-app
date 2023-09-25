// routes/users.js

const express = require('express');
const router = express.Router();

// Load Book Controller
const UserController = require('../controllers/UserController.js');

// @route GET api/users.a;;
// @description Get all users
// @access Public
router.get("/all", UserController.getAllUsers);

// @route GET api/users/:id
// @description Get single user by id
// @access Public
router.get('/:id', UserController.getUserById);

// @route GET api/users/name/:name
// @description Get users with field matching name
// @access Public
router.get('/name/:name', UserController.getUserByName);

// @route GET api/users/username/:username
// @description Get users with field matching username
// @access Public
router.get('/username/:username', UserController.getUserByUsername);

// @route POST api/users
// @description add/save user
// @access Public
router.post('/', UserController.createUser);

// @route GET api/users/:id
// @description Update book by id
// @access Public
router.put('/:id', UserController.updateUser);

// @route GET api/users/:id
// @description Delete book by id
// @access Public
router.delete('/:id', UserController.deleteUser);

module.exports = router;