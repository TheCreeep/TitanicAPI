
import PassengerModel from "../models/passenger.js";

export const DataController = async function (req, res) {
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
}

export const SearchController = async function (req, res) {
    try {
        await PassengerModel.find(req.query)
            .sort({ PassengerId: 1 })
            .then((docs) => {
                res.json(docs);
            }
            );
    } catch (err) {
        res.status(500).send(err.message);
    }
}
