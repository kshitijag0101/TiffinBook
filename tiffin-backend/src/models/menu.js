import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: String,
    description: String,

    // [ monday, tuesday, ..., saturday]
    oddWeek: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal'
        }
    ],
    evenWeek: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal'
        }
    ]
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;