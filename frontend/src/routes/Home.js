import {Container} from 'react-bootstrap';
import React, {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Horario from '../components/horario.js';
import Asignaturas from '../components/asignaturas';
import Navb from '../components/navb';

const dotenv = require("dotenv");
dotenv.config();

function Home() {
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const name = useSelector((store) => store.authReducer.Name);
    const tipo= useSelector((store) => store.authReducer.tipo);
    const id_curso= useSelector((store) => store.authReducer.id_curso);
    const rut= useSelector((store) => store.authReducer.Rut);
    const [IDC,setIDC]=useState()
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL+'/home'
      });
    

    useEffect(() => {
        const fetchData = async () => {
        if(tipo==="Apoderado"){
          try {
            const response = await instance.post("/apoderado",{
                id:rut
            });
            
            setIDC(response.data);
            
            
          } catch (err) {}
        };
        }
    
        fetchData();
      }, [isLogged]);
    
    if(rut==="Jefe UTP"){
        return(<Redirect to ="/admin"></Redirect>)
    }
    
    return isLogged ?(
        
        (() => {
            switch (tipo) {
                case 'Estudiante':
                return(<div className="lienzo2">
                        <Container>
                            <Navb name={name} tipo={tipo} ></Navb>
                            
                            
                                <Container><Horario idCurso={id_curso}></Horario></Container>

                                <Container><Asignaturas idCurso={id_curso}></Asignaturas></Container>
                            </Container>
                        </div>) 
                case 'Profesor':
                    return(<div className="lienzo3">
                        <Navb name={name} tipo={tipo}></Navb>
                        <Asignaturas></Asignaturas>
                    </div>)
                case 'Apoderado':
                    return(<div className="lienzo2"><Container>
                        <Navb name={name} tipo={tipo}></Navb>
                        {IDC && IDC.map(estudiante =>{
                                            return(<div key={estudiante.Estudiante.rut}>
                                                <h1> PUPILO: {estudiante.Estudiante.nombre} {estudiante.Estudiante.rut}</h1>
                        <Container><Horario idCurso={estudiante.Estudiante.idCurso}></Horario></Container>
                                    </div>
                                                    )
                                                })}
                        
                    </Container></div>)
                default:
                    return null   
            };
            })()
        
        

    ): (

        <Redirect to="/login"/>
    )
}

export default Home
