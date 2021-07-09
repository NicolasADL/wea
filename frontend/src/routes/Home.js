import {Container} from 'react-bootstrap';
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';

import { Link, Redirect } from 'react-router-dom';
import Horario from '../components/horario.js';
import Asignaturas from '../components/asignaturas';
import axios from 'axios';
import Navb from '../components/navb';

function Home() {
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const name = useSelector((store) => store.authReducer.Name);
    const tipo= useSelector((store) => store.authReducer.tipo);
    const id_curso= useSelector((store) => store.authReducer.id_curso);
   
    

    
    return isLogged ?(
        
        <Container fluid>
        <Navb name={name} tipo={tipo} ></Navb>
        
        
            <Container><Horario idCurso={id_curso}></Horario></Container>

            <Container><Asignaturas idCurso={id_curso}></Asignaturas></Container>
        </Container>
        

    ): (
        <Redirect to="/login"/>
    )
}

export default Home
