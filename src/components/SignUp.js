import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ShowStrength from './inc/ShowStrength'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [ password, setPassword ] = useState('')
  const [show , setShow] = useState(false)
  const [icon, setIcon] = useState(AiFillEye)
  const [comfirmPassword, setComfirmPassword] = useState('')
  const [showComfirm, setShowComfirm] = useState(false)
  const [iconComfirm, setIconComfirm] = useState(AiFillEye)
  const [consistancy, setConsistancy] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()
  
  const handlePasswordChange = event => {
    const newPassword = event.target.value
    setPassword(newPassword)
  }
  const handleComfirmPasswordChange = event => {
    const newPassword = event.target.value
    setComfirmPassword(newPassword)
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
 
  const toggle2 = () => {
    var updatedShow
    var icon
    if (showComfirm === true) {
      updatedShow = false
      icon = AiFillEye
    } else {
      updatedShow = true
      icon = AiFillEyeInvisible
    }
    setShowComfirm(updatedShow)
    setIconComfirm(icon)
  }

  const CheckConsistancy =() => {
    var consistancy 
    if (password === comfirmPassword) {
      consistancy = true 
    } else {
      consistancy = false 
    }
    setConsistancy(consistancy)
  }

  useEffect(CheckConsistancy, [comfirmPassword])

  const signUp = event => {
    event.preventDefault()
    const form = event.target
    const data = Object.fromEntries(new FormData(form))
    if (consistancy) {
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }) 
      .then(res => res.json())
      .then(res => {
        if (typeof res === 'string') {
          navigate('/logIn')
        } else {
          setErrorMessage(res.error)
        }
      })
    } else {
      setErrorMessage('Password does not match!')
    }
  }

  return (
    <Container className='mx-auto mt-1' style={{width:"70%"}}>
      <Form onSubmit={signUp} style={{padding:"1rem", backgroundColor:"rgb(51,73,96)", borderRadius:"1rem"}}>
        <h1 className='text-center'>Sign Up</h1>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter username" />
        </Form.Group>
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
          <ShowStrength
            password = { password }
          />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div style={{display:"flex"}}>
          <Form.Control onChange={handleComfirmPasswordChange} type={showComfirm? "text": "password"}  placeholder="comfirmPassword" />
          <Button className='col' variant="outline-*" style={{border:"none"}} onClick={ toggle2 }>{iconComfirm}</Button>
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

export default SignUp