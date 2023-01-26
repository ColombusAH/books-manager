"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuidv4_1 = require("uuidv4");
const validations_1 = require("./middlewares/validations");
const products = __importStar(require("./data/products.json"));
const routes_1 = require("./products/routes");
const app = (0, express_1.default)();
const jsonParser = express_1.default.json();
const port = 3001;
app.use(jsonParser);
app.use(express_1.default.urlencoded({ extended: true }));
const db = {
    books: []
};
app.all('*', (req, res, next) => {
    console.log('Request received with the params: ', req.params);
    next();
});
app.use((req, res, next) => {
    console.log('request received in time ', new Date().toISOString());
    next();
});
///1. GET All the books
app.get('/books', (req, res) => {
    throw new Error('Something went wrong');
    res.send(products);
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
app.use('/products', routes_1.productsRouter);
app.use((err, req, res, next) => {
    console.error('our error handler');
    console.error('Error: ', err.name);
    next(err);
});
app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
});
