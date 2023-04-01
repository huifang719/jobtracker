import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { Container } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ShowStrength from './inc/ShowStrength'
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object ({
  name:z.string().min(3,{message: "User name must contain at least 3 character(s)"}),
  email:z.string().email(), 
  password:z.string().min(6, {message: "Password must contain at least 6 character(s)"}),
  confirmPassword:z.string().min(6 ,{message: "Password must contain at least 6 character(s)"})
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
});

type FormData = z.infer<typeof schema>

const SignUp = () => {
  const [password, setPassword] =useState<string>('')
  const [show , setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()
  const {register, handleSubmit, formState:{ errors, isSubmitting}}=useForm<FormData>({resolver:zodResolver(schema)})

  const signUp = async(data: FieldValues)=> {
    try {
      const newUser = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }) 
    } 
    catch(error:any) {
      setErrorMessage(error.message)
    }
  }

  return (
    <Container className='mx-auto mt-1' style={{width:"70%", maxWidth:"500px", minWidth:"300px"}}>
      <IconContext.Provider value={{  color: 'rgb(110,223,94)' }}>
        <Form onSubmit={handleSubmit(signUp)} style={{padding:"1rem", backgroundColor:"rgb(51,73,96)", borderRadius:"1rem"}}>
          <h1 className='text-center'>Sign Up</h1>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text"  {...register('name')} placeholder="Enter username" />
            <Form.Text style={{color:"rgb(110,223,94)"}} >
                {errors.name?.message}
            </Form.Text> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
            <Form.Text style={{color:"rgb(110,223,94)"}} >
                {errors.email?.message}
            </Form.Text> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div style={{display:"flex"}}>
              <Form.Control type={show? "text": "password"} {...register('password')} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              <Button className='col' variant="outline-*" style={{border:"none"}} onClick={() => setShow(!show) }>{show?<AiFillEyeInvisible />:<AiFillEye /> }</Button>
            </div>       
            <ShowStrength
              password = { password }
            />
            <Form.Text style={{color:"rgb(110,223,94)"}} >
              {errors.password?.message}
          </Form.Text> 
          </Form.Group> 
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div style={{display:"flex"}}>
              <Form.Control type={showConfirm? "text": "password"} {...register('confirmPassword')} placeholder="Password" />
              <Button className='col' variant="outline-*" style={{border:"none"}} onClick={() => setShowConfirm(!showConfirm) }>{!showConfirm?<AiFillEyeInvisible />:<AiFillEye /> }</Button>
            </div>
            <Form.Text style={{color:"rgb(110,223,94)"}} >
              {errors.confirmPassword?.message}
            </Form.Text> 
          </Form.Group>
              {errorMessage&&<Form.Text style={{color:"rgb(110,223,94)"}} >
                {errorMessage}
              </Form.Text>};
              {/* <Form.Text style={{color:"rgb(110,223,94)"}} >
              {errors.custom?.message}
              </Form.Text> */}
          <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}} disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </Form>
      </IconContext.Provider>
    </Container>
  )
}

export default SignUp