const { Router } = require("express");
const router = Router();

exports.get_root = async (req,res) => {
    try {
        res.status(200).send("Helloe World");
    } catch (err) {
        console.log(err);
        res.send("error");
    }
};
