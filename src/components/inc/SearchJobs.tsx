import {  Button, Form } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  title: z.string().min(5, { message: "Must be 5 or more characters long" }),
  location: z.string().min(5, { message: "Must be 5 or more characters long" }),
})

type FormData = z.infer<typeof schema>

interface Props {
  handleSearch: (data: FieldValues) => void
}
const SearchJobs = ({handleSearch}: Props) => {
  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormData>({resolver: zodResolver(schema)})

  return (
    <>
      <Form onSubmit={handleSubmit(handleSearch)} className='d-flex mt-4' style={{height: "3rem"}}>
        <Form.Control
          {...register('title')}
          type="search"
          placeholder="Job Title"
          className="me-2"
          name = "title"
          aria-label="Search"
        />
        <Form.Text style={{color:"rgb(110,223,94)"}} >
          {errors.title?.message}
        </Form.Text>
        <Form.Control
          {...register('location')}
          type="search"
          placeholder="Location"
          className="me-2"
          name = "location"
          aria-label="Search"
        />
        <Form.Text style={{color:"rgb(110,223,94)"}} >
          {errors.location?.message}
        </Form.Text>
        <Button type="submit" disabled={isSubmitting} style={{backgroundColor:"rgb(110,223,94)", border:"none"}}>Search</Button>
      </Form>
    </>
  )
}

export default SearchJobs;