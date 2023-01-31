import { Container } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import React from 'react';

const LogIn = ({  logIn, errorMessage }) => {
  const [ password, setPassword ] = useState('')
  const [show , setShow] = useState(false)
  const [icon, setIcon] = useState(AiFillEye)
 

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

  return(
    <Container className='mx-auto mt-1' style={{width:"70%"}}>
    <Form  onSubmit={ logIn } style={{padding:"1rem", backgroundColor:"rgb(51,73,96)", borderRadius:"1rem"}}>
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
            <Form.Control onChange={handlePasswordChange} type={show? "text": "password"} name="password" placeholder="Password" />
            <Button className='col' variant="outline-*" style={{border:"none"}} onClick={ toggle }>{icon}</Button>
          </div>       
      </Form.Group>   
      <div style={errorMessage===null? {display:"none"}: {color:"rgb(110,223,94)"}}>{errorMessage}</div> 
      <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}} type="submit">
        Submit
      </Button>
    </Form>
  </Container>
  )
}

export default LogIn