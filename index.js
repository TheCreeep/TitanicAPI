import express from "express";
import mongoose from "mongoose";

import PassengerModel from "./models/passenger.js";

const app = express();

mongoose
    .connect("mongodb://localhost:27017/titanic", {
        useNewUrlParser: true,
        useUnifiedTopology: true, // options qui évitent des warnings inutiles
    })
    .then(init);

async function init() {
    app.get("/", function (req, res) {
        res.send("Welcome to Titanic API")
    });

    app.get("/data", async function (req, res) {
        try {
            await PassengerModel.find({})
                .sort({ PassengerId: 1 })
                .then((docs) => {
                    res.json(docs);
                }
                );
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    app.get("/data/search", async function (req, res) {
        try {
            console.log(req.query);
            await PassengerModel.find(req.query)
                .sort({ PassengerId: 1 })
                .then((docs) => {
                    res.json(docs);
                }
                );
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

}

app.listen(3000);
