import React, {useState} from 'react'
import {Button, Container,Row,Col,Form,InputGroup,Dropdown,DropdownButton} from 'react-bootstrap'
import axios from "axios";
import AuthInput from '../components/rutCheck';
import {Link, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

const dotenv = require("dotenv");
dotenv.config();
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
  });

function Registro(){
    const [rut,setRut]=useState("");
    const [pass,setPass]=useState("");
    const [resultados,setResultados] = useState([])
    const [selected,setSelected]=useState('Usuario')
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    
    const handleSelect = (e) =>{
        setSelected(e)
    }
    
    const handleRut = (e) => {
        setRut(e.target.value)
    }
    const handlePass = (e) => {
        setPass(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        switch(selected){
            case "Estudiante":
                try {
                    const respuesta=await instance.post("auth/registro/check/estudiante",{
                        rut:rut,
                    });
                    setResultados(respuesta.data)
                    if(resultados.registrado===false){
                        try {
                            await instance.post("auth/registro/estudiante",{
                                rut:rut,
                                password:pass
                            })
                        } catch (error) {
                            console.log(error)
                            
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                break
            case "Apoderado":
                try {
                    const respuesta=await instance.post("auth/registro/check/apoderado",{
                        rut:rut,
                    });
                    setResultados(respuesta.data)
                    if(resultados.registrado===false){
                        try {
                            await instance.post("auth/registro/apoderado",{
                                rut:rut,
                                password:pass
                            })
                        } catch (error) {
                            console.log(error)
                            
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                break
            case "Profesor":
                
                try {
                    const respuesta=await instance.post("auth/registro/check/profesor",{
                        rut:rut,
                    });
                    setResultados(respuesta.data)
                    if(resultados.registrado===false){
                        try {
                            await instance.post("auth/registro/profesor",{
                                rut:rut,
                                password:pass
                            })
                        } catch (error) {
                            console.log(error)
                            
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                break;
            default:
                break;
        }
    }

    return !isLogged?(
        <div>
            
            <Container>
                <Row>
                   
                </Row>
                <Row>
                    <Col>
    
                <Form>
                    

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Rut</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control onChange={handleRut} />
                            <DropdownButton
                            as={InputGroup.Append}
                            variant="outline-secondary"
                            title={selected}
                            id="input-group-dropdown-1"
                            onSelect={handleSelect}
                            >
                            <Dropdown.Item eventKey="Estudiante">Estudiante</Dropdown.Item>
                            <Dropdown.Item eventKey="Profesor">Profesor</Dropdown.Item>
                            <Dropdown.Item eventKey="Apoderado">Apoderado</Dropdown.Item>
                            </DropdownButton>
                            
                        </InputGroup>
                        
                    </Form.Group>
                    <AuthInput registrado={resultados.registrado} change={handlePass}/>
                    
                    <Button onClick={handleSubmit} variant="primary" type="submit">
                        Submit
                    </Button>
                    <Link to="/login">Ya esta registrado?</Link>
                    
                </Form>
                </Col>
                </Row>
        </Container>

        
        </div>
    ):(<Redirect to="/home"/>)
}

export default Registro
