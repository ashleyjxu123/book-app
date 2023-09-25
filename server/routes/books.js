// routes/books.js

const express = require('express');
const router = express.Router();

// Load Book Controller
const BookController = require('../controllers/BookController.js');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.status(200).send('book route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/all", BookController.getAllBooks);

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




// ******* we shouldn't really ever be using these 3

// @route POST api/books
// @description add/save book
// @access Public
router.post('/', BookController.createBook);

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', BookController.updateBook);

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', BookController.deleteBook);

module.exports = router;