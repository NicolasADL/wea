const router=require("express").Router();
const {User} = require("../models");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');

router.post("/registro", async(req,res) => {
    try {
        const rutValid = await User.findOne({
            where: {
                rut: req.body.rut,
            },
        });
        if(rutValid) return res.status(400).send("rut ya existe");
        const salt = await bcrypt.genSalt(8);
        const hashPass = await bcrypt.hash(req.body.pass,salt);
        const user= await User.create({
            rut:req.body.rut,
            name:req.body.name,
            pass: hashPass
        })
        return res.send(user);
    } 
    catch (error) {
        
    }
});
router.post("/login", async(req,res) => {
    try {
        const rutValid = await User.findOne({
            where: {
                rut: req.body.rut,
            },
        });
        if(!rutValid) return res.status(400).send("rut no valido");
        const validPass = await bcrypt.compare(req.body.pass, rutValid.pass)
        if(!validPass) return res.status(400).send("rut o pass no valido");
        const token = jwt.sign({id:rutValid.id},process.env.SECRET_TOKEN);
        return res.header("auth-token",token).send(rutValid);
    } 
    catch (error) {
        return res.status(400).send(error);
    }
});
module.exports = router