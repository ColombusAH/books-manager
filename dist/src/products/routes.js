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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const products = __importStar(require("../data/products.json"));
const validations_1 = require("../middlewares/validations");
const product_model_1 = require("../models/product.model");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    res.status(200).send(products.data);
});
router.get('/:id', validations_1.validateIdLength, (req, res) => {
    const id = req.params.id;
    const product = products.data.find(product => product.id === id);
    if (product) {
        return res.status(200).send(product);
    }
    return res.status(404).send('No product with id: ' + id);
});
router.post('/', validations_1.validateProductNameLength, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, name, itemsInStock } = req.body;
    const product = {
        categoryId,
        name,
        itemsInStock
    };
    console.log('sdsdsdd');
    const p = yield product_model_1.ProductModel.create(product);
    console.log(p);
    // products.data.push(product);
    res.status(201).send(product);
}));
router.put('/:id', validations_1.validateIdLength, validations_1.validateProductNameLength, (req, res) => {
    const id = req.params.id;
    const { categoryId, name, itemsInStock } = req.body;
    const product = products.data.find(product => product.id === id);
    if (product) {
        product.categoryId = categoryId;
        product.name = name;
        product.itemsInStock = itemsInStock;
        return res.status(200).send(product);
    }
    return res.status(404).send('No product with id: ' + id);
});
router.delete('/:id', validations_1.validateIdLength, (req, res) => {
    const id = req.params.id;
    const product = products.data.find(product => product.id === id);
    if (product) {
        // products.data = db.products.filter(product => product.id !== id);
        return res.status(204).send(product);
    }
    return res.status(404).send('No product with id: ' + id);
});
