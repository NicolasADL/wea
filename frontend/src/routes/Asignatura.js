import React,{useState,useEffect} from 'react'
import { Accordion, Container,Col,Card,Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navb from '../components/navb';
import axios from "axios";


function Asignatura() {
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const id_asignatura= useSelector((store) => store.authReducer.id_asignatura);
    const name= useSelector((store) => store.authReducer.Name);
    const tipo= useSelector((store) => store.authReducer.tipo);
    const [archivos, setArchivos] = useState([]);
    const [ramo, setRamo] = useState("");
    const instance = axios.create({
        baseURL: 'http://localhost:3000/asignatura'
      });


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
    
      
    return isLogged?(
        <Container fluid>
            <Navb name={name} tipo={tipo}></Navb>
            <h1 style={{textAlign:'center'}}>{ramo.nombre}</h1>
            
            <Container>

                <Accordion keyfield="1">
                    <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" key="0" eventKey="0">
                        Capsulas
                    </Accordion.Toggle>
                    </Card.Header>
                    
                    {archivos.map(arch =>{if(arch.tipo==="Capsula"){return(<Accordion.Collapse eventKey="0"><Card.Body key={arch.id}><a rel="noreferrer" key={arch.id} href={arch.archivo} target="_blank">{arch.nombre}</a></Card.Body></Accordion.Collapse>)}return null})}
                    
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" key="1" eventKey="1">
                        Ejercicios
                    </Accordion.Toggle>
                    </Card.Header>
                    
                    {archivos.map(arch =>{if(arch.tipo==="Ejercicio"){return(<Accordion.Collapse eventKey="1"><Card.Body key={arch.id}><a rel="noreferrer" key={arch.id} href={arch.archivo} target="_blank">{arch.nombre}</a></Card.Body></Accordion.Collapse>)}return null})}
                    
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" key="2" eventKey="2">
                        Otros
                    </Accordion.Toggle>
                    </Card.Header>
                    
                    {archivos.map(arch =>{if(arch.tipo==="Otro"){return(<Accordion.Collapse eventKey="2"><Card.Body key={arch.id}><a key={arch.id} href={arch.archivo} rel="noreferrer" target="_blank">{arch.nombre}</a></Card.Body></Accordion.Collapse>)}return null})}
                    
                </Card>
                
            
                </Accordion>
            </Container>
            
        </Container>
            
    ):<Redirect to="/home"/>
}

export default Asignatura
