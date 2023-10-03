import Product from "../models/product.js";

async function getProducts(req, res) {
    try {
        const products = await Product.find({ isAvailable: true });
        if (!products) {
            return res.status(404).json({ error: `no products found` });
        }

        return res.status(200).json({ products });
    } catch (err) {
        return res
            .status(err.statusCode)
            .json({ error: err.message, data: err.data });
    }
}

async function addProduct(req, res) {
    try {
        const { name, price, isVegetarian, isAvailable } = req.body;
        const product = new Product({
            name: name,
            price: price,
            isVegetarian: isVegetarian,
            isAvailable: isAvailable,
        });
        await product.save();

        return res.status(201).json({
            message: `product added successfully`,
            product: product,
        });
    } catch (err) {
        return res
            .status(err.statusCode)
            .json({ error: err.message, data: err.data });
    }
}

async function removeProduct(req, res) {
    try {
        if (!req.body.productId) {
            return res.status(400).json({ error: `no product id specified` });
        }
        const productId = req.body.productId;

        const product = await Product.findByIdAndRemove(productId);

        return res.status(200).json({
            message: `product removed successfully`,
            product: product,
        });
    } catch (err) {
        console.log(err);
    }
}

// async function queryProductsByDate(req, res){
//     try {
//         const date = new Date(req.body.date);
//         const day = date.getDay();

//         const products = await Product.find({ availableOn: day, isVisible: true });
//         if (!products) {
//             return res.status(404).json({ error: `no products found` });
//         }

//         return res.status(200).json({ products });
//     }
//     catch (err) {
//         return res
//             .status(err.statusCode)
//             .json({ error: err.message, data: err.data });
//     }
// }

export {
    getProducts,
    addProduct,
    removeProduct,
    // queryProductsByDate
};
