const mongoose = require('mongoose');

const LikedBookSchema = new mongoose.Schema({ 
  book_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  listing_id: {
    type: String,
    required: true
  },
  liked_by: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    required: true
  }
});


const LikedBook = mongoose.model('liked_book', LikedBookSchema, 'liked_book');
module.exports = LikedBook;