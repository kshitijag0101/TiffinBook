import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL;
async function connect(){
    try {
        await mongoose.connect(DB_URL);
        console.log(`connection established with tiffin db...`);
    }
    catch (err){
        console.log(err);
    }
}

export {
    connect
};