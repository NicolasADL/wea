import React,{useEffect,useState} from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
const dotenv = require("dotenv");
dotenv.config();

const Horario = (props) => {
    let {idCurso} = props;
    const [isLoading, setLoading] = useState(true);
    const[asignaturas,setAsignaturas]=useState([])
    const[bloque1,setBloque1]=useState([])
    const[bloque2,setBloque2]=useState([])
    const[bloque3,setBloque3]=useState([])
    const[bloque4,setBloque4]=useState([])
    const[bloque5,setBloque5]=useState([])
    const[bloque6,setBloque6]=useState([])
    
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL+'/home'
      });
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await instance.post("/asignaturas/horario",{
                id:idCurso,
            
            })
            setAsignaturas(response.data);
            const b1=(asignaturas.filter(asignaturas=>asignaturas["bloque"]===1))
            setBloque1(b1)
            const b2 = asignaturas.filter(asignaturas=>asignaturas["bloque"]===2)
            setBloque2(b2)
            const b3 = asignaturas.filter(asignaturas=>asignaturas["bloque"]===3)
            setBloque3(b3)
            const b4 = asignaturas.filter(asignaturas=>asignaturas["bloque"]===4)
            setBloque4(b4)
            const b5 = asignaturas.filter(asignaturas=>asignaturas["bloque"]===5)
            setBloque5(b5)
            const b6 = asignaturas.filter(asignaturas=>asignaturas["bloque"]===6)
            setBloque6(b6)
            setLoading(false)

          } catch (err) {}
        };
        fetchData();

      }, [isLoading]);    
    
    
    if (isLoading) {
    
        return <div className="App">Loading...</div>;
        
      }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Bloque</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miercoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>{bloque1.map(asignatura =>{if(asignatura.dia==="Lunes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque1.map(asignatura =>{if(asignatura.dia==="Martes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque1.map(asignatura =>{if(asignatura.dia==="Miercoles"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque1.map(asignatura =>{if(asignatura.dia==="Jueves"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque1.map(asignatura =>{if(asignatura.dia==="Viernes"){return asignatura.Asignatura.nombre}return null})}</td>
                </tr>
                <tr>
                <td>2</td>
                <td>{bloque2.map(asignatura =>{if(asignatura.dia==="Lunes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque2.map(asignatura =>{if(asignatura.dia==="Martes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque2.map(asignatura =>{if(asignatura.dia==="Miercoles"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque2.map(asignatura =>{if(asignatura.dia==="Jueves"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque2.map(asignatura =>{if(asignatura.dia==="Viernes"){return asignatura.Asignatura.nombre}return null})}</td>
                </tr>
                <tr>
                <td>3</td>
                <td>{bloque3.map(asignatura =>{if(asignatura.dia==="Lunes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque3.map(asignatura =>{if(asignatura.dia==="Martes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque3.map(asignatura =>{if(asignatura.dia==="Miercoles"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque3.map(asignatura =>{if(asignatura.dia==="Jueves"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque3.map(asignatura =>{if(asignatura.dia==="Viernes"){return asignatura.Asignatura.nombre}return null})}</td>
                </tr>
                <tr>
                <td>4</td>
                <td>{bloque4.map(asignatura =>{if(asignatura.dia==="Lunes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque4.map(asignatura =>{if(asignatura.dia==="Martes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque4.map(asignatura =>{if(asignatura.dia==="Miercoles"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque4.map(asignatura =>{if(asignatura.dia==="Jueves"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque4.map(asignatura =>{if(asignatura.dia==="Viernes"){return asignatura.Asignatura.nombre}return null})}</td>
                </tr>
                <tr>
                <td>5</td>
                <td>{bloque5.map(asignatura =>{if(asignatura.dia==="Lunes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque5.map(asignatura =>{if(asignatura.dia==="Martes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque5.map(asignatura =>{if(asignatura.dia==="Miercoles"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque5.map(asignatura =>{if(asignatura.dia==="Jueves"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque5.map(asignatura =>{if(asignatura.dia==="Viernes"){return asignatura.Asignatura.nombre}return null})}</td>
                </tr>
                <tr>
                <td>6</td>
                <td>{bloque6.map(asignatura =>{if(asignatura.dia==="Lunes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque6.map(asignatura =>{if(asignatura.dia==="Martes"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque6.map(asignatura =>{if(asignatura.dia==="Miercoles"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque6.map(asignatura =>{if(asignatura.dia==="Jueves"){return asignatura.Asignatura.nombre}return null})}</td>
                <td>{bloque6.map(asignatura =>{if(asignatura.dia==="Viernes"){return asignatura.Asignatura.nombre}return null})}</td>
                </tr>
            

            </tbody>
        </Table>
    )
};

export default Horario;
