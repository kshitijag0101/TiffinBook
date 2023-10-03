import * as dotenv from 'dotenv';
dotenv.config();

import * as db from './src/db.js'
import app from './src/app.js';

const PORT = process.env.PORT || 5000;

async function startServer(){
    try {
        await db.connect();
        app.listen(PORT, ()=>{
            console.log(`app listening on port ${PORT}...`);
        });
    }
    catch (err){
        console.log(err);
    }
}

startServer();