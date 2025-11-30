import express from 'express'
import session from 'express-session'
import http from 'http'

import marketRoute from './routes/marketRoute.js'
import fumoRoute from './routes/fumoRoute.js'
import collectorRoute from './routes/collectorRoute.js'
import authRoute from './routes/authRoute.js'


const app = express();

// Middlewares
app.use(express.static("./public"));
app.use(session({
    secret: 'NO_SECRET_ENV_YET',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 6 
    }
}));
app.use(express.json());

// Routes
app.use('/auth', authRoute);
app.use('/collector', collectorRoute);
app.use('/fumo',  fumoRoute);
app.use('/market',  marketRoute);

// Let's go
const PORT = 3000
console.log("Listening on port " + PORT);
app.listen(PORT);
