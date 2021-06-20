const router=require("express").Router();
const {Estudiante,Apoderado,Profesor,Curso} = require("../models");

router.post("/estudiante", async (req,res) => {
    try {
        const datos = await Curso.findOne({
            where:{
                id:req.body.id
            }
        });
        res.send(datos);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})

module.exports = router;