import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userInfo: {
        isGuest: {
            type: Boolean,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: String,
        phone: String,
        name: String
    },
    deliveryAddress: {
        streetAddress: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    amount: {
        type: Number,
        required: true
    },
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
    ]
},
{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;