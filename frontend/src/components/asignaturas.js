import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Card,Container,CardDeck } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { login } from '../redux/actions/authActions';
const Asignaturas = (props) => {
    let {idCurso} = props;
    const [asignaturas,setAsignaturas]=useState([])
    const name = useSelector((store) => store.authReducer.Name);
    const tipo= useSelector((store) => store.authReducer.tipo);
    const rut= useSelector((store) => store.authReducer.Rut);
    const id_curso= useSelector((store) => store.authReducer.id_curso);
    const dispatch= useDispatch();
    const history= useHistory();
    const instance = axios.create({
        baseURL: 'http://localhost:3000/home'
      });
    const handleAsignatura = (e) =>{
        dispatch(login(rut,name,tipo,id_curso,e))
        history.push("/asignatura")
    }
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
        <CardDeck>
        {asignaturas.map(asignatura =>{
            return(
                <a style={{ cursor: 'pointer' }}  onClick={(e) => handleAsignatura(asignatura.id)} >
                <Card border="dark" style={{ width: '18rem' }}>
                <Card.Header>Asignatura</Card.Header>
                <Card.Body>
                <Card.Title>{asignatura.nombre}</Card.Title>
                
                </Card.Body>
            </Card>
            </a>
                    )
            })}
        </CardDeck>
        </Container>
    )
}


export default Asignaturas
