import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    name: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    substitutes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    addons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;