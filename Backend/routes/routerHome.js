const router=require("express").Router();
const {Estudiante,Apoderado,Profesor} = require("../models");

router.get("/estudiante", async (req,res) => {
    try {
        const datos = await Estudiante.findOne({
            where:{
                id:req.body.id
            }
        });
        res.send(datos);
    } catch (error) {
        res.status(400).send('Error query');
    }
})

module.exports = router;