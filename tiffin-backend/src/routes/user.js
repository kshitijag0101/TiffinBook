import { Router } from 'express';
import * as user from '../controllers/user.js'
import { authenticate } from '../controllers/auth.js';

const router = Router();

router.post('/', user.getUser);

router.post('/signup', user.userSignup);

router.post("/auth/google", user.userSocialLogin);

router.post("/auth/facebook", user.userSocialLogin);

router.post("/auth/phone", user.userPhoneLogin);

router.post('/edit', authenticate, user.editUser);

router.get('/check', authenticate, (req, res)=>{
    res.status(200).json({ message: `user is authenicated`, user: req.user });
});

router.get('/cart', authenticate, user.getCartByUser);

router.post('/cart', user.getCartById);

router.get('/cart/create', user.createCart);

router.post('/cart/add', user.addToCart);

router.post('/cart/remove', user.removeFromCart);

// router.post('/cart/update', user.updateCart);

router.post('/checkout', authenticate, user.userCheckout);

router.post('/checkout/guest', user.guestCheckout);

router.get('/orders', authenticate, user.getOrders);

router.post('/orders/modify', authenticate, user.modifyMealPlan);

export {
    router
};