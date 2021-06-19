import React, {useEffect, useState} from 'react'
import {Button, Container,Row,Col,Form,Table } from 'react-bootstrap'
import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:3000/'
  });

function Registro(){
    const [name,setName]=useState("");
    const [rut,setRut]=useState("");
    const [pass,setPass]=useState("");
    const [resultados,setResultados] = useState([])

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleRut = (e) => {
        setRut(e.target.value)
    }
    const handlePass = (e) => {
        setPass(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await instance.post("auth/registro",{
                rut:rut,
                password:pass,
                nombre:name,
                idCurso:1,
            })
        } catch (error) {
            console.log("hola")
        }

    }
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await instance.get("registro/")
                setResultados(response.data)
                
                
            } catch (error) {}

        };
        fetchData();
        
    },[]);

    return (
        <div>
            
            <Container>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Rut</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.map(usuario => {
                                return(
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.rut}</td>

                                </tr>
                                )
                            })}
                            
                            
                         
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <Col>
    
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={handleName} />
                        
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Rut</Form.Label>
                        <Form.Control onChange={handleRut} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control onChange={handlePass} />
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button href="/login" variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                </Col>
                </Row>
        </Container>

        
        </div>
    )
}

export default Registro
