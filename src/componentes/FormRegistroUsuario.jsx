import React, { useState } from 'react'

import {
    Form,
    Col,
    Row,
    Card,
    Button
} from 'react-bootstrap'

import { useHistory } from 'react-router-dom'
import './BarraMenu.css'
import { auth, store } from '../firebaseconfig'
import swal from 'sweetalert'

export const FormRegistroUsuario = (props) => {

    const historial = useHistory()
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [club, setClub] = useState('')
    const [genero, setGenero] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [msgError, setMsgError] = useState(null)

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const Llamada = (event) => {
        
        handleSubmit(event);
        Registro(event);
    }

    const Registro = (event) => {
        event.preventDefault()
        const usuario = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            club: club,
            genero: genero,
            password: password,
            rol: "Usuario",
            amistososApuntado: [],
            fanaticsApuntado: []
        }
        try {
            /* const data = await store.collection('Usuarios').add(usuario) */
            if (password === confirmPassword && nombre.trim() && telefono.trim() && genero.trim()) {
                auth.createUserWithEmailAndPassword(email, password)
                    .then(r => {
                        historial.push('/')
                        store.collection('Usuarios').add(usuario)
                        swal({
                            text: "Usuario Registrado",
                            icon: "success",
                            timer: "2000"
                        })
                    })
                    .catch(event => {

                        if (event.code === 'auth/invalid-email') {
                            setMsgError('Formato de Email Incorrecto')
                        }
                        if (event.code === 'auth/weak-password') {
                            setMsgError('La contrase??a debe tener 6 caracteres o m??s')
                        }
                        if (event.code === 'auth/email-already-in-use') {
                            setMsgError('El usuario ya est?? en uso')
                        }
                    })
            }else{
                if(password !== confirmPassword){
                    setMsgError('Las contrase??as no coinciden')
                }
            }
        } catch (event) {
            console.log(event)
        }

    }

    return (
        <div className="AlinearCentro">
            <Card bsprefig style={{ width: '50rem', backgroundColor: 'white', padding: '10px' }}>
                <h2 className="AlinearCentroHorizontal" >Registrar Usuario</h2>
                <Form noValidate validated={validated} onSubmit={Llamada}>
                    <Form.Group as={Row} controlId="nombre">
                        <Form.Label column sm="2">Nombre: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="text"
                                placeholder="Introduce nombre"
                                onChange={(e) => { setNombre(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="email">
                        <Form.Label column sm="2">Email: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="email"
                                placeholder="Introduce email"
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="telefono">
                        <Form.Label column sm="2">Telefono: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="text"
                                placeholder="Introduce telefono"
                                onChange={(e) => { setTelefono(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="clubs">
                        <Form.Label column sm="2">Club: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                as="select"
                                type="text"
                                placeholder="Introduce Club"
                                onChange={(e) => { setClub(e.target.value) }}
                                required
                            >
                                <option>--Sin especificar--</option>
                                <option>Club 1</option>
                                <option>Club 2</option>
                                <option>Club 3</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="genero">
                        <Form.Label column sm="2">G??nero: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                as="select"
                                type="text"
                                placeholder="Introduce Genero"
                                onChange={(e) => { setGenero(e.target.value) }}
                                required
                            >
                                <option>--Sin especificar--</option>
                                <option>Masculino</option>
                                <option>Femenino</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="contrase??a">
                        <Form.Label column sm="2">Contrase??a: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="password"
                                placeholder="Introduce Contrase??a"
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="confirmarContrase??a">
                        <Form.Label column sm="2">Confirmar Contrase??a: </Form.Label>
                        <Col sm="10" >
                            <Form.Control
                                type="password"
                                placeholder="Introduce Contrase??a"
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="AlinearDerecha">
                        Registrarme
                    </Button>
                </Form>

                {
                    msgError != null ?
                        (
                            <div className="MensajeError">
                                <br></br>
                                <p>{msgError}</p>
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                }
            </Card>
        </div>
    )
}

