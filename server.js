import cors from 'cors';
import express from "express";
import connect from './database/mongodb.js'
import bodyParser from 'body-parser'

import passport from 'passport';
import passportConfig from './config/passport.js';
import * as dotenv from 'dotenv'
import routes from './routes/index.js'

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.get('/', (req, res) => {
    res.send("hello akshay")
})


app.use('/',routes)



app.listen(PORT, async() => {
    await connect();
    console.log(`server is running at http://localhost:${PORT}`)
})