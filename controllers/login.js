import UserModel from "../models/user.js";
import crypto from "crypto";


export const RegisterController = async function (req, res) {
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
                            req.session.user = user;
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
}

export const LoginController = async function (req, res) {

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
}

