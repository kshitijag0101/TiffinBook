import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isVegetarian: {
        type: Boolean,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
