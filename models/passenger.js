import mongoose from "mongoose";

/* Mongoose import from */
const PassengersSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  PassengerId: { type: Number, required: true },
  Survived: { type: Number, required: true },
  Pclass: { type: Number, required: true },
  Name: { type: String, required: true },
  Sex: { type: String, required: true },
  Age: { type: Number, required: true },
  SibSp: { type: Number, required: true },
  Parch: { type: Number, required: true },
  Ticket: { type: String, required: true },
  Fare: { type: Number, required: true },
  Cabin: { type: String, required: true },
  Embarked: { type: String, required: true },
});

// Création d'un objet Modèle basé sur le schéma
const PassengerModel = mongoose.model("passenger", PassengersSchema);

export default PassengerModel;