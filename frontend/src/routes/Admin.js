import React, {useState,useEffect} from 'react'
import {Container,Row,Col,Form,InputGroup,Button,Dropdown,DropdownButton} from 'react-bootstrap'
import axios from "axios";

function Admin() {
    const instance = axios.create({
        baseURL: 'http://localhost:3000/admin'
      });
    const [selected,setSelected]=useState('Estudiante')
    const [selected1,setSelected1]=useState('A')
    const [selected2,setSelected2]=useState(1)
    const [cursos,setCursos]=useState([])
    const [asignaturas,setAsignaturas]=useState([])
    const [estudiantes,setEstudiantes]=useState([])
    const [rut,setRut]=useState("");
    const [pass,setPass]=useState(null);
    const [name,setName]=useState(null);
    const [selectedCurso,setSelectedCurso]=useState(null);
    const [selectedRegistrado,setSelectedRegistrado]=useState(null);
    const [selectedJefe,setSelectedJefe]=useState(null);
    const [selectedAsignatura,setSelectedAsignatura]=useState(null);
    const [selectedPupilo,setSelectedPupilo]=useState(null);
    const handleSelect = (e) =>{
        setSelected(e)
    }
    const handleSelect1 = (e) =>{
        setSelected1(e)
    }
    const handleSelect2 = (e) =>{
        setSelected2(e)
    }
    const handleSelectAsignatura = (e) =>{
        setSelectedAsignatura(e.target.value)
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
                    idCurso:selectedCurso,
                    idAsignatura:selectedAsignatura,
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
                        grado:name,
                        letra:selected1
                    }
                    )
                    
                } catch (error) {
                    
                }
            }
    const handleSubmitAsign = async (e) => {
            try {
                await instance.post("/asignatura",{
                    idCurso:selectedCurso,
                    nombre:name,
                    semestre:selected2
                }
                )
                    
            } catch (error) {
                    
            }
        }
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await instance.get("/");
            const response1 = await instance.get("/a");
            const response2 = await instance.get("/e");
            setCursos(response.data);
            setAsignaturas(response1.data);
            setEstudiantes(response2.data);
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
                                            <Form.Label>Asignatura</Form.Label>
                                            <Form.Control as="select" onChange={handleSelectAsignatura}>
                                                <option value={null}>Mantener</option>
                                                {asignaturas.map(asignatura =>{
                                                    return(
                                                        <option value={asignatura.id} key={asignatura.id}>{asignatura.nombre}</option>
                                                    )
                                                })}
                                                
                                            </Form.Control>
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
            </Row>
        
            </Container>
        </div>
    )
}

export default Admin
