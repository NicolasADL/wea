import React,{useState,useEffect} from 'react'
import { Accordion, Container,Col,Card,Button,Row,Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navb from '../components/navb';
import axios from "axios";
import {BsTrash} from 'react-icons/bs';

const dotenv = require("dotenv");
dotenv.config();    
function Asignatura() {
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const id_asignatura= useSelector((store) => store.authReducer.id_asignatura);
    const name= useSelector((store) => store.authReducer.Name);
    const tipo= useSelector((store) => store.authReducer.tipo);
    const rut= useSelector((store) => store.authReducer.Rut);
    const [archivos, setArchivos] = useState([]);
    const [ramo, setRamo] = useState("");
    const [show, setShow] = useState(false);
    const [nombre,setName]=useState(null);
    const [selectedTipo,setSelectedTipo]=useState("Capsula")
    const [selectedFile, setSelectedFile] = useState(null);

  
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL+'/asignatura'
      });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) =>{
        setName(e.target.value)
    }
    const handleSelectTipo = (e) =>{
        setSelectedTipo(e.target.value)
    }
    const handleSubmitArchivo = async (e)=>{
        try {
            await instance.post("/archivo",{
                idAsignatura:id_asignatura,
                archivo:selectedFile.name,
                tipo:selectedTipo,
                nombre:nombre

            })
        } catch (error) {
            console.log(error)
        }
        setShow(false);
        window.location.reload();
    }
    const handleDelete= async (e) => {
        try {
            window.location.reload();
            await instance.post("/delete/"+e)
            
            
        } catch (error) {
            
        }
        
        
                
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response1 = await instance.post("/nombre",{
                idAsignatura:id_asignatura
            })
            const response = await instance.post("/",{
                idAsignatura:id_asignatura
            });
            
            setRamo(response1.data[0])
            setArchivos(response.data);
          } catch (err) {}
        };
    
        fetchData();
      }, []);
    
    if(rut==="Jefe UTP"){
        return(<Redirect to ="/admin"></Redirect>)
    }
    return isLogged?(
        (() => {
            switch(tipo){
                case "Estudiante":
                    return(
                    <Container fluid>
                        <Navb name={name} tipo={tipo}></Navb>
                        <h1 style={{textAlign:'center'}}>{ramo.nombre}</h1>
                        
                        <Container>

                            <Accordion>
                                <Card key="0">
                                
                                <Accordion.Toggle as={Card.Header} variant="link" key="0" eventKey="0">
                                    Capsulas
                                </Accordion.Toggle>
                                
                                
                                {archivos.map(arch =>{if(arch.tipo==="Capsula"){return(<Accordion.Collapse key={arch.id} eventKey="0"><Card.Body key={arch.id}><Row><Col sm={11}><a rel="noreferrer" key={arch.id} href={arch.archivo} target="_blank">{arch.nombre}</a></Col></Row></Card.Body></Accordion.Collapse>)}return null})}
                                
                            </Card>
                            <Card key="1">
                                
                                <Accordion.Toggle as={Card.Header} variant="link" key="1" eventKey="1">
                                    Ejercicios
                                </Accordion.Toggle>
                                
                                
                                {archivos.map(arch =>{if(arch.tipo==="Ejercicio"){return(<Accordion.Collapse key={arch.id} eventKey="1"><Card.Body key={arch.id}><a rel="noreferrer" key={arch.id} href={arch.archivo} target="_blank">{arch.nombre}</a></Card.Body></Accordion.Collapse>)}return null})}
                                
                            </Card>
                            <Card key="2">
                               
                                <Accordion.Toggle as={Card.Header} variant="link" key="2" eventKey="2">
                                    Otros
                                </Accordion.Toggle>
                                
                                
                                {archivos.map(arch =>{if(arch.tipo==="Otro"){return(<Accordion.Collapse key={arch.id} eventKey="2"><Card.Body key={arch.id}><a key={arch.id} href={arch.archivo} rel="noreferrer" target="_blank">{arch.nombre}</a></Card.Body></Accordion.Collapse>)}return null})}
                                
                            </Card>
                            
                        
                            </Accordion>
                        </Container>
            
                    </Container>
                    )
                case "Profesor":
                    return(
                    <Container fluid>
                        <Navb name={name} tipo={tipo}></Navb>
                        <h1 style={{textAlign:'center'}}>{ramo.nombre}</h1>
                        
                        <Container>

                            <Accordion >
                                <Card key="0">
                                
                                <Accordion.Toggle as={Card.Header} variant="link"  eventKey="0">
                                    Capsulas
                                </Accordion.Toggle>
                                
                                
                                {archivos.map(arch =>{if(arch.tipo==="Capsula"){return(<Accordion.Collapse key={arch.id} eventKey="0"><Card.Body ><Row><Col sm={11}><a rel="noreferrer"  href={arch.archivo} target="_blank">{arch.nombre}</a></Col><Col sm={1}><Button type="submit" onClick={e => handleDelete(arch.id)} variant="danger"><BsTrash/></Button></Col></Row></Card.Body></Accordion.Collapse>)}return null})}
                                
                            </Card>
                            <Card key="1"> 
                                
                                <Accordion.Toggle as={Card.Header} variant="link"  eventKey="1">
                                    Ejercicios
                                </Accordion.Toggle>
                                
                                
                                {archivos.map(arch =>{if(arch.tipo==="Ejercicio"){return(<Accordion.Collapse key={arch.id} eventKey="1"><Card.Body ><Row><Col sm={11}><a rel="noreferrer"  href={arch.archivo} target="_blank">{arch.nombre}</a></Col><Col sm={1}><Button type="submit" onClick={e => handleDelete(arch.id)} variant="danger"><BsTrash/></Button></Col></Row></Card.Body></Accordion.Collapse>)}return null})}
                                
                            </Card>
                            <Card key="2">
                                
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                                    Otros
                                </Accordion.Toggle>
                                
                                
                                {archivos.map(arch =>{if(arch.tipo==="Otro"){return(<Accordion.Collapse key={arch.id} eventKey="2"><Card.Body ><Row><Col sm={11}><a rel="noreferrer"  href={arch.archivo} target="_blank">{arch.nombre}</a></Col><Col sm={1}><Button type="submit" onClick={e => handleDelete(arch.id)} variant="danger"><BsTrash/></Button></Col></Row></Card.Body></Accordion.Collapse>)}return null})}
                                
                            </Card>
                            
                        
                            </Accordion>
                        </Container>
                        <br/>
                        <Container>
                        <Button variant="success" onClick={handleShow}>
                            Subir Archivo
                        </Button>
                        </Container>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            
                
                        >
                            <Modal.Header closeButton>
                            <Modal.Title>Subir Material Academico</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control onChange={handleName}/>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as ="select"  onChange={handleSelectTipo}>
                                                        <option value={null}>Tipo de Archivo</option>
                                                        <option value={"Capsula"}>Capsula</option>
                                                        <option value={"Ejercicio"}>Ejercicio</option>
                                                        <option value={"Otro"}>Otro</option>
                                                        
                                                </Form.Control>
                            
                                <Form.File onChange={(e) => setSelectedFile(e.target.files[0])} id="exampleFormControlFile1" label="Cargar Archivo" />
                            </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button type="submit" variant="success" onClick={handleSubmitArchivo}>Subir</Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>
                    )
                default:
                    return null

            }
        })()
        
            
    ):<Redirect to="/home"/>
}

export default Asignatura
