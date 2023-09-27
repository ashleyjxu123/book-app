const mongoose = require('mongoose');

const ListedBookSchema = new mongoose.Schema({ 
  book_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  type: String,
  date_created: {
    type: Date,
    required: true
  },
  img: String,

  // may need to add more info
  // user description, type of listing, state of book, image, date_created
});


const ListedBook = mongoose.model('listed_book', ListedBookSchema, 'listed_book');
module.exports = ListedBook;