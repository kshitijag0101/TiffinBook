import Pincode from '../models/pincode.js';

async function getPincodes(req, res){
    try {
        const pincodes = await Pincode.find({});

        return res.status(200).json({ pincodes });
    }
    catch (err){
        console.log(err);
    }
}

async function checkPincode(req, res){
    try {
        if (!req.body.pincode){
            return res.status(201).json({ error: `Please enter a pincode` });
        }
        const pincode = req.body.pincode;

        const resultPincode = await Pincode.findOne({ pincode: pincode });
        if (!resultPincode) {
            return res.status(201).json({ error: `Sorry, we haven't expanded to that area yet. Please check back later` });
        }

        if (!resultPincode.deliverable){
            return res.status(201).json({ error: `We're currently not delivering to this area, but we'll be back soon. Check again later` });
        }

        return res.status(200).json({ resultPincode });
    }
    catch (err){
        console.log(err);
    }
}

async function addPincode(req, res){
    try {
        const { name, pincode } = req.body;

        const newPincode = new Pincode({
            name: name,
            pincode: pincode,
            deliverable: true
        });

        await newPincode.save();

        return res.status(201).json({ newPincode });
    }
    catch (err){
        console.log(err);
    }
}

async function removePincode(req, res){
    try {
        const pincode = req.body.pincode;

        const resultPincode = await Pincode.findOneAndRemove({ pincode: pincode });
        if (!resultPincode){
            return res.status(404).json({ error: `pincode missing` });
        }

        res.status(200).json({
            message: `pincode removed successfully`,
            pincode: resultPincode
        });
    }
    catch (err){
        console.log(err);
    }
}

async function enablePincode(req, res){
    try {
        const pincode = req.body.pincode;

        const resultPincode = await Pincode.findOne({ pincode: pincode });
        if (!resultPincode){
            return res.status(404).json({ error: `pincode missing` });
        }

        resultPincode.deliverable = true;
        await resultPincode.save();

        return res.status(200).json({
            message: `pincode enabled successfully`,
            pincode: resultPincode
        });
    }
    catch (err){
        console.log(err);
    }
}

async function disablePincode(req, res){
    try {
        const pincode = req.body.pincode;

        const resultPincode = await Pincode.findOne({ pincode: pincode });
        if (!resultPincode){
            return res.status(404).json({ error: `pincode missing` });
        }

        resultPincode.deliverable = false;
        await resultPincode.save();

        return res.status(200).json({
            message: `pincode disabled successfully`,
            pincode: resultPincode
        });
    }
    catch (err){
        console.log(err);
    }
}

export {
    getPincodes,
    checkPincode,
    addPincode,
    removePincode,
    enablePincode,
    disablePincode
};