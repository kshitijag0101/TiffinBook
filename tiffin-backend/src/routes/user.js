import { Router } from 'express';
import * as user from '../controllers/user.js'
import { authenticate, googleScopeSetup, googleAuthenticate, facebookScopeSetup, facebookAuthenticate } from '../controllers/auth.js';
import passport from 'passport';

const router = Router();

router.post('/', user.getUser);

router.post('/signup', user.userSignup);

router.post('/login', user.userLogin);

router.get("/auth/google", googleScopeSetup);

router.get("/auth/google/account", googleAuthenticate, user.userSocialLogin);

router.get("/auth/facebook", facebookScopeSetup);
 
router.get("/auth/facebook/account", facebookAuthenticate, user.userSocialLogin);

router.get('/:userId/verify/:token', user.verifyUser);

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