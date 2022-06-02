import mongoose from "mongoose";

/* Mongoose import from */
const UsersSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Création d'un objet Modèle basé sur le schéma
const UserModel = mongoose.model("user", UsersSchema);

export default UserModel;