import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Card,Container,CardGroup } from 'react-bootstrap';


const Asignaturas = (props) => {
    let {idCurso} = props;
    const [asignaturas,setAsignaturas]=useState([])
    const instance = axios.create({
        baseURL: 'http://localhost:3000/home'
      });
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await instance.post("/asignaturas",{
                id:idCurso,
            
            })
            setAsignaturas(response.data)
            

          } catch (err) {}
        };
        fetchData();

      }, []);   
      

    return (
        <Container>
        <CardGroup>
        {asignaturas.map(asignatura =>{
            return(
                <Card border="dark" style={{ width: '18rem' }}>
                <Card.Header>Heaer</Card.Header>
                <Card.Body>
                <Card.Title>{asignatura.nombre}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>
                </Card.Body>
            </Card>
                    )
            })}
        </CardGroup>
        </Container>
    )
}


export default Asignaturas
