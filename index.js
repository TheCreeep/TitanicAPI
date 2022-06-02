import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";

import PassengerModel from "./models/passenger.js";
import UserModel from "./models/user.js";

const app = express();
app.use(express.json());

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

    app.post("/register", async function (req, res) {
        const { password, email, username } = req.body
        try {
            await UserModel.find({ email: email })
                .then((docs) => {
                    if (docs.length > 0) {
                        res.json({ code: "EMAIL_ALREADY_USED", message: "Cette email est déjà utilisée" });
                    } else {
                        UserModel.create({
                            id: crypto.randomBytes(16).toString("hex"),
                            password: password,
                            email: email,
                            username: username,
                        })
                            .then((user) => {
                                res.json({ code: "USER_CREATED", message: "Votre compte a été créé avec succès", user: user });
                            })
                            .catch((err) => {
                                res.status(500).send(err.message);
                            });
                    }
                })
                .catch(() => {
                    res.status(500).send(err.message);

                });
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    app.post("/login", async function (req, res) {

        const { password, email } = req.body

        try {
            await UserModel.find({ email: email, password: password })
                .then((docs) => {
                    if (docs.length > 0) {
                        res.json({ code: "LOGIN_SUCCESS", message: "Vous êtes connecté avec succès", user: docs[0] });
                    } else {
                        res.json({ code: "LOGIN_FAILED", message: "Identifiants incorrects" });
                    }
                }
                );
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

}

app.listen(3000);
