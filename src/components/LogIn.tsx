import { Container } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { z } from 'zod';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface PropState {
  logIn: (data: FieldValues) => void,
  errorMessage: string | null
}

const schema = z.object ({
  email:z.string().email(), 
  password:z.string().min(6)
})

type FormData = z.infer<typeof schema>

const LogIn = ({  logIn, errorMessage }: PropState) => {
  const {register, handleSubmit, formState:{ errors, isSubmitting}}=useForm<FormData>({resolver:zodResolver(schema)})
  const [show , setShow] = useState(false)

  return(
    <Container className='mx-auto mt-1' style={{width:"70%", maxWidth:"500px", minWidth:"300px"}}>
    <Form  onSubmit={handleSubmit(logIn)} style={{padding:"1rem", backgroundColor:"rgb(51,73,96)", borderRadius:"1rem"}}>
      <h1 className='text-center'>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <div style={{display:"flex"}}>
        <Form.Control placeholder="Enter email" {...register('email')} />
        </div> 
        <Form.Text className="text-danger">
            {errors.email?.message}
        </Form.Text> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div style={{display:"flex"}}>
          <Form.Control type={show? "text": "password"} {...register('password')} placeholder="Password" />
            <Button className='col' variant="outline-*" style={{border:"none"}} onClick={() => setShow(!show) }>{show?<AiFillEye />:<AiFillEyeInvisible /> }</Button>
          </div>    
          <Form.Text style={{color:"rgb(110,223,94)"}} >
            {errors.password?.message}
          </Form.Text> 
          {errorMessage&&<Form.Text style={{color:"rgb(110,223,94)"}}>{errorMessage}</Form.Text>}   
      </Form.Group>  
      <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}} disabled={isSubmitting} type="submit">
        Submit
      </Button>
    </Form>
  </Container>
  )
}

export default LogIn