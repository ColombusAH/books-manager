import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    itemsInStock : {
        type: Number,
        required: true,

    }
});

const ProductModel = mongoose.model('Product', productSchema);
export {ProductModel};