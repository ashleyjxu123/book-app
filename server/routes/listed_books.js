// routes/listed_books.js

const express = require('express');
const router = express.Router();

// Load Book Controller
const ListedBookController = require('../controllers/ListedBookController.js');

// @route GET api/listings
// @description Get all listings
// @access Public
router.get("/all", ListedBookController.getAllListedBooks);

// @route GET api/listings/:id
// @description Get single listing by id
// @access Public
router.get('/:id', ListedBookController.getListedBookById);


// @route POST api/listings
// @description add/save book
// @access Public
router.post('/', ListedBookController.createListedBook);

// @route PUT api/listings/:id
// @description Update book
// @access Public
router.put('/:id', ListedBookController.updateListedBook);

// @route DELETE api/listings/:id
// @description Delete book by id
// @access Public
router.delete('/:id', ListedBookController.deleteListedBook);

module.exports = router;