import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './routes/Home';
import Login from './routes/Login';
import Registro from './routes/Registro';

const App = () =>{
    return (
    <div>
        <Router>
            <Switch>
            <Route exact path="/" component={Registro}/>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/home" component={Home}/>

            </Switch>
        </Router>
    </div>
    )
}

export default App;