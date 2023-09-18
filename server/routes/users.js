// routes/users.js

const express = require('express');
const router = express.Router();

// Load Book Controller
const UserController = require('../controllers/UserController.js');

// @route GET api/books
// @description Get all books
// @access Public
router.get("/all", UserController.getAllUsers);

// @route GET api/books/id/:id
// @description Get single book by id
// @access Public
router.get('/:id', UserController.getUserById);

// @route GET api/books/:title
// @description Get books with field matching title
// @access Public
router.get('/name/:name', UserController.getUserByName);

// @route GET api/books/:title
// @description Get books with field matching title
// @access Public
router.get('/username/:username', UserController.getUserByUsername);

// @route POST api/books
// @description add/save book
// @access Public
router.post('/', UserController.createUser);

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', UserController.updateUser);

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', UserController.deleteUser);

module.exports = router;