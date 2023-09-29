// routes/books.js

const express = require('express');
const router = express.Router();

// Load Book Controller
const BookController = require('../controllers/BookController.js');

// @route GET api/books/id/:id
// @description Get single book by id
// @access Public
router.get('/:id', BookController.getBookById);

// @route GET api/books/:title
// @description Get books with field matching title
// @access Public
router.get('/title/:title', BookController.getBookByTitle);

// @route GET api/books/:title
// @description Get books with field matching title
// @access Public
router.get('/author/:author', BookController.getBookByAuthor);


module.exports = router;