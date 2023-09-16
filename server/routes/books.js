// routes/api/books.js

const express = require('express');
const router = express.Router();
const db = require("../db/conn.js");

// Load Book model
const Book = require('../models/Book');

// ADD PARAM CHECKING!!!!!!!

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/all", async (req, res) => {
    try {
        const books = await Book.find({}).limit(5);
        res.json(books);
      } catch (err) {
        console.log(err);
        res.status(404).json({ nobookfound: 'No Books Found.' });
      }
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(404).json({ nobookfound: 'Book Not Found.'});
  }
});

// @route POST api/books
// @description add/save book
// @access Public
router.post('/', async (req, res) => {
  try {
    const book = Book.create(req.body);
    await book.save();
    res.status(200).json({ bookaddsuccess: `Book added successfully. ${book}`});
  } catch (err) {
    console.log(err);
    res.status(404).json({ bookaddfailure: "Unable to add book." });
  }
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  try {
    const book =   Book.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ bookupdatesuccess: `Book updated successfully. ${book}`});
  } catch (err) {
    console.log(err)
    res.status(404).json({ bookupdatefailure: `Book update failed.`});
  }
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  try {
    const book = Book.findByIdAndRemove(req.params.id, req.body);
    res.status(202).json({ bookdeletionsuccess: `Book Successfully Deleted. ${book}` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ bookdeletionfailure: `Unable to delete book.`});
  }
});

module.exports = router;