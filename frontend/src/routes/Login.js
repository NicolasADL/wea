import React, {useState} from 'react'
import {Button, Container,Row,Col,Form,InputGroup,DropdownButton,Dropdown } from 'react-bootstrap'
import {useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import axios from "axios";
import { useHistory } from 'react-router-dom';


const instance = axios.create({
    baseURL: 'http://localhost:3000/'
  });

function Login(){
    const [rut,setRut]=useState("");
    const [pass,setPass]=useState("");
    const [selected,setSelected]=useState('Usuario')
    const dispatch= useDispatch();
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
        

        if(selected==="Estudiante"){
        
            try {
                await instance.post("auth/login",{
                    rut :rut,
                    password: pass
                }).then((data)=> {
                    dispatch(login(data.data.rut,data.data.nombre,data.data.id,selected));
                    localStorage.setItem('token', data.data.token);
                    history.push("/home");
                    
                    
                
                    
                })
                
            } catch (error) {
                
            }
        }
        else{
            console.log("hola")
        }
    }
    

    return (
        <div>
            
            <Container>
                
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
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control onChange={handlePass} />
                    </Form.Group>
                    <Button onClick={handleSubmit}  variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Col>
                </Row>
        </Container>

        
        </div>
    )
}

export default Login
