import mongoose from 'mongoose';

const comboSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    mealCounts: [
        {
            mealCount: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MealCount'
            },
            price: Number
        }
    ]
});

const Combo = mongoose.model('Combo', comboSchema);

export default Combo;