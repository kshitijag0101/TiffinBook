import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    role: String,   // 'user', 'order-viewer', 'menu-editor', 'admin'
    deliveryAddress: {
        streetAddress: String,
        city: String,
        state: String,
        pincode: String
    },
    firebaseId: {
        type: String,
        unique: true,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;