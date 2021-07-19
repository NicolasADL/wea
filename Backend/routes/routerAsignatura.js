//Hacer un join de la tabla de asignaturas con la tabla de archivos de asignaturas con un where con el id asignatura
const router=require("express").Router();
const {Asignatura,HorarioAsignatura,Archivo} = require("../models");



router.post("/nombre", async (req,res) => {
    try {
        const datos = await Asignatura.findAll({
            where:{
                id:req.body.idAsignatura
            },
        });
        res.send(datos);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})
router.post("/delete/:id",async(req,res) => {
    try {
        await Archivo.destroy({
            where:{
                id:req.params.id
            }
        })
        
    } catch (error) {
        
    }

})
router.post("/archivo",async (req,res) =>{
    try {
        const arch=Archivo.create(req.body)
        res.send(arch)
    } catch (error) {
        res.status(400).send(error)
        
    }
})

router.post("/", async (req,res) => {
    try {
        const datos = await Archivo.findAll({
            where:{
                idAsignatura:req.body.idAsignatura
            },
        });
        res.send(datos);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})

module.exports = router;