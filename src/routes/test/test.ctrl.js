const { Router } = require("express");
const router = Router();

exports.get_root = async (req,res) => {
    try {
        res.send("Helloe World");
    } catch (err) {
        console.log(err);
        res.send("error");
    }
};
