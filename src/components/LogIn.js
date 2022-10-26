import { Container } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [ password, setPassword ] = useState('')
  const [show , setShow] = useState(false)
  const [icon, setIcon] = useState(AiFillEye)
  const [loggedInEmail, setloggedInEmail] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()
  
  const handlePasswordChange = event => {
    const newPassword = event.target.value
    setPassword(newPassword)
  }

  const toggle = () => {
    var updatedShow
    var icon
    if (show === true) {
      updatedShow = false
      icon = AiFillEye
    } else {
      updatedShow = true
      icon = AiFillEyeInvisible
    }
    setShow(updatedShow)
    setIcon(icon)
  }

  const logIn = event => {
    const form = event.target
    const data = Object.fromEntries(new FormData(form))
    fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }) 
      .then(res => res.json())
      .then(res => {
        if (typeof res === 'string') {
          setloggedInEmail(res)
          navigate('/')
        } else {
          setErrorMessage(res.error)
        }
        }
      )  
  }

  const checkSession = () => {
    fetch('/api/sessions')
    .then(res => res.json())
    .then(email => {
    if (typeof email === 'string') {
      setloggedInEmail(email)
    }
  })
  }

  useEffect(checkSession, [loggedInEmail])

  return(
    <Container className='mx-auto mt-1' style={{width:"70%"}}>
    <Form  onSubmit={logIn} style={{padding:"1rem", backgroundColor:"rgb(51,73,96)", borderRadius:"1rem"}}>
      <h1 className='text-center'>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div style={{display:"flex"}}>
            <Form.Control onChange={handlePasswordChange} type={show? "text": "password"} name="password" placeholder="Password" />
            <Button className='col' variant="outline-*" style={{border:"none"}} onClick={ toggle }>{icon}</Button>
          </div>       
      </Form.Group>   
      <div style={errorMessage===null? {display:"none"}: {color:"red"}}>{errorMessage}</div> 
      <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}} type="submit">
        Submit
      </Button>
    </Form>
  </Container>
  
  )
}

export default LogIn