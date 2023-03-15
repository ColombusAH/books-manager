import express from 'express';
import { router as productRouter } from './products/routes';
// import { productsRouter } from './products/routes';
import mongoose from 'mongoose';

const app = express();
const jsonParser = express.json();
const port = 3001;

app.use(jsonParser);
app.use(express.urlencoded({ extended: true }));


app.use('/products',productRouter);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
  });
});



async function connectDb() {
  try{
    await mongoose.connect('mongodb+srv://hattabavner:demo@cluster0.vp9ynou.mongodb.net/?retryWrites=true&w=majority', {});
    console.log('connected to the db');
   
   } catch {
    console.log('Error connecting to database');
   }
}