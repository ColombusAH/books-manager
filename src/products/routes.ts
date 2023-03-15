import { Router, Request, Response } from "express";
import { uuid } from "uuidv4";
import * as products from '../data/products.json';
import { validateIdLength, validateProductNameLength } from "../middlewares/validations";
import {ProductModel} from '../models/product.model' 

const router  = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send(products.data);
});
  
router.get('/:id',validateIdLength, (req: Request, res: Response) => {
    const id = req.params.id;
    const product =products.data.find(product => product.id === id);
    if(product) {
      return res.status(200).send(product);
    }
    return res.status(404).send('No product with id: ' + id);
 })
  
router.post('/',validateProductNameLength, async (req: Request, res: Response) => {
    const { categoryId, name, itemsInStock } = req.body;
    const product = {
      categoryId,
      name,
      itemsInStock
    }
    console.log('sdsdsdd');
    const p = await ProductModel.create(product);
    console.log(p);
  
    // products.data.push(product);
    res.status(201).send(product);
});
  
router.put('/:id',validateIdLength,validateProductNameLength, (req: Request, res: Response) => {
    const id = req.params.id;
    const { categoryId, name, itemsInStock } = req.body;
    const product = products.data.find(product => product.id === id);
    if(product) {
      product.categoryId = categoryId;
      product.name = name;
      product.itemsInStock = itemsInStock;
      return res.status(200).send(product);
    }
    return res.status(404).send('No product with id: ' + id);
})
  
  
router.delete('/:id',validateIdLength, (req: Request, res: Response) => {
    const id = req.params.id;
    const product = products.data.find(product => product.id === id);
    if(product) {
        // products.data = db.products.filter(product => product.id !== id);
      return res.status(204).send(product);
    }
    return res.status(404).send('No product with id: ' + id);
});


export  {router};