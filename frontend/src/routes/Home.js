import { Navbar,Nav,Button,Container} from 'react-bootstrap';
import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { Link } from 'react-router-dom';
import Horario from '../components/horario.js';
import Asignaturas from '../components/asignaturas';
import axios from 'axios';

function Home() {
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const name = useSelector((store) => store.authReducer.Name);
    const tipo= useSelector((store) => store.authReducer.tipo);
    const rut= useSelector((store) => store.authReducer.Rut);
    const id_curso= useSelector((store) => store.authReducer.id_curso);
    const dispatch = useDispatch()
    const [resultados,setResultados] = useState([])
    const instance = axios.create({
        baseURL: 'http://localhost:3000/home'
      });
    const handleLogout = (e) => {
        dispatch(logout());
    }
    useEffect(() => {
        const fetchData = async () =>{
            try {
                
                const response = await instance.post("/estudiante",{
                        id:id_curso,                
                });
                setResultados(response.data)

            } catch (error) {
                console.log(error)
            }

        };
        fetchData();

    },[]);
    
    return isLogged ?(
        
        <Container fluid>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Bienvenido {name} ({tipo})({resultados.grado})</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                
                </Nav>
                <Nav>
                
                <Link to="/login">
                    <Button variant="danger" type="button" onClick={handleLogout}> LOG OUT </Button>
                </Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        
            <Container><Horario idCurso={id_curso}></Horario></Container>

            <Container><Asignaturas idCurso={id_curso}></Asignaturas></Container>
        </Container>
        

    ): (
        <div>no logueado</div>
    )
}

export default Home
