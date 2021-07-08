const router=require("express").Router();
const {Estudiante,Apoderado,Profesor,Curso,Asignatura,HorarioAsignatura} = require("../models");

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
router.post("/asignaturas/horario", async (req,res) => {
    try {
        const datos = await HorarioAsignatura.findAll({
            include:{
            model: Asignatura,
            attributes:['nombre'],
            },
        },{
            where:{
                idCurso:req.body.id
            },
            order:[[HorarioAsignatura,'dia','ASC']]
        });
        res.send(datos);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})
router.post("/asignaturas", async (req,res) => {
    try {
        const datos = await Asignatura.findAll({
            where:{
                idCurso:req.body.id
            }
        });
        res.send(datos);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})

module.exports = router;