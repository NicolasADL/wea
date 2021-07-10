const router=require("express").Router();
const {Estudiante,Apoderado,Profesor,Curso,Asignatura,HorarioAsignatura,Archivo} = require("../models");
const bcrypt = require("bcrypt");



router.get("/", async (req,res) => {
    try {
        const allCursos = await Curso.findAll();
        res.send(allCursos);
        
    } catch (error) {
        res.status(400).send('Error query');
    }
})
router.get("/a", async (req,res) => {
    try {
        const allAsignaturas = await Asignatura.findAll();
        res.send(allAsignaturas);
    } catch (error) {
        res.status(400).send('Error query');
    }
})
router.get("/e", async (req,res) => {
    try {
        const allEstudiantes = await Estudiante.findAll();
        res.send(allEstudiantes);
    } catch (error) {
        res.status(400).send(error);
    }
})
router.get("/p", async (req,res) => {
    try {
        const allProfesors = await Profesor.findAll();
        res.send(allProfesors);
    } catch (error) {
        res.status(400).send('Error query');
    }
})
router.get("/h", async (req,res) => {
    try {
        const allHorarios = await HorarioAsignatura.findAll();
        res.send(allHorarios);
    } catch (error) {
        res.status(400).send('Error query');
    }
})
router.post("/estudiante/delete", async (req,res) =>{
    try {
        await Estudiante.destroy({
            where:{
                rut:req.body.rut
            }
        })
        return res.status(200).send("Deleted")
        
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("/profesor/delete", async (req,res) =>{
    try {
        await Profesor.destroy({
            where:{
                rut:req.body.rut
            }
        })
        return res.status(200).send("Deleted")
        
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("/apoderado/delete", async (req,res) =>{
    try {
        await Apoderado.destroy({
            where:{
                rut:req.body.rut
            }
        })
        return res.status(200).send("Deleted")
        
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("/estudiante", async (req,res) => {
    try {
        const rutValid = await Estudiante.findOne({
            where:{
                rut:req.body.rut,
            },
        });
        if(rutValid){
            if(req.body.password!=null){
                const salt = await bcrypt.genSalt(8);
                const hashPass = await bcrypt.hash(req.body.password,salt);
                req.body.password=hashPass;
            }
            const user=await Estudiante.update(
                {password:req.body.password,
                nombre:req.body.nombre,
                registrado:req.body.registrado,
                idCurso:req.body.idCurso},{
                    where:{
                        rut:req.body.rut
                    }
                })
            return res.send(user)
        }
        else{
            if(req.body.password!=null){
                const salt = await bcrypt.genSalt(8);
                const hashPass = await bcrypt.hash(req.body.password,salt);
                req.body.password=hashPass;
            }
            const user= await Estudiante.create(req.body)
            return res.send(user)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})
router.post("/profesor", async (req,res) => {
    try {
        const rutValid = await Profesor.findOne({
            where:{
                rut:req.body.rut,
            },
        });
        if(rutValid){
            if(req.body.password!=null){
                const salt = await bcrypt.genSalt(8);
                const hashPass = await bcrypt.hash(req.body.password,salt);
                req.body.password=hashPass;
            }
            const user=await Profesor.update(
                {password:req.body.password,
                nombre:req.body.nombre,
                registrado:req.body.registrado,
                jefe:req.body.jefe},{
                    where:{
                        rut:req.body.rut
                    }
                })
            return res.send(user)
        }
        else{
            if(req.body.password!=null){
                const salt = await bcrypt.genSalt(8);
                const hashPass = await bcrypt.hash(req.body.password,salt);
                req.body.password=hashPass;
            }
            const user= await Profesor.create(req.body)
            return res.send(user)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})
router.post("/apoderado", async (req,res) => {
    try {
        const rutValid = await Apoderado.findOne({
            where:{
                rut:req.body.rut,
            },
        });
        if(rutValid){
            if(req.body.password!=null){
                const salt = await bcrypt.genSalt(8);
                const hashPass = await bcrypt.hash(req.body.password,salt);
                req.body.password=hashPass;
            }
            const user=await Apoderado.update(
                {password:req.body.password,
                nombre:req.body.nombre,
                registrado:req.body.registrado,
                idEstudiante:req.body.idEstudiante},{
                    where:{
                        rut:req.body.rut
                    }
                })
            return res.send(user)
        }
        else{
            if(req.body.password!=null){
                const salt = await bcrypt.genSalt(8);
                const hashPass = await bcrypt.hash(req.body.password,salt);
                req.body.password=hashPass;
            }
            const user= await Apoderado.create(req.body)
            return res.send(user)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})
router.post("/curso/delete", async (req,res) => {
    try {
        await Curso.destroy({
            where:{
                id:req.body.idCurso
            }
        });
        return res.status(200).send("Deleted");
    } catch (error) {
        res.status(400).send('Error query');
    }
})
router.post("/curso", async (req,res) => {
    try {
        const cur = await Curso.findOne({
            where:{
                id:req.body.idCurso
            }
        })
        if(!cur){
            const cur = await Curso.create(req.body);
            return res.send(cur);
        }else{
            const cur = await Curso.update({idProfesor:req.body.idProfesor,grado:req.body.grado},{where:{id:req.body.idCurso}})
            return res.send(cur)
        }
        
        
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("/asignatura/delete", async (req,res) => {
    try {
        await Asignatura.destroy({
            where:{
                id:req.body.idAsignatura
            }
        });
        return res.status(200).send("Deleted");
    } catch (error) {
        res.status(400).send('Error query');
    }
})
router.post("/asignatura", async (req,res) => {
    try {
        const cur = await Asignatura.findOne({
            where:{
                id:req.body.idAsignatura
            }
        })
        if(!cur){
            const cur = await Asignatura.create(req.body);
            return res.send(cur);
        }else{
            const cur = await Asignatura.update({idProfesor:req.body.idProfesor,
                idCurso:req.body.idCurso,
                nombre:req.body.nombre,
                semestre:req.body.semestre},{where:{id:req.body.idAsignatura}})
            return res.send(cur)
        }
        
        
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("/horario/delete", async (req,res) => {
    try {
        const hor = await HorarioAsignatura.destroy({
            where:{id:req.body.id}
        })
        return res.send(hor)
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("/horario", async (req,res) => {
    try {
        const hor = await HorarioAsignatura.create(req.body)
        return res.send(hor)
    } catch (error) {
        res.status(400).send(error);
    }
})
router.get("/ar", async (req,res) => {
    try {
        const allArch = await Archivo.findAll();
        res.send(allArch);
    } catch (error) {
        res.status(400).send('Error query');
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


module.exports = router