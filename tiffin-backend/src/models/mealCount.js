import mongoose from 'mongoose';

const mealCountSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
        unique: true
    }
});

const MealCount = mongoose.model('MealCount', mealCountSchema);

export default MealCount;