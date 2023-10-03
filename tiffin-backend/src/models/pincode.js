import mongoose from 'mongoose';

const pincodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true,
        unique: true
    },
    deliverable: {
        type: Boolean,
        required: true
    }
});

const Pincode = mongoose.model('Pincode', pincodeSchema);

export default Pincode;