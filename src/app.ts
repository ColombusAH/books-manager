import express from 'express';
import { router as productRouter } from './products/routes';
// import { productsRouter } from './products/routes';

const app = express();
const jsonParser = express.json();
const port = 3001;

app.use(jsonParser);
app.use(express.urlencoded({ extended: true }));


app.use('/products',productRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});