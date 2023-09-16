const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    author: String,
    bookformat: String,
    desc: String,
    genre: String,
    img: String,
    isbn: Number,
    isbn13: Number,
    link: String,
    pages: Number,
    rating: Number,
    reviews: Number,
    title: String,
    totalratings: Number,
});

const Book = mongoose.model('books', BookSchema, 'books');
module.exports = Book;