import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ShowStrength from './inc/ShowStrength'
import { useNavigate } from 'react-router-dom';
import  supabase  from '../supabaseClient'

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

  const handleSignUp = async(e) => {
    e.preventDefault()
    const form = e.target
    const userData = Object.fromEntries(new FormData(form))

    if (consistancy) {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name
          }
        }
      })
      console.log(data)
      alert("Please comfirm your sign up in your inbox!")
      navigate('/logIn')
    } else {
      setErrorMessage('Password does not match!')
    }
  }
  return (
    <Container className='mx-auto mt-1' style={{width:"70%"}}>
      <Form onSubmit={handleSignUp} style={{padding:"1rem", backgroundColor:"rgb(51,73,96)", borderRadius:"1rem"}}>
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
            <Form.Control onChange={e => setPassword(e.target.value)} type={show? "text": "password"} name="password" placeholder="Password" />
            <Button inline className='col' variant="outline-*" style={{border:"none"}} onClick={ toggle }>{icon}</Button>
          </div>       
          <ShowStrength
            password = { password }
          />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div style={{display:"flex"}}>
          <Form.Control onChange={e=> setComfirmPassword(e.target.value)} type={showComfirm? "text": "password"}  placeholder="comfirmPassword" />
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