const express= require("express");

const router = express.Router();

const {User} = require('../models');

router.get("/", async (req,res) => {
    try {
        const allUsers = await User.findAll();
        res.send(allUsers);
    } catch (error) {
        res.status(400).send('Error query');
    }
})
router.post("/", async (req,res) => {
    try {
        const genUsers = await User.create(req.body);
        res.send(genUsers);
    } catch (error) {
        res.status(400).send('Error query');
    }
})
module.exports = router;