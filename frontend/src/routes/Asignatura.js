import React from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navb from '../components/navb';


function Asignatura() {
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const id_asignatura= useSelector((store) => store.authReducer.id_asignatura);
    const name= useSelector((store) => store.authReducer.Name);
    const tipo= useSelector((store) => store.authReducer.tipo);
    
    return isLogged?(
        <Container fluid>
            <Navb name={name} tipo={tipo}></Navb>
            <Container>
                ID de asignatura : {id_asignatura}
            </Container>
            
        </Container>
            
    ):<Redirect to="/home"/>
}

export default Asignatura
