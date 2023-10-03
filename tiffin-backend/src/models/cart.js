import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    isGuest: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firebaseId: String,
    mealPlans: [
        {
            startDate: Date,
            combo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Combo'
            },
            foodOption: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'FoodOption'
            },
            price: Number,
            meals: [
                {
                    deliveryDate: Date,
                    products: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Product'
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
                            product: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: "Product",
                            },
                            quantity: Number,
                        }
                    ]
                }
            ]
        }
    ],
    totalPrice: {
        type: Number,
        default: 0,
    },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
