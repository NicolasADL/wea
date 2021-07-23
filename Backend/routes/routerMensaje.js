const router=require("express").Router();
const {Estudiante,Profesor,Curso,Mensaje,Apoderado,Asignatura} = require("../models");
const { Op } = require("sequelize");

router.post("/alumnos", async (req,res) => {
    try {
        const allEstudiantes = await Estudiante.findAll({
            where:{
                idCurso:req.body.idCurso
            },
            attributes:["rut","nombre"],
            include:{model:Apoderado,attributes:["rut","nombre"]}
        });
        res.send(allEstudiantes);
    } catch (error) {
        res.status(400).send(error);
    }
})



router.post("/cosa", async (req,res) => {
    try {
        const allEstudiantes = await Profesor.findAll({
            where:{
                rut:req.body.rut
            },
            include:[{model:Curso}]
        });
        res.send(allEstudiantes);
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("/cosa1", async (req,res) => {
    try {
        const allEstudiantes = await Profesor.findAll({
            where:{
                rut:req.body.rut
            },
            include:[{model:Asignatura}]
        });
        res.send(allEstudiantes);
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("/enviar", async (req,res) => {
    try {
        const mensaje = await Mensaje.create(req.body
    );
        res.send(mensaje);
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
})
router.post("/m", async (req,res) => {
    try {
        const mensaje = await Mensaje.findAll({
            where:{
                idReceiver: {[Op.contains]:[req.body.rut]}
            }
        }
        
    );  
        res.send(mensaje);
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
})
router.post("/e", async (req,res) => {
    try {
        const mensaje = await Mensaje.findAll({
            where:{
                idSender:req.body.rut
            }
        }
        
    );  
        res.send(mensaje);
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
})
module.exports = router