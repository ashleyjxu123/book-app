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
    full_name: {
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
    books_listed: Array,
    books_saved: Array,
    books_out: Array,
    books_in: Array,
    past_books: Array,
    date_created: Date
});

const User = mongoose.model('users', UserSchema, 'users');
module.exports = User;