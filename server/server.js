const express = require("express");
const cors = require("cors");
const db = require("./db/conn.js");
const books = require("./routes/books.js");
const blahs = require("./routes/blahs.js");
const users = require("./routes/users.js");
const listed_books = require("./routes/listed_books.js");

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());

// start database 
db();

var path = require('path');

app.use("/books", books);
app.use("/users", users);
app.use("/listings", listed_books);
// for testing
app.use("/blahs", blahs);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app; // for testing