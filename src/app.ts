import express, {Errback, NextFunction, Request, Response} from 'express';
import { uuid } from 'uuidv4';
import { validateAddBookDto, validateIdLength, validateProductNameLength } from './middlewares/validations'; 
import * as products from './data/products.json';
// import { productsRouter } from './products/routes';

const app = express();
const jsonParser = express.json();
const port = 3001;

app.use(jsonParser);
app.use(express.urlencoded({ extended: true }));


interface Product {
  id: string;
  categoryId: string;
  name: string;
  itemsInStock: number;
}

interface DB {
  products: Product[];
}

const db: DB =  {
  products: []
}

app.get('/products', (req: Request, res: Response) => {
  res.status(200).send(db.products);
});

app.get('/products/:id',validateIdLength, (req: Request, res: Response) => {
  const id = req.params.id;
  const product = db.products.find(product => product.id === id);
  if(product) {
    return res.status(200).send(product);
  }
  return res.status(404).send('No product with id: ' + id);
})

app.post('/products',validateProductNameLength, (req: Request, res: Response) => {
  const { categoryId, name, itemsInStock } = req.body;
  const product = {
    id: uuid(),
    categoryId,
    name,
    itemsInStock
  }
  db.products.push(product);
  res.status(201).send(product);
});

app.put('/products/:id',validateIdLength,validateProductNameLength, (req: Request, res: Response) => {
  const id = req.params.id;
  const { categoryId, name, itemsInStock } = req.body;
  const product = db.products.find(product => product.id === id);
  if(product) {
    product.categoryId = categoryId;
    product.name = name;
    product.itemsInStock = itemsInStock;
    return res.status(200).send(product);
  }
  return res.status(404).send('No product with id: ' + id);
})


app.delete('/products/:id',validateIdLength, (req: Request, res: Response) => {
  const id = req.params.id;
  const product = db.products.find(product => product.id === id);
  if(product) {
    db.products = db.products.filter(product => product.id !== id);
    return res.status(204).send(product);
  }
  return res.status(404).send('No product with id: ' + id);
});

app.listen(port, () => {
  db.products = products.data;
  console.log(`server is running on port ${port}.`);
});