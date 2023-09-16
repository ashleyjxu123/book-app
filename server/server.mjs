import express from "express";
import cors from "cors";
import db from "./db/conn.js";
import books from "./routes/books.js";
import blahs from "./routes/blahs.js";

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());

// start database 
db();

app.use("/books", books);
app.use("/blahs", blahs);

//import { Blah } from "./models/Blah.js";

// app.get('/', (request, response) => {
//   response.send("hello!")
// });

// app.get('/blahs', async (request, response) => {
//   const allBlahs = await Blah.find();
//   return response.status(200).json(allBlahs);

// });

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});