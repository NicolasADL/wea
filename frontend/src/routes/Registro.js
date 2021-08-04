import React, {useState} from 'react'
import {Button, Container,Row,Col,Form,InputGroup,Dropdown,DropdownButton} from 'react-bootstrap'
import axios from "axios";
import AuthInput from '../components/rutCheck';
import {Link, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../assets/css/styles.css'
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
            
            <div className="bgr">
            <Container className="lienzo">
                
                
    
                <Form className="forma">
                    

                    <Form.Group className="forma-control" controlId="formBasicPassword">
                        <Form.Label className="forma-label">Rut</Form.Label>
                        <InputGroup >
                            <Form.Control type="rut" placeholder="Ingrese su Rut" className="forma-input" onChange={handleRut} />
                            <DropdownButton
                            className="input-group-dropdown-1"
                            as={InputGroup.Append}
                            variant="dark"
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
                    
                    <Button className="btn-submit" onClick={handleSubmit} variant="primary" type="submit">
                        Submit
                    </Button>
                    <Link style={{marginLeft:"250px",color:"#F1F2ED",textDecoration:"underline"}}to="/login">Ya esta registrado?</Link>
                    
                </Form>
                
        </Container>
        </div>

    ):(<Redirect to="/home"/>)
}

export default Registro
