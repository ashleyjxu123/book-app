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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    zip_code: {
        type: Number,
        required: true
    },
    books_listed: [{
        type: String
    }], //ids of books (string ids?)
    books_liked: [{
        type: String
    }], //ids of books (string ids?)
    books_saved: Array,
    books_out: Array,
    books_in: Array,
    past_books: Array,
    date_created: Date
});

const User = mongoose.model('users', UserSchema, 'users');
module.exports = User;