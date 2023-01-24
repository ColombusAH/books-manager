"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuidv4_1 = require("uuidv4");
const validations_1 = require("./middlewares/validations.");
const app = (0, express_1.default)();
const jsonParser = express_1.default.json();
const port = 3001;
app.use(jsonParser);
app.use(express_1.default.urlencoded({ extended: true }));
const db = {
    books: []
};
///1. GET All the books
app.get('/books', (req, res) => {
    res.send(db.books);
});
///2. GET a single book by id
app.get('/books/:id', validations_1.validateId, (req, res) => {
    const id = req.params.id;
    const book = db.books.find(book => book.id === id);
    if (book) {
        return res.status(200).send(book);
    }
    return res.status(404).send('No book with id: ' + id);
});
///3. POST a new book
app.post('/books', validations_1.validateAddBookDto, (req, res) => {
    const { authorId, genre, title } = req.body;
    const book = { id: (0, uuidv4_1.uuid)(), authorId, genre, title };
    db.books.push(book);
    res.status(201).send(book);
});
///4. Delete an existing book
app.delete('/books/:id', validations_1.validateId, (req, res) => {
    const id = req.params.id;
    const book = db.books.find(book => book.id === id);
    if (book) {
        db.books = db.books.filter(book => book.id !== id);
        return res.status(200).send(book);
    }
    return res.status(404).send('No book with id: ' + id);
});
app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
});
