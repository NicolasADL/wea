import React, {useState} from 'react'
import {Button, Container,Row,Col,Form} from 'react-bootstrap'
import axios from "axios";
import AuthInput from '../components/rutCheck';
import {Link} from 'react-router-dom';


const instance = axios.create({
    baseURL: 'http://localhost:3000/'
  });

function Registro(){
    const [rut,setRut]=useState("");
    const [pass,setPass]=useState("");
    const [resultados,setResultados] = useState([])
    
    
    
    const handleRut = (e) => {
        setRut(e.target.value)
    }
    const handlePass = (e) => {
        setPass(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const respuesta=await instance.post("auth/registro/check",{
                rut:rut,
            });
            setResultados(respuesta.data)
            if(!resultados.registrado){
                try {
                    await instance.post("auth/registro",{
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

    }

    return (
        <div>
            
            <Container>
                <Row>
                   
                </Row>
                <Row>
                    <Col>
    
                <Form>
                    

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Rut</Form.Label>
                        <Form.Control onChange={handleRut} />
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
    )
}

export default Registro
