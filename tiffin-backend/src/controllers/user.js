import mongoose from "mongoose";
import User from "../models/user.js";
import Order from "../models/order.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cart from "../models/cart.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

async function getUser(req, res) {
    try {
        const userId = req.body.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: `user not found` });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
    }
}

async function userLogin(req, res) {
    try {
        if (!req.body.email) {
            return res.status(400).json({ error: `email missing` });
        }
        if (!req.body.password) {
            return res.status(400).json({ error: `password missing` });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: `user not found` });
        }

        const result = bcrypt.compare(req.body.password, user.password);

        if (result) {
            const payload = {
                email: user.email,
                name: user.name,
                _id: user._id,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });

            return res.status(201).json({ user, token });
        } else {
            return res.status(401).json({ message: `wrong user credentials` });
        }
    } catch (err) {
        console.log(err);
    }
}

async function createCartUtil(userId, cartId) {
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
            });
            await cart.save();

            return cart._id;
        }

        const cart = await Cart.findById(cartId);

        cart.isGuest = false;
        cart.userId = new mongoose.Types.ObjectId(userId);
        await cart.save();

        return cart._id;
    } catch (err) {
        console.log(err);
    }
}

async function userSignup(req, res) {
    try {
        if (!req.body.email) {
            return res.status(400).json({ error: `email missing` });
        }
        if (!req.body.password) {
            return res.status(400).json({ error: `password missing` });
        }
        if (!req.body.name) {
            return res.status(400).json({ error: `name missing` });
        }

        const { email, name, phone } = req.body;
        const cartId = req.body.cartId;
        const password = await bcrypt.hash(
            req.body.password,
            parseInt(process.env.SALT_ROUNDS)
        );

        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                console.log(err);
            }

            const token = buffer.toString("hex");

            const user = new User({
                name: name,
                email: email,
                password: password,
                phone: phone,
                verificationToken: token,
                isAdmin: false,
            });
            await user.save();

            await createCartUtil(user._id, cartId);

            await generateVerificationMail(user._id, email, token);

            return res.status(201).json({ user });
        });
    } catch (err) {
        console.log(err);
    }
}

async function generateVerificationMail(userId, email, token) {
    try {
        await transporter.sendMail({
            to: email,
            from: process.env.EMAIL,
            subject: `verify email to start ordering`,
            html: `<a href="http://localhost:5000/user/${userId}/verify/${token}">Click Here</a>`,
        });
    } catch (err) {
        console.log(err);
    }
}

async function verifyUser(req, res) {
    try {
        const userId = req.params.userId;
        const token = req.params.token;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: `user not found` });
        }

        if (user.verificationToken === token) {
            user.verificationToken = null;
            await user.save();

            return res.status(200).json({ success: true, user: user });
        }
        return res.status(200).json({ success: false });
    } catch (err) {
        console.log(err);
    }
}

async function userSocialLogin(req, res){
    try {
        const user = await User.findById(req.user._id);
        if (user){
            const payload = {
                email: user.email,
                name: user.name,
                _id: user._id,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            return res.status(201).json({ user, token });
        }
        return res.status(404).json({ error: `user not found` });
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
        const cartId = await createCartUtil(null, null);
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
            cart = await Cart.findOne({ userId: userId });
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
            cart = await Cart.findOne({ userId: userId });
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
    userLogin,
    userSignup,
    verifyUser,
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
