import express from "express";
import mongoose from "mongoose";

import session from "express-session";

import router from './routes/route.js';

const app = express();
app.use(express.json());

app.use('/', router);


mongoose
    .connect("mongodb://localhost:27017/titanic", {
        useNewUrlParser: true,
        useUnifiedTopology: true, // options qui évitent des warnings inutiles
    })


app.listen(3000);
