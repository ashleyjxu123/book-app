// routes/liked_books.js

const express = require('express');
const router = express.Router();

// Load Book Controller
const LikedBookController = require('../controllers/LikedBookController.js');

// @route GET api/likes
// @description Get all likes
// @access Public
router.get("/all", LikedBookController.getAllLikedBooks);

// @route GET api/likes/:id
// @description Get single like by id
// @access Public
router.get('/:id', LikedBookController.getLikedBookById);

// @route GET api/likes/listing/:id
// @description Get single like by listing id
// @access Public
router.get('/listing/:id', LikedBookController.getLikedBookByListingId);


// @route POST api/likes
// @description add/save like
// @access Public
router.post('/', LikedBookController.createLikedBook);

// @route DELETE api/likes/:id
// @description Delete book by id
// @access Public
router.delete('/:id', LikedBookController.deleteLikedBook);

module.exports = router;