import { Container } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'

function LogIn() {
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

  const logIn = event => {
    const form = event.target
    const data = Object.fromEntries(new FormData(form))
    console.log(data)
    fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }) 
  }

  return(
    <Container className='mx-auto mt-5' style={{width:"70%"}}>
    <Form  onSubmit={logIn}>
      <h1 className='text-center'>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div style={{display:"flex"}}>
              <Form.Control onChange={handlePasswordChange} type={show? "text": "password"} name="password" placeholder="Password" />
              <Button inline className='col' variant="outline-*" style={{border:"none"}} onClick={ toggle }>{icon}</Button>
            </div>       
          </Form.Group> 
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </Container>
  )
}

export default LogIn