const express= require("express");

const router = express.Router();

const {Estudiante} = require('../models');
const curso = require("../models/curso");

router.get("/", async (req,res) => {
    try {
        const allEstudiantes = await Estudiante.findAll();
        res.send(allEstudiantes);
    } catch (error) {
        res.status(400).send('Error query');
    }
})
router.post("/", async (req,res) => {
    console.log(req.body)
    try {
        const genEstudiantes = await Estudiante.create(req.body);
        res.send(genEstudiantes);
    } catch (error) {
        res.status(400).send('Error query');
    }
})
module.exports = router;