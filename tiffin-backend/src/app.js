import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { jwtStrategy, googleStrategy, facebookStrategy } from './controllers/auth.js';
import { router as homeRouter } from './routes/home.js';
import { router as userRouter } from './routes/user.js';
import { router as adminRouter } from './routes/admin.js';
import cors from 'cors';

const app = express();

app.use(
    cors({
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        origin: ['http://localhost:3000', 'https://tiffin-theta.vercel.app'],
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);
app.use(passport.initialize());

app.use('/', homeRouter);

app.use('/user', userRouter);

app.use('/admin', adminRouter);

export default app;
