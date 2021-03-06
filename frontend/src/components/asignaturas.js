import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Card,Container,CardDeck } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { login } from '../redux/actions/authActions';
const dotenv = require("dotenv");
dotenv.config();
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
        baseURL: process.env.REACT_APP_BACKEND_URL+'/home'
      });
    const handleAsignatura = (e) =>{
        dispatch(login(rut,name,tipo,id_curso,e))
        history.push("/asignatura")
    }
    useEffect(() => {
        const fetchData = async () => {
        if(tipo==="Estudiante"){
          try {
            const response = await instance.post("/asignaturas/"+tipo,{
                id:idCurso,
            
            })
            setAsignaturas(response.data)
            

          } catch (err) {}
        }
        else if(tipo==="Profesor"){
            try {
                const response = await instance.post("/asignaturas/"+tipo,{
                    id:rut,
                
                })
                setAsignaturas(response.data)
                
    
              } catch (err) {}

        }
        };
        fetchData();

      }, []);   
      

    return (
        <Container className="cartas">
        <CardDeck className="cartas-deck">
        {asignaturas.map(asignatura =>{
            return(
                <a key= {asignatura.id} style={{ cursor: 'pointer' , padding: "4px"}}  onClick={(e) => handleAsignatura(asignatura.id)} >
                <Card key= {asignatura.id} border="dark" >
                <Card.Header>Asignatura (ID {asignatura.id})</Card.Header>
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
