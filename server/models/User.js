// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    full_name: { //do we need or are we gonna just make this ourselves when they input first and last
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    zip_code: {
        type: String,
        required: true
    },
    books_listed: [{
        type: String
    }], //ids of books (string ids?) - id -> listed_book
    books_liked: [{
        type: String
    }], //ids of books (string ids?) - id -> listed_book
    books_out: [String], // array of book ids or listing ids?
    books_in: [String],
    past_books: [String],
    friends: [String],
    date_created: Date
});

const User = mongoose.model('users', UserSchema, 'users');
module.exports = User;