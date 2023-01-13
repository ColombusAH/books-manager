import express from 'express';

const app = express();
const jsonParser = express.json();
const port = 3001;

app.use(jsonParser);
app.use(express.urlencoded({ extended: true }));


interface Book {
  id: number;
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
app.get('/books/:id', (req, res) => {
  console.log(req.params);
  const id  = +req.params.id;
  const book = db.books.find(book => book.id === id);
  if(book) {
    return res.status(200).send(book);
  }
  return res.status(404).send('No book with id: ' + id);
});


///3. POST a new book
app.post('/books', (req, res) => {
  const book: Book = {id: db.books.length + 1, ...req.body}
  console.log(book)
  db.books.push(book);

  res.status(201).send(book);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});