import { auth } from "../../config/firebase.js";
import User from "../models/user.js";

function extractFirebaseJwtFromAuthHeaderAsBearerToken(req){
    let token = null;

    if (req.headers['authorization']){
        token = req.headers['authorization'].split(' ')[1];
    }

    return token;
}

async function decodeFirebaseJwt(token){
    try {
        const payload = await auth.verifyIdToken(token);
        if (!payload){
            return { err: null, user: false, email_verified: false };
        }

        try {
            const user = await User.findOne({ firebaseId: payload.uid });

            if (user){
                return { err: null, user: user, email_verified: payload.email_verified };
            }
            else {
                return { err: null, user: false, email_verified: false };
            }
        }
        catch (err){
            return { err: err, user: false, email_verified: false };
        }
    }
    catch (err){
        console.log(typeof err.code, err.code);
    }
}

async function authenticate(req, res, next){

    const token = extractFirebaseJwtFromAuthHeaderAsBearerToken(req);

    const { err, user, email_verified } = await decodeFirebaseJwt(token);
    
    if (err || !user){
        return res.status(401).json({ error: `user not authenticated` });
    }

    req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        firebaseId: user.firebaseId,
        email_verified: email_verified
    };

    next();
}

function adminAuthenticate(role = 'admin'){
    return function(req, res, next){
        if (req.user && req.user.role === role){
            next();
        }
        else {
            return res.status(401).json({ error: `user not authorized` });
        }
    };
}

export {
    authenticate, 
    adminAuthenticate
};
