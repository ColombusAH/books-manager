"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
app.get('/books/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const book = db.books.find(book => book.id === id);
    if (book) {
        return res.status(200).send(book);
    }
    return res.status(404).send('No book with id: ' + id);
});
///3. POST a new book
app.post('/books', (req, res) => {
    const book = Object.assign({ id: db.books.length + 1 }, req.body);
    console.log(book);
    db.books.push(book);
    res.status(201).send(book);
});
app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
});
