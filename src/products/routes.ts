import { Router } from "express";
import * as products from '../data/products.json';

const productsRouter  = Router();


productsRouter.get('/', (req, res) => {
    res.send(products);
});

productsRouter.get('/:id', (req, res) => {
    const id  = req.params.id;
    const product = products.data.find(product => product.id === id);
    if(product) {
        return res.status(200).send(product);
    }
    return res.status(404).send('No product with id: ' + id);
});


export  {productsRouter};