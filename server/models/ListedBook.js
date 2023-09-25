const mongoose = require('mongoose');

const ListedBookSchema = new mongoose.Schema({ 
  book_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});


const ListedBook = mongoose.model('listed_book', ListedBookSchema, 'listed_book');
module.exports = ListedBook;