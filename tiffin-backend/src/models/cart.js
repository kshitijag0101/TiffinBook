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
    // products: [
    //     {
    //         deliveryDate: {
    //             type: Date,
    //             required: true
    //         },
    //         product: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'Product',
    //             required: true
    //         },
    //         quantity: {
    //             type: Number,
    //             required: true,
    //             default: 1
    //         }
    //     }
    // ]
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
