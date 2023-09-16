// controllers/BookController.js

const Book = require('../models/Book');

// Add param checking

module.exports = {
    async getAllBooks(req, res) {
        try {
            const books = await Book.find({}).limit(5);
            res.json(books);
        } catch (err) {
            console.log(err);
            res.status(404).json({ nobookfound: `No Books Found.`, err });
        }
    },

    async getBookById(req, res) {
        try {
            const book = await Book.findById(req.params.id);
            res.status(200).json(book);
          } catch (err) {
            console.log(err);
            res.status(404).json({ nobookfound: `Book Not Found`, err});
          }
    },

    async getBookByTitle(req, res) {
        try {
            // $regex with option i ignores case
            const t = req.params.title;
            // new RegExp(req.params.title, 'i')
            console.log(t);
            const books = await Book.find({title: {$regex: '/' + t + '/im'}});
            res.status(200).json(books);
          } catch (err) {
            console.log(err);
            res.status(404).json({ nobookfound: `Book Not Found`, err});
          }
    },

    async createBook(req, res) {
        try {
            //const {author, bookformat, desc, genre, img, isbn, isbn13, link, pages, rating, reviews, title, totalratings} = req.body;

            const book = new Book(req.body);
            await book.save();
            res.status(200).json({ bookaddsuccess: `Book added successfully`, book});
          } catch (err) {
            // console.log(err);
            res.status(404).json({ bookaddfailure: `Unable to add book`, err });
          }
    },

    async updateBook(req, res) {
        try {
            const book = Book.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ bookupdatesuccess: `Book updated successfully.`, book});
          } catch (err) {
            console.log(err)
            res.status(404).json({ bookupdatefailure: `Book update failed.`});
          }
    },

    async deleteBook(req, res) {
        try {
            const book = Book.findByIdAndRemove(req.params.id, req.body);
            res.status(202).json({ bookdeletionsuccess: `Book Successfully Deleted`, book });
          } catch (err) {
            console.log(err);
            res.status(400).json({ bookdeletionfailure: `Unable to delete book.`});
          }
    }


};