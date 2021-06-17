import React, {useState} from 'react'
import {Button, Container,Row,Col,Form } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux';
import { login,logout } from '../redux/actions/authActions';
import axios from "axios";
import { useHistory } from 'react-router-dom';


const instance = axios.create({
    baseURL: 'http://localhost:3000/'
  });

function Login(){
    const [rut,setRut]=useState("");
    const [pass,setPass]=useState("");
    const dispatch= useDispatch();
    const history= useHistory();
    
    const handleRut = (e) => {
        setRut(e.target.value)
    }
    const handlePass = (e) => {
        setPass(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            await instance.post("auth/login",{
                rut,
                pass
            }).then((data)=> {
                dispatch(login(data.data.rut,data.data.name,data.data.id));
                localStorage.setItem('token', data.data.token);
                history.push("/home");
                
                
            
                
            })
            
        } catch (error) {
            
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
                        <Form.Control onChange={handleRut} />
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
