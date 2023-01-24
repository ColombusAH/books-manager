import express from 'express';
import { uuid } from 'uuidv4';
import { validateId, validateAddBookDto } from './middlewares/validations.';

const app = express();
const jsonParser = express.json();
const port = 3001;

app.use(jsonParser);
app.use(express.urlencoded({ extended: true }));


interface Book {
  id: string;
  title: string;
  authorId: string;
  genre: string;
}

interface DB {
  books: Book[];
}

const db: DB =  {
  books: []
}

///1. GET All the books
app.get('/books', (req, res) => {
  res.send(db.books);
});

///2. GET a single book by id
app.get('/books/:id',validateId, (req, res) => {
  const id  = req.params.id;
  const book = db.books.find(book => book.id === id);
  if(book) {
    return res.status(200).send(book);
  }
  return res.status(404).send('No book with id: ' + id);
});


///3. POST a new book
app.post('/books', validateAddBookDto,(req, res) => {
  const { authorId, genre,title  } = req.body;
  const book: Book = {id: uuid(), authorId, genre,title}
  db.books.push(book);

  res.status(201).send(book);
});

///4. Delete an existing book
app.delete('/books/:id', validateId,(req, res) => {
  const id = req.params.id;
  const book = db.books.find(book => book.id === id);
  if(book) {
    db.books = db.books.filter(book => book.id !== id);
    return res.status(200).send(book);
  }
  return res.status(404).send('No book with id: ' + id);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});