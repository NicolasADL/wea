import React,{useState,useEffect} from 'react'
import axios from "axios";
import Navb from '../components/navb';
import { Container, Form, Modal,Button, Card, Accordion, Row ,Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';

const dotenv = require("dotenv");
dotenv.config();
function Mensaje() {
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const name = useSelector((store) => store.authReducer.Name);
    const tipo= useSelector((store) => store.authReducer.tipo);
    const rut= useSelector((store) => store.authReducer.Rut);
    const jef= useSelector((store) => store.authReducer.Jefe);
    const [curso,setCurso] = useState([])
    const [curso2,setCurso2] = useState([])
    const [show, setShow] = useState(false);
    const [mensaje,setMensaje] = useState([])
    const [enviado,setEnviado] = useState([])
    const [alumnos,setAlumnos] = useState([])
    const [alumnos1,setAlumnos1] = useState([])
    const [dest,setDest] = useState([])
    const [dest1,setDest1] = useState([])
    const [contenido,setContenido] = useState("")
    const [asunto,setAsunto] = useState("")
    
    var crs =alumnos && alumnos.map(alumno =>{
        return alumno.rut
    })
    var crs1 =alumnos && alumnos.map(alumno =>{
        return alumno.Apoderado.rut
    })
    var crs2 = crs.concat(crs1)
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL+'/mensaje'
      });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSelectDest = (e) =>{
        if(e.target.value==="Alumnos"){
            setDest1(crs)
            setDest([])
        }
        else if(e.target.value==="Apoderados"){
            setDest1(crs1)
            setDest([])
        }
        else if(e.target.value==="Curso"){
            setDest1(crs2)
            setDest([])
        }
        else{
        setDest([e.target.value])
        }
    }
    
    const handleSelectDest1 = (e) =>{
        
        setDest1([e.target.value])
        
    }
    const handleContenido = (e) =>{
        setContenido(e.target.value)
        
    }
    const handleAsunto = (e) =>{
        setAsunto(e.target.value)
        
    }
    const handleSubmit = async (e)=>{
        try {
            await instance.post("/enviar",{
                idSender:rut,
                idReceiver:dest1,
                asunto:asunto,
                contenido:contenido,
                

            })
            handleClose()
        } catch (error) {
            console.log(error)
        }
        
    }
    const renderDest = () => {
        if (dest[0]==="Al") {
          return (<div><Form.Label>Destinatario</Form.Label>
            <Form.Control as="select" onChange={handleSelectDest1}>
                <option value={null}>Escoger Destinatario</option>
                {alumnos1 && alumnos1.map(alumno =>{return(<option value={alumno.rut} key={alumno.rut}>{alumno.rut}/{alumno.nombre}</option>)})}                       
            </Form.Control></div>);
        } else if(dest[0]==="Ap") {
          return (<div><Form.Label>Destinatario</Form.Label>
            <Form.Control as="select" onChange={handleSelectDest1}>
                <option value={null}>Escoger Destinatario</option>
                {alumnos1 && alumnos1.map(alumno =>{return(<option value={alumno.Apoderado.rut} key={alumno.Apoderado.rut}>{alumno.Apoderado.rut}/{alumno.Apoderado.nombre}</option>)})}                       
            </Form.Control></div>);
        }
      }
      const renderOp = () => {
        if (jef) {
          return (<div><Form.Control as="select" onChange={handleSelectDest}>
          <option value={null}>Escoger Destinatario</option>
          <option value={"Curso"}>Curso</option>
          <option value={"Alumnos"}>Alumnos</option>
          <option value={"Apoderados"}>Apoderados</option>
          <option value={"Al"}>Alumno Especifico</option>
          <option value={"Ap"}>Apoderado Especifico</option>                      
      </Form.Control></div>);
        } else {
          return (<div><Form.Control as="select" onChange={handleSelectDest}>
          <option value={null}>Escoger Destinatario</option>
          <option value={"Al"}>Alumno Especifico</option>
          <option value={"Ap"}>Apoderado Especifico</option>                      
      </Form.Control></div>);
        }
      }
    
    useEffect(() => {
        const fetchData = async () => {
        if(tipo==="Profesor"){
           try {
                const respu = await instance.post("/cosa1",{
                    rut:rut,
                });
                
                var crs3 =respu.data && respu.data.map(alumno =>{
                    return alumno.Asignaturas.map(alu=>{return (alu.idCurso)})
                })
                setCurso2(crs3[0])
            } catch (error) {
                
            }
            try {
                const est = await instance.post("/alumnos",{
                    rut:rut,
                    idCurso:curso2
                });
                setAlumnos1(est.data)
    
            } catch (error) {
                
            }
          try {
            const response = await instance.post("/cosa",{
                rut:rut
            });
            setCurso(response.data[0].Curso.id);
            if(response.data[0].jefe){
                try {
                    const resp = await instance.post("/alumnos",{
                        idCurso:curso
                    });
                    setAlumnos(resp.data)
                    
                    
                    
                } catch (error) {
                    
                }
                
               
            }
          } catch (err) {console.log(err)}
          try {
            const mnsj= await instance.post("/m",{
                rut:rut
            });
            setMensaje(mnsj.data)
            
        } catch (error) {
            
        }
        try {
            const mnsj= await instance.post("/e",{
                rut:rut
            });
            setEnviado(mnsj.data)
            
        } catch (error) {
            
        }
          
        }
        else{
            try {
                const mnsj= await instance.post("/m",{
                    rut:rut
                });
                setMensaje(mnsj.data)
                
            } catch (error) {
                
            }
            try {
                const mnsj= await instance.post("/e",{
                    rut:rut
                });
                setEnviado(mnsj.data)
                
            } catch (error) {
                
            }
        }
        }
    
        fetchData();
    
      }, [dest,curso]);
    if(rut==="Jefe UTP"){
        return(<Redirect to ="/admin"></Redirect>)
    }
    return isLogged ?(
        (()=>{
            switch(tipo){
                case "Profesor":
                    return(
                        
                        <Container className="cosa">
                            
                            
                            <Navb name={name} tipo={tipo}></Navb>
                        
                        
                            
                            
                        <Container className="box">
                                <h1>MENSAJES RECIBIDOS</h1>
                                <Accordion className="acc">
                                    {mensaje && mensaje.map(msj =>{return(<div>
                                                                            <Accordion.Toggle as={Card.Header}  eventKey={msj.id}>
                                                                            <Row><Col sm={9}>Asunto: {msj.asunto}</Col> <Col>Enviado Por: {msj.idSender}</Col></Row>
                                                                            </Accordion.Toggle>
                                                                            <Accordion.Collapse eventKey={msj.id}>
                                                                            <Card.Body>{msj.contenido}</Card.Body>
                                                                            
                                                                            </Accordion.Collapse>
                                                                        </div>)})}
                                </Accordion>
                            </Container>
                            
                            <Container className="box1">
                                <h1>MENSAJES ENVIADOS</h1>
                                <Accordion className="acc">
                                    {enviado && enviado.map(msj =>{return(<div>
                                                                            <Accordion.Toggle as={Card.Header}  eventKey={msj.id}>
                                                                            <Row><Col sm={9}>Asunto: {msj.asunto}</Col> <Col>Enviado Por: {msj.idSender}</Col></Row>
                                                                            </Accordion.Toggle>
                                                                            <Accordion.Collapse eventKey={msj.id}>
                                                                            <Card.Body>{msj.contenido}</Card.Body>
                                                                            
                                                                            </Accordion.Collapse>
                                                                        </div>)})}
                                </Accordion>
                                <br/>
                        <Button variant="primary" onClick={handleShow}>
                            Nuevo Mensaje
                        </Button>
                        </Container>
                        
                            
                        
                        
                        <Modal size ="lg" show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Enviar Mensaje</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                            <Form.Label>Tipo Destinatario</Form.Label>
                                        {renderOp()}
                            {renderDest()}
                            <Form.Label>Asunto</Form.Label>
                                <Form.Control  onChange={handleAsunto} />
                            <Form.Label>Mensaje</Form.Label>
                                <Form.Control as="textarea" rows={5} onChange={handleContenido} />
                            <br/>
                            <Container style = {{marginLeft:"619px",padding:"2px"}}>
                            <Button variant="danger" style = {{margin:"5px"}} onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button type="submit" variant="success" onClick={handleSubmit}>Enviar</Button>
                            </Container>
                            </Form>

                            </Modal.Body>
                            
                        </Modal>

                        </Container>
                        )
                case "Estudiante":
                    return(<Container>
                            <Navb name={name} tipo={tipo}></Navb>
                            <Container className="box">
                                <h1>MENSAJES RECIBIDOS</h1>
                                <Accordion className="acc">
                                    {mensaje && mensaje.map(msj =>{return(<div>
                                                                            <Accordion.Toggle as={Card.Header}  eventKey={msj.id}>
                                                                            <Row><Col sm={9}>Asunto : {msj.asunto}</Col> <Col>Enviado Por: {msj.idSender}</Col></Row>
                                                                            </Accordion.Toggle>
                                                                            <Accordion.Collapse eventKey={msj.id}>
                                                                            <Card.Body>{msj.contenido}</Card.Body>
                                                                            
                                                                            </Accordion.Collapse>
                                                                            </div>
                                                                        )})}
                                </Accordion>
                            </Container>
                        
                            </Container>)
                case "Apoderado":
                    return(<Container>
                            <Navb name={name} tipo={tipo}></Navb>
                            <Container className="box">
                                <h1>MENSAJES RECIBIDOS</h1>
                                <Accordion className="acc">
                                    {mensaje && mensaje.map(msj =>{return(<div>
                                                                            <Accordion.Toggle as={Card.Header}  eventKey={msj.id}>
                                                                            <Row><Col sm={9}>Asunto: {msj.asunto}</Col> <Col>Enviado Por: {msj.idSender}</Col></Row>
                                                                            </Accordion.Toggle>
                                                                            <Accordion.Collapse eventKey={msj.id}>
                                                                            <Card.Body>{msj.contenido}</Card.Body>
                                                                            
                                                                            </Accordion.Collapse>
                                                                        </div>)})}
                                </Accordion>
                            </Container>
                        
                            </Container>)
                default:
                    return(<div>hola</div>)
            }
        
        })()
    ):(
        <Redirect to="/login"/>
    )
}

export default Mensaje
