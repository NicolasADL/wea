import React, {useState,useEffect} from 'react'
import {Container,Row,Col,Form,InputGroup,Button,Dropdown,DropdownButton,Image} from 'react-bootstrap'
import axios from "axios";

function Admin() {
    const instance = axios.create({
        baseURL: 'http://localhost:3000/admin'
      });
    const [selected,setSelected]=useState('Estudiante')
    const [selected1,setSelected1]=useState("A")
    const [selectedTipo,setSelectedTipo]=useState("Capsula")
    const [selected2,setSelected2]=useState(1)
    const [cursos,setCursos]=useState([])
    const [asignaturas,setAsignaturas]=useState([])
    const [estudiantes,setEstudiantes]=useState([])
    const [profesores,setProfesores]=useState([])
    const [horarios,setHorarios]=useState([])
    const [rut,setRut]=useState("");
    const [pass,setPass]=useState(null);
    const [name,setName]=useState(null);
    const [selectedBloque,setSelectedBloque]=useState();
    const [selectedDia,setSelectedDia]=useState("");
    const [selectedCurso,setSelectedCurso]=useState(null);
    const [selectedRegistrado,setSelectedRegistrado]=useState(null);
    const [selectedJefe,setSelectedJefe]=useState(null);
    const [selectedAsignatura,setSelectedAsignatura]=useState(null);
    const [selectedIdHora,setSelectedIdHora]=useState(null);
    const [selectedPupilo,setSelectedPupilo]=useState(null);
    const [selectedProfesor,setSelectedProfesor]=useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [archivos, setArchivos] = useState([]);//probando
    const handleSelect = (e) =>{
        setSelected(e)
    }
    const handleSelect1 = (e) =>{
        setSelected1(e)
    }
    const handleSelect2 = (e) =>{
        setSelected2(e)
    }
    const handleSelectIdHora = (e) =>{
        setSelectedIdHora(e.target.value)
    }
    const handleSelectTipo = (e) =>{
        setSelectedTipo(e.target.value)
    }

    const handleSelectAsignatura = (e) =>{
        setSelectedAsignatura(e.target.value)
    }
    const handleSelectBloque = (e) =>{
        setSelectedBloque(e.target.value)
    }
    const handleSelectDia = (e) =>{
        setSelectedDia(e.target.value)
    }
    const handleSelectProfesor = (e) =>{
        setSelectedProfesor(e.target.value)
    }
    const handleSelectCurso = (e) =>{
        setSelectedCurso(e.target.value)
    }
    const handleSelectRegistrado = (e) =>{
        setSelectedRegistrado(e.target.value)
    }
    const handleSelectPupilo = (e) =>{
        setSelectedPupilo(e.target.value)
    }
    const handleSelectJefe = (e) =>{
        setSelectedJefe(e.target.value)
    }
    const handleRut = (e) =>{
        setRut(e.target.value)
    }
    const handleName = (e) =>{
        setName(e.target.value)
    }
    const handlePass = (e) =>{
        setPass(e.target.value)
    }
    const handleDeleteHorario = async (e) =>{
        try {
            await instance.post("/horario/delete",{
                id:selectedIdHora
            })
        } catch (error) {
            
        }
    }
    const handleDeleteCurso = async (e) =>{
        try {
            await instance.post("/curso/delete",{
                idCurso:selectedCurso
            })
        } catch (error) {
            
        }
    }
    const handleDeleteAsign = async (e) =>{
        try {
            await instance.post("/asignatura/delete",{
                idAsignatura:selectedAsignatura
            })
        } catch (error) {
            
        }
    }
    const handleDelete= async (e) =>{
        switch(selected){
            case "Estudiante":
                try {
                    await instance.post("/estudiante/delete",{
                        rut:rut
                    })
                } catch (error) {
                    
                }
                break;
            case "Profesor":
                try {
                    await instance.post("/profesor/delete",{
                        rut:rut
                    })
                } catch (error) {
                    
                }
                break;
            case "Apoderado":
                try {
                    await instance.post("/apoderado/delete",{
                        rut:rut
                    })
                } catch (error) {
                    
                }
                break;
            default:
                break;
                

        }
    }
    const handleSubmit = async (e) => {
        switch(selected){
            case "Estudiante":
                var request = {
                    rut:rut,
                    nombre:name,
                    password:pass,
                    registrado:selectedRegistrado,
                    idCurso:selectedCurso
                }
                let e = Object.fromEntries(Object.entries(request).filter(([_, v]) => v != null));
                try {
                    await instance.post("/estudiante",
                    e)
                    setPass(null)
                } catch (error) {
                    console.log(error)
                }
                break;
            case "Profesor":
                var request = {
                    rut:rut,
                    nombre:name,
                    password:pass,
                    registrado:selectedRegistrado,
                    jefe:selectedJefe
                }
                let p = Object.fromEntries(Object.entries(request).filter(([_, v]) => v != null));
                try {
                    await instance.post("/profesor",
                    p)
                    setPass(null)
                } catch (error) {
                    console.log(error)
                }
                break;
            case "Apoderado":
                var request = {
                    rut:rut,
                    nombre:name,
                    password:pass,
                    registrado:selectedRegistrado,
                    idEstudiante:selectedPupilo
                }
                let a = Object.fromEntries(Object.entries(request).filter(([_, v]) => v != null));
                try {
                    await instance.post("/apoderado",
                    a)
                    setPass(null)
                } catch (error) {
                    console.log(error)
                }
                break;

            default:
                break;
            }
    }
    const handleSubmitCurso = async (e) => {
                try {
                    await instance.post("/curso",{
                        idCurso:selectedCurso,
                        idProfesor:selectedProfesor,
                        grado:name+" "+selected1
                    }
                    )
                    
                } catch (error) {
                    
                }
            }
    const handleSubmitAsign = async (e) => {
            try {
                await instance.post("/asignatura",{
                    idAsignatura:selectedAsignatura,
                    idCurso:selectedCurso,
                    idProfesor:selectedProfesor,
                    nombre:name,
                    semestre:selected2
                }
                )
                    
            } catch (error) {
                    
            }
        }
    const handleSubmitHorario = async (e) => {
            try {
                await instance.post("/horario",{
                    idAsignatura:selectedAsignatura,
                    bloque:selectedBloque,
                    dia: selectedDia,
                }
                )
                    
            } catch (error) {
                    
            }
        }
    const handleSubmitArchivo = async (e)=>{
        try {
            await instance.post("/archivo",{
                idAsignatura:selectedAsignatura,
                archivo:selectedFile.name,
                tipo:selectedTipo,
                nombre:name

            })
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await instance.get("/");
            const response1 = await instance.get("/a");
            const response2 = await instance.get("/e");
            const response3 = await instance.get("/p");
            const response4 = await instance.get("/h");
            const response5 = await instance.get("/ar");
            setCursos(response.data);
            setAsignaturas(response1.data);
            setEstudiantes(response2.data);
            setProfesores(response3.data);
            setHorarios(response4.data);
            setArchivos(response5.data);
          } catch (err) {}
        };
    
        fetchData();
      }, []);
    
    return (
        <div>
            <Container>
            
            <Row>
                <Col>
                <Form>
                    <Form.Group controlId="formBasicPassword242">
                        <Form.Label>Rut</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control  onChange={handleRut}/>
                            <DropdownButton
                            as={InputGroup.Append}
                            variant="outline-secondary"
                            title={selected}
                            id="input-group-dropdown-1"
                            onSelect={handleSelect}
                            
                            >
                            <Dropdown.Item eventKey="Estudiante">Estudiante</Dropdown.Item>
                            <Dropdown.Item eventKey="Profesor">Profesor</Dropdown.Item>
                            <Dropdown.Item eventKey="Apoderado">Apoderado</Dropdown.Item>
                            </DropdownButton>
                            
                        </InputGroup>
                    
                    </Form.Group>
                    
                    
                    
                    {(() => {
                        switch (selected) {
                            case 'Estudiante':
                            return(<div>
                                <Form.Group controlId="formBasicPassword54">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control onChange={handleName} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword23">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control onChange={handlePass} />
                                </Form.Group>
                                <Form.Group>
                                <Form.Label>Curso</Form.Label>
                                <Form.Control as="select" onChange={handleSelectCurso}>
                                    <option value={null}>Mantener</option>
                                    {cursos.map(curso =>{
                                        return(
                                            <option value={curso.id} key={curso.id}>{curso.grado}</option>
                                        )
                                    })}
                                    
                                </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Registrado</Form.Label>
                                    <Form.Control as ="select" onChange={handleSelectRegistrado}>
                                        <option value={null}>Mantener</option>
                                        <option value={true}>true</option>
                                        <option value={false}>false</option>
                                        </Form.Control>
                                </Form.Group>
                                <br/>
                                <Button  variant="primary" type="submit" onClick={handleSubmit}>
                                    Add/Update
                                </Button>
                                <Button  variant="danger" type="submit" onClick={handleDelete}>
                                    Delete
                                </Button>
                                </div>)
                                case 'Profesor':
                                    return(<div>
                                            <Form.Group controlId="formBasicPassword5">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control onChange={handleName} />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword1">
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control onChange={handlePass} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Registrado</Form.Label>
                                                <Form.Control as ="select" onChange={handleSelectRegistrado}>
                                                    <option value={null}>Mantener</option>
                                                    <option value={true}>true</option>
                                                    <option value={false}>false</option>
                                                    </Form.Control>
                                            </Form.Group>
                                            
                                            <Form.Group>
                                                <Form.Label>Profesor Jefe</Form.Label>
                                                <Form.Control as ="select" onChange={handleSelectJefe}>
                                                    <option value={null}>Mantener</option>
                                                    <option value={true}>true</option>
                                                    <option value={false}>false</option>
                                                    </Form.Control>
                                            </Form.Group>
                                            <br/>
                                            <Button  variant="primary" type="submit" onClick={handleSubmit}>
                                                Add/Update
                                            </Button>
                                            <Button  variant="danger" type="submit" onClick={handleDelete}>
                                                Delete
                                            </Button>
                                    </div>)
                                case "Apoderado":
                                    return(<div>
                                        <Form.Group controlId="formBasicPassword3">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control onChange={handleName} />
                                            </Form.Group>
                                        <Form.Group controlId="formBasicPassword4">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control onChange={handlePass} />
                                        </Form.Group>
                            
                                        <Form.Group>
                                            <Form.Label>Registrado</Form.Label>
                                            <Form.Control as ="select" onChange={handleSelectRegistrado}>
                                                    <option value={null}>Mantener</option>
                                                    <option value={true}>true</option>
                                                    <option value={false}>false</option>
                                                    </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>id Pupilo</Form.Label>
                                            <Form.Control as="select" onChange={handleSelectPupilo}>
                                                <option value={null}>No Cambiar</option>
                                                {estudiantes.map(estudiante =>{
                                                    return(
                                                        <option value={estudiante.id} key={estudiante.id}>{estudiante.id}</option>
                                                    )
                                                })}
                                                
                                            </Form.Control>
                                            </Form.Group>
                                        <br/>
                                        <Button  variant="primary" type="submit" onClick={handleSubmit}> 
                                            Add/Update
                                        </Button>
                                        <Button  variant="danger" type="submit" onClick={handleDelete}>
                                            Delete
                                        </Button>
                                </div>)

                                    

                        
                            
                        };
                        })()}
                    </Form>
                    
                </Col>
                <Col>
                    <Col>
                    <Form>
                    <Form.Group>
                        <Form.Label>Curso</Form.Label>
                        <Form.Control as="select" onChange={handleSelectCurso}>
                            <option value={null}>Crear Nuevo</option>
                            {cursos.map(curso =>{
                                return(
                                    <option value={curso.id} key={curso.id}>{curso.grado} ({curso.id})</option>)
                                    })}
                                                
                        </Form.Control>
                        <Form.Label>Profesor</Form.Label>
                        <Form.Control as="select" onChange={handleSelectProfesor}>
                            <option value={null}>Escoger Profesor</option>
                            {profesores.map(profe =>{
                                return(
                                    <option value={profe.rut} key={profe.rut}>{profe.nombre} ({profe.rut})</option>)
                                    })}
                                                
                        </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword2">
                                    <Form.Label>Grado</Form.Label>
                                    <InputGroup>
                                    <Form.Control onChange={handleName} />
                                    <DropdownButton
                                    as={InputGroup.Append}
                                    variant="outline-secondary"
                                    title={selected1}
                                    id="input-group-dropdown-2"
                                    onSelect={handleSelect1}
                                    
                                    >
                                    <Dropdown.Item eventKey="A">A</Dropdown.Item>
                                    <Dropdown.Item eventKey="B">B</Dropdown.Item>
                                    </DropdownButton>
                                    </InputGroup>
                        </Form.Group>
                        <Button  variant="primary" type="submit" onClick={handleSubmitCurso}> 
                                            Add/Update
                        </Button>
                        <Button  variant="danger" type="submit" onClick={handleDeleteCurso}>
                                            Delete
                        </Button>
                    </Form>
                    </Col>

                
                
                
                <Col>
                    <Form>
                    <Form.Group>
                            <Form.Label>Asignatura</Form.Label>
                            <Form.Control as="select" onChange={handleSelectAsignatura}>
                            <option value={null}>Mantener</option>
                                {asignaturas.map(asignatura =>{
                                    return(
                                    <option value={asignatura.id} key={asignatura.id}>{asignatura.nombre} ({asignatura.id})</option>
                                            )
                                    })}
                                                
                            </Form.Control>
                            <Form.Label>Profesor</Form.Label>
                                <Form.Control as="select" onChange={handleSelectProfesor}>
                                    <option value={null}>Escoger Profesor</option>
                                    {profesores.map(profe =>{
                                        return(
                                            <option value={profe.rut} key={profe.rut}>{profe.nombre} ({profe.rut})</option>)
                                            })}
                                                        
                                </Form.Control>
                            <Form.Label>Curso</Form.Label>
                                        <Form.Control as="select" onChange={handleSelectCurso}>
                                            <option value={null}>Mantener</option>
                                            {cursos.map(curso =>{
                                                return(
                                                    <option value={curso.id} key={curso.id}>{curso.grado} ({curso.id})</option>
                                                    )
                                                })}
                                                
                                        </Form.Control>
                                        <Form.Label>Nombre</Form.Label>
                                    <InputGroup>
                                    <Form.Control onChange={handleName} />
                                    <DropdownButton
                                    as={InputGroup.Append}
                                    variant="outline-secondary"
                                    title={selected2}
                                    id="input-group-dropdown-3"
                                    onSelect={handleSelect2}
                                    
                                    >
                                    <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                                    <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                                    </DropdownButton>
                                    </InputGroup>
                                    <br/>
                                    <Button  variant="primary" type="submit" onClick={handleSubmitAsign}> 
                                            Add/Update
                                    </Button>
                                    <Button  variant="danger" type="submit" onClick={handleDeleteAsign}>
                                                        Delete
                                    </Button>
                    </Form.Group>
                             
                    </Form>
                    
                </Col>
                
                </Col>
                <Col>
                <Form>
                        <Form.Group>
                            <Form.Label>Asignatura</Form.Label>
                            <Form.Control as="select" onChange={handleSelectAsignatura}>
                            <option value={null}>Mantener</option>
                                {asignaturas.map(asignatura =>{
                                    return(
                                    <option value={asignatura.id} key={asignatura.id}>{asignatura.nombre} ({asignatura.id})</option>
                                            )
                                    })}
                                                
                            </Form.Control>
                            <Form.Label>Bloque Horario</Form.Label>
                                            <Form.Control as ="select" onChange={handleSelectBloque}>
                                                    <option value={null}>Seleccionar Bloque</option>
                                                    <option value={1}>Bloque 1</option>
                                                    <option value={2}>Bloque 2</option>
                                                    <option value={3}>Bloque 3</option>
                                                    <option value={4}>Bloque 4</option>
                                                    <option value={5}>Bloque 5</option>
                                                    <option value={6}>Bloque 6</option>
                                            </Form.Control>
                            <Form.Label>Dia</Form.Label>
                                            <Form.Control as ="select" onChange={handleSelectDia}>
                                                    <option value={null}>Seleccionar Dia</option>
                                                    <option value={"Lunes"}>Lunes</option>
                                                    <option value={"Martes"}>Martes</option>
                                                    <option value={"Miercoles"}>Miercoles</option>
                                                    <option value={"Jueves"}>Jueves</option>
                                                    <option value={"Viernes"}>Viernes</option>
                                            </Form.Control>
                                            <br/>
                                            <Button  variant="primary" type="submit" onClick={handleSubmitHorario}> 
                                            Add
                                            </Button>
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group>
                                <Form.Label>Horario</Form.Label>
                                <Form.Control as="select" onChange={handleSelectIdHora}>
                                <option value={null}>Mantener</option>
                                    {horarios.map(hora =>{
                                        return(
                                        <option value={hora.id} key={hora.id}>id {hora.id}/idA {hora.idAsignatura}/Bloque {hora.bloque}/{hora.dia}</option>
                                                )
                                        })}
                                </Form.Control>
                                <br/>
                                <Button  variant="danger" type="submit" onClick={handleDeleteHorario}>
                                                        Delete
                                </Button>
                                
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group>
                        <Form.Label>Asignatura</Form.Label>
                            <Form.Control as="select" onChange={handleSelectAsignatura}>
                            <option value={null}>Mantener</option>
                                {asignaturas.map(asignatura =>{
                                    return(
                                    <option value={asignatura.id} key={asignatura.id}>{asignatura.nombre} ({asignatura.id})</option>
                                            )
                                    })}
                                                
                            </Form.Control>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control onChange={handleName} />
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as ="select" onChange={handleSelectTipo}>
                                                    <option value={null}>Tipo de Archivo</option>
                                                    <option value={"Capsula"}>Capsula</option>
                                                    <option value={"Ejercicio"}>Ejercicio</option>
                                                    <option value={"Otro"}>Otro</option>
                                                    
                                            </Form.Control>
                        
                            <Form.File onChange={(e) => setSelectedFile(e.target.files[0])} id="exampleFormControlFile1" label="Example file input" />
                        
                    
                        <Button  variant="primary" type="submit" onClick={handleSubmitArchivo}> 
                                            Add
                        </Button>
                        </Form.Group>
                        
                    </Form>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Admin
