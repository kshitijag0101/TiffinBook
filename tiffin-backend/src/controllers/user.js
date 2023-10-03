import mongoose from "mongoose";
import User from "../models/user.js";
import Order from "../models/order.js";
import bcrypt from "bcrypt";
import Cart from "../models/cart.js";

async function getUser(req, res) {
    try {
        const userId = req.body.userId;

        const user = await User.findOne({ firebaseId: userId });
        if (!user) {
            return res.status(404).json({ error: `user not found` });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
    }
}

async function createCartUtil(userId, cartId, firebaseId) {
    try {
        if (!userId) {
            const cart = new Cart({
                isGuest: true,
            });
            await cart.save();

            return cart._id;
        }

        if (!cartId) {
            const cart = new Cart({
                isGuest: false,
                userId: new mongoose.Types.ObjectId(userId),
                firebaseId: firebaseId
            });
            await cart.save();

            return cart._id;
        }

        const cart = await Cart.findById(cartId);

        cart.isGuest = false;
        cart.userId = new mongoose.Types.ObjectId(userId);
        cart.firebaseId = firebaseId;
        await cart.save();

        return cart._id;
    } catch (err) {
        console.log(err);
    }
}

async function userSignup(req, res) {
    try {
        const { name, email, phone, firebaseId, cartId } = req.body;

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            role: 'user',
            firebaseId: firebaseId
        });
        await user.save();

        await createCartUtil(user._id, cartId, firebaseId);

        return res.status(201).json({ user });
    }
    catch (err) {
        console.log(err);
    }
}

async function userSocialLogin(req, res){
    try {
        const { name, email, firebaseId, cartId } = req.body;

        let user = await User.findOne({ firebaseId: firebaseId });

        if (!user){
            user = new User({
                name: name,
                email: email,
                role: 'user',
                firebaseId: firebaseId
            });
            await user.save();

            console.log(user);

            await createCartUtil(user._id, cartId, firebaseId);

            return res.status(201).json({ user });
        }

        return res.status(200).json({ user });
    }
    catch (err){
        console.log(err);
    }
}

async function editUser(req, res) {
    try {
        console.log(req.user._id);
        let user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: `user not found` });
        }

        const { name, password, email, phone, deliveryAddress } = req.body;
        if (name) user.name = name;
        if (password)
            user.password = await bcrypt.hash(
                password,
                parseInt(process.env.SALT_ROUNDS)
            );
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (deliveryAddress) user.deliveryAddress = deliveryAddress;

        await user.save();

        return res.status(200).json({
            message: `user details updated`,
            user: user,
        });
    } catch (err) {
        console.log(err);
    }
}

async function createCart(req, res) {
    try {
        const cartId = await createCartUtil(null, null, null);
        return res.status(200).json({
            message: `cart created `,
            cartId: cartId,
        });
    } catch (err) {
        console.log(err);
    }
}

async function getCartByUser(req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const cart = await Cart.findOne({ userId: userId })
            .populate("mealPlans.meals.products")
            .populate("mealPlans.meals.substitutes")
            .populate("mealPlans.meals.addons.product")
            .populate("mealPlans.combo")
            .populate("mealPlans.foodOption");
        if (!cart) {
            return res.status(404).json({ error: `cart missing` });
        }

        return res.status(200).json({ cart });
    } catch (err) {
        console.log(err);
    }
}

async function getCartById(req, res) {
    try {
        const cartId = req.body.cartId;
        const cart = await Cart.findById(cartId)
            .populate("mealPlans.meals.products")
            .populate("mealPlans.meals.substitutes")
            .populate("mealPlans.meals.addons.product")
            .populate("mealPlans.combo")
            .populate("mealPlans.foodOption");
        if (!cart) {
            return res.status(404).json({ error: `cart missing` });
        }

        return res.status(200).json({ cart });
    } catch (err) {
        console.log(err);
    }
}

async function addToCart(req, res) {
    try {
        const { userId, cartId, meals, comboId, foodOptionId, price } = req.body;
        let cart;
        if (!userId) {
            cart = await Cart.findById(cartId);
        } else {
            cart = await Cart.findOne({ firebaseId: userId });
        }

        let startDate = new Date(meals[0].deliveryDate);
        for (let i = 0; i < meals.length; i++){
            meals[i].deliveryDate = new Date(meals[i].deliveryDate);

            if (meals[i].deliveryDate < startDate){
                startDate = meals[i].deliveryDate;
            }
        }
        const mealPlan = {
            startDate: startDate,
            price: price,
            meals: meals,
            combo: comboId,
            foodOption: foodOptionId,
        };

        cart.totalPrice += price;

        cart.mealPlans.push(mealPlan);
        await cart.save();

        return res.status(201).json({
            message: `meal plan added successfully`,
            mealPlan: mealPlan,
        });
    } catch (err) {
        console.log(err);
    }
}

async function removeFromCart(req, res) {
    try {
        const { userId, cartId, mealPlanId } = req.body;
        let cart;
        if (!userId) {
            cart = await Cart.findById(cartId);
        } else {
            cart = await Cart.findOne({ firebaseId: userId });
        }

        let removedMealPlan = null;
        cart.mealPlans = cart.mealPlans.filter((mealPlan) => {
            if (mealPlan._id == mealPlanId) {
                removedMealPlan = mealPlan;
                return false;
            }
            return true;
        });

        cart.totalPrice -= removedMealPlan.price;
        await cart.save();

        return res.status(201).json({
            message: `meal plan removed from cart`,
            cart: cart,
        });
    } catch (err) {
        console.log(err);
    }
}

async function userCheckout(req, res){
    try {
        if (req.user.verificationToken){
            return res.status(401).json({ error: `user not verified` });
        }

        const deliveryAddress = req.body.deliveryAddress;
        const cart = await Cart.find({ userId: req.user._id });
        if (!cart){
            return res.status(404).json({ error: `cart missing` });
        }

        const order = new Order({
            userInfo: {
                isGuest: false,
                userId: req.user._id,
                email: req.user.email,
                phone: req.user.phone,
                name: req.user.name
            },
            deliveryAddress: deliveryAddress,
            amount: cart.totalPrice,
            mealPlans: cart.mealPlans

        });
        await order.save();

        return res.status(201).json({
            message: `order placed successfully`,
            order: order
        });
    }
    catch (err){
        console.log(err);
    }
}

async function guestCheckout(req, res){
    try {
        const { cartId, email, phone, name, deliveryAddress } = req.body;

        const cart = await Cart.findById(cartId);
        if (!cart){
            return res.status(404).json({ error: `cart missing` });
        }

        const order = new Order({
            userInfo: {
                isGuest: true,
                email: email,
                phone: phone,
                name: name
            },
            deliveryAddress: deliveryAddress,
            amount: cart.totalPrice,
            mealPlans: cart.mealPlans
        });
        await order.save();

        return res.status(201).json({
            message: `order placed successfully`,
            order: order
        });
    }
    catch (err){
        console.log(err);
    }
}

async function getOrders(req, res){
    try {
        const orders = await Order.find({ "userInfo.userId": req.user._id })
            .populate("mealPlans.meals.products")
            .populate("mealPlans.meals.substitutes")
            .populate("mealPlans.meals.addons.product")
            .populate("mealPlans.combo")
            .populate("mealPlans.foodOption");

        return res.status(200).json({ orders });
    }
    catch (err){
        console.log(err);
    }
}

async function modifyMealPlan(req, res){
    try {
        // const comboId = req.body.comboId;
        // const price = req.body.price;

        const { orderId, mealPlanId, foodOptionId, meals } = req.body;

        const order = await Order.findById(orderId);
        if (!order){
            return res.status(404).json({ error: `order missing` });
        }

        for (let i = 0; i < meals.length; i++){
            meals[i].deliveryDate = new Date(meals[i].deliveryDate);
        }
        for (let i = 0; i < order.mealPlans.length; i++){
            if (order.mealPlans[i]._id == mealPlanId){
                // order.mealPlans[i].combo = comboId;
                order.mealPlans[i].foodOption = foodOptionId;
                // order.mealPlans[i].price = price;
                order.mealPlans[i].meals = meals;
            }
        }
        await order.save();

        return res.status(200).json({
            message: `meal plan updated successfully`,
            order: order
        });
    }
    catch (err){
        console.log(err);
    }
}

export {
    getUser,
    userSignup,
    userSocialLogin,
    editUser,
    getCartByUser,
    getCartById,
    createCart,
    addToCart,
    removeFromCart,
    userCheckout,
    guestCheckout,
    getOrders,
    modifyMealPlan,
};
