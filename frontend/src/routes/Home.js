import { Button,Container } from 'react-bootstrap';
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { Link } from 'react-router-dom';




function Home() {
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const id = useSelector((store) => store.authReducer.ID);
    const name = useSelector((store) => store.authReducer.Name);
    const tipo= useSelector((store) => store.authReducer.tipo);
    const dispatch = useDispatch()
    const handleLogout = (e) => {
        dispatch(logout());
    }
    
    return isLogged ?(
        <div>
        <Container>hola {name} ({tipo})
        
        <Link to="/login">
        <Button variant="danger" type="button" onClick={handleLogout}> LOG OUT </Button>
        </Link>
        </Container>
        </div>
    ): (
        <div>no logueado</div>
    )
}

export default Home
