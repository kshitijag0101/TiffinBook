import User from "../models/user.js";
import Cart from "../models/cart.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";

/**********  Jwt Strategy  **********/

const jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
const jwtStrategy = new JwtStrategy(jwtStrategyOptions, async (payload, cb) => {
    try {
        const user = await User.findById(payload._id);
        
        if (user){
            return cb(null, user);
        } 
        else {
            return cb(null, false);
        }
    }
    catch (err){
        return cb(err, false);
    }
});


/**********  Google Strategy  **********/

const googleStrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/user/auth/google/account"
};
const googleStrategy = new GoogleStrategy(googleStrategyOptions, async (accessToken, refreshToken, profile, cb) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user){
            user = new User({
                name: profile._json.name,
                email: profile._json.email,
                googleId: profile._json.sub,
                verificationToken: null,
                isAdmin: false,
            });
            await user.save();

            const cart = new Cart({
                isGuest: false,
                userId: user._id,
            });
            await cart.save();
        }

        return cb(null, user);
    }
    catch (err){
        return cb(err, false);
    }
});


/**********  Facebook Strategy  **********/

const facebookStrategyOptions = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/user/auth/facebook/account"
};
const facebookStrategy = new FacebookStrategy(facebookStrategyOptions, async (accessToken, refreshToken, profile, cb) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });

        if (!user){
            user = new User({
                name: profile._json.name,
                facebookId: profile._json.id,
                verificationToken: null,
                isAdmin: false,
            });
            await user.save();

            const cart = new Cart({
                isGuest: false,
                userId: user._id,
            });
            await cart.save();
        }
        
        return cb(null, user);
    }
    catch (err){
        return cb(err, false);
    }
});

async function authenticate(req, res, next) {
    const customAuthenticationHandler = passport.authenticate(
        "jwt",
        { session: false },
        (err, user) => {
            if (err || !user) {
                return res
                    .status(401)
                    .json({ error: `user not authenticated` });
            } else {
                req.user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    verificationToken: user.verificationToken,
                };
                return next();
            }
        }
    );

    return customAuthenticationHandler(req, res, next);
}

async function adminAuthenticate(req, res, next) {
    const customAuthenticationHandler = passport.authenticate(
        "jwt",
        { session: false },
        (err, user) => {
            if (err || !user) {
                return res
                    .status(401)
                    .json({ error: `user not authenticated` });
            } else if (!user.isAdmin) {
                return res.status(401).json({ error: `user not authorized` });
            } else {
                req.user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                };
                return next();
            }
        }
    );

    return customAuthenticationHandler(req, res, next);
}

async function googleScopeSetup(req, res, next){
    passport.authenticate(
        "google", 
        { 
            scope: ["profile", "email"], 
            prompt: "select_account", 
            session: false 
        })(req, res, next);
}

async function googleAuthenticate(req, res, next){
    const customAuthenticationHandler = passport.authenticate(
        "google",
        { session: false },
        (err, user) => {
            if (err || !user){
                return res.status(401).josn({ error: `user not authenticated` });
            }
            else {
                req.user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    verificationToken: user.verificationToken,
                };
                return next();
            }
        }
    );

    return customAuthenticationHandler(req, res, next);
}

async function facebookScopeSetup(req, res, next){
    passport.authenticate(
        "facebook", 
        {
            scope: ["public_profile"],
            session: false 
        })(req, res, next);
}

async function facebookAuthenticate(req, res, next){
    const customAuthenticationHandler = passport.authenticate(
        "facebook",
        { session: false },
        (err, user) => {
            if (err || !user){
                return res.status(401).josn({ error: `user not authenticated` });
            }
            else {
                req.user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    verificationToken: user.verificationToken,
                };
                return next();
            }
        }
    );

    return customAuthenticationHandler(req, res, next);
}

export { 
    jwtStrategy, 
    googleStrategy, 
    facebookStrategy,
    authenticate, 
    adminAuthenticate,
    googleScopeSetup,
    googleAuthenticate,
    facebookScopeSetup,
    facebookAuthenticate
};
