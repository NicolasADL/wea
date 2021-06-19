const router=require("express").Router();
const {Estudiante} = require("../models");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');

router.post("/registro", async(req,res) => {
    try {
        const rutValid = await Estudiante.findOne({
            where: {
                rut: req.body.rut,
            },
        });
        if(rutValid) return res.status(400).send("rut ya existe");
        const salt = await bcrypt.genSalt(8);
        const hashPass = await bcrypt.hash(req.body.password,salt);
        const user= await Estudiante.create({
            rut:req.body.rut,
            nombre:req.body.nombre,
            password: hashPass
        })
        return res.send(user);
    } 
    catch (error) {
        
        
    }
});
router.post("/login", async(req,res) => {
    try {
        const rutValid = await Estudiante.findOne({
            where: {
                rut: req.body.rut,
            },
        });
        if(!rutValid) return res.status(400).send("rut no valido");
        const validPass = await bcrypt.compare(req.body.password, rutValid.password)
        if(!validPass) return res.status(400).send("rut o pass no valido");
        const token = jwt.sign({id:rutValid.id},process.env.SECRET_TOKEN);
        return res.header("auth-token",token).send(rutValid);
    } 
    catch (error) {
        return res.status(400).send(error);
    }
});
module.exports = router