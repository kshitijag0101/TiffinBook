import mongoose from 'mongoose';

const foodOptionSchema = new mongoose.Schema({
    type : {
        type: String,
        required: true,
        unique: true
    }
});

const FoodOption = mongoose.model('FoodOption', foodOptionSchema);

export default FoodOption;