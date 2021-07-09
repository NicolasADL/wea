import React from "react";
import { Navbar,Nav,Button} from 'react-bootstrap';
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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/home">Bienvenido {name}, {tipo}</Navbar.Brand>
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
    )
}

export default Navb