import React from "react";
import { Navbar,Nav,Button, Container} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from '../redux/actions/authActions';


const Navb = (props)=> {
    let {name}=props;
    let {tipo}=props;
    const dispatch = useDispatch()
    const handleLogout = (e) => {
        dispatch(logout());
    }
    return(
        <Container style= {{padding : "30px"}}>
    <Navbar  fixed="top" bg="dark" variant="dark">
            <Navbar.Brand href="/home">Bienvenido {name}, {tipo}</Navbar.Brand>
            
            <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/mensajes">Mensajes</Nav.Link>
                </Nav>
                <Nav>
                
                <Link to="/login">
                    <Button variant="danger" type="button" onClick={handleLogout}> LOG OUT </Button>
                </Link>
                </Nav>
            
            </Navbar>
            </Container>
    )
}

export default Navb