import React, {useState} from 'react'
import {Button, Container,Row,Col,Form,InputGroup,DropdownButton,Dropdown, Alert } from 'react-bootstrap'
import {useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import axios from "axios";
import { useHistory,Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../assets/css/styles.css'
const dotenv = require("dotenv");
dotenv.config();

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
  });

function Login(){
    const [rut,setRut]=useState("");
    const [pass,setPass]=useState("");
    const [selected,setSelected]=useState('Usuario')
    const dispatch= useDispatch();
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const history= useHistory();

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
                    await instance.post("auth/login/estudiante",{
                        rut :rut,
                        password: pass
                    }).then((data)=> {
                        dispatch(login(data.data.rut,data.data.nombre,selected,data.data.idCurso));
                        localStorage.setItem('token', data.data.token);
                        history.push("/home");
                    })
                    
                } catch (error) {
                    
                    return(alert("Ha ocurrido un error al iniciar sesion, revise los datos"))
                }
                break;
            case "Apoderado":
                try {
                    await instance.post("auth/login/apoderado",{
                        rut :rut,
                        password: pass
                    }).then((data)=> {
                        dispatch(login(data.data.rut,data.data.nombre,selected));
                        localStorage.setItem('token', data.data.token);
                        history.push("/home");
                    })
                    
                } catch (error) {
                    return(alert("Ha ocurrido un error al iniciar sesion, revise los datos"))
                }
                break;
            case "Profesor":
                
                try {
                    await instance.post("auth/login/profesor",{
                        rut :rut,
                        password: pass
                    }).then((data)=> {
                        dispatch(login(data.data.rut,data.data.nombre,selected,null,null,data.data.jefe));
                        localStorage.setItem('token', data.data.token);
                        history.push("/home");
                    })
    
                } catch (error) {
                    return(alert("Ha ocurrido un error al iniciar sesion, revise los datos"))
                }
                break;
            default:
                break;
        }
    }
    return !isLogged?(
        
            
            <Container>
                
                
    
                <Form className="forma">
                    <Form.Group className="forma-control">
                        <Form.Label className="forma-label">Rut</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control placeholder="Ingrese su Rut" className="forma-input" type="rut" onChange={handleRut} />
                            <DropdownButton
                            className="forma-input"
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
                        
                    
                        <Form.Label className="forma-label">Contraseña</Form.Label>
                        <Form.Control type="password" className="forma-input" placeholder="Ingrese su Contraseña" onChange={handlePass} />
                    </Form.Group>
                    <Button onClick={handleSubmit}  className="btn-submit" variant="primary" type="submit">
                        Submit
                    </Button>
                    <Link style={{marginLeft:"314px",color:"black",textDecoration:"underline"}} to="/">Registrarse</Link>
                </Form>
                
        </Container>

        
        
    ):(<Redirect to="/home"/>)
}

export default Login
