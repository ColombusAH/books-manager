"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductNameLength = exports.validateIdLength = exports.validateAddBookDto = exports.validateId = void 0;
const uuid_1 = require("uuid");
const availableGenres = ['fiction', 'non-fiction', 'biography', 'poetry', 'drama', 'science', 'history', 'philosophy', 'self-help', 'Fantasy', 'other'];
const validateId = (req, res, next) => {
    console.log('[ValidateId]');
    console.log(req.params);
    try {
        if (!(0, uuid_1.validate)(req.params.id)) {
            return res.status(400).send('Invalid id');
        }
    }
    catch (error) {
        return res.status(400).send('Invalid id');
    }
    next();
};
exports.validateId = validateId;
const validateAddBookDto = (req, res, next) => {
    console.log('[ValidateAddBookDto]');
    console.log(req.body);
    const { title, authorId, genre } = req.body;
    if (!title || !authorId || !genre || availableGenres.indexOf(genre) === -1) {
        return res.status(400).send('Invalid book');
    }
    next();
};
exports.validateAddBookDto = validateAddBookDto;
const validateIdLength = (req, res, next) => {
    const id = req.params.id;
    if (id.length !== 36) {
        return res.status(400).send('Invalid id');
    }
    next();
};
exports.validateIdLength = validateIdLength;
const validateProductNameLength = (req, res, next) => {
    const name = req.body.name;
    if (name.length < 3) {
        return res.status(409).send('Invalid product name');
    }
    next();
};
exports.validateProductNameLength = validateProductNameLength;
