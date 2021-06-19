import React from "react";
import { Form } from "react-bootstrap";

const AuthInput = (props) => {
  let { registrado } = props;
  let {change} = props;

  if (registrado===false) {
    return (<Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" onChange={change}/>
        </Form.Group>);
  }
  else {
      return null
  } 
};

export default AuthInput;