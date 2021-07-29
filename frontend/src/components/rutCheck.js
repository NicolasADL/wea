import React from "react";
import { Form } from "react-bootstrap";
import '../assets/css/styles.css'

const AuthInput = (props) => {
  let { registrado } = props;
  let {change} = props;

  if (registrado===false) {
    return (<Form.Group  >
            <Form.Label className="forma-label">Contraseña</Form.Label>
            <Form.Control className="forma-input" type="password" placeholder="Ingrese su Contraseña"  onChange={change}/>
        </Form.Group>);
  }
  else {
      return null
  } 
};

export default AuthInput;