import { Container } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import React from 'react';

const LogIn = ({  handleLogIn, errorMessage, handleGoogleAuth }) => {
  const [ password, setPassword ] = useState('')
  const [show , setShow] = useState(false)
  const [icon, setIcon] = useState(AiFillEye)
  
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

  return(
    <Container className='mx-auto mt-1' style={{width:"70%"}}>
    <Form  onSubmit={ handleLogIn } style={{padding:"1rem", backgroundColor:"rgb(51,73,96)", borderRadius:"1rem"}}>
      <h1 className='text-center'>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <div style={{display:"flex"}}>
        <Form.Control type="email" name="email" placeholder="Enter email" />
        <Button className='col' variant="outline-*" style={{display:"none"}} onClick={ toggle }>{icon}</Button>
        </div> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div style={{display:"flex"}}>
            <Form.Control onChange={e=>setPassword(e.target.value)} type={show? "text": "password"} name="password" placeholder="Password"></Form.Control>
            <Button className='col' variant="outline-*" style={{border:"none", color:"rgb(110,223,94)"}} onClick={ toggle }>{icon}</Button>
          </div>       
      </Form.Group>   
      <div style={errorMessage===null? {display:"none"}: {color:"rgb(110,223,94)"}}>{errorMessage}</div> 
      <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}} type="submit">
        Submit
      </Button>
      <Button style={{backgroundColor:"rgb(110,223,94)", border:"none", marginLeft:"0.5rem"}} onClick={handleGoogleAuth}>Login with Google</Button>
    </Form>
  </Container>
  )
}

export default LogIn