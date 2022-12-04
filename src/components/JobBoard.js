import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { IconContext } from "react-icons"
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

function JobBoard({ loggedInEmail, jobsList }) {
  const [jobCheck, setJobCheck] = useState([])

  //when user doing job search, check if each job has been saved yet and show the correct item
  const init = () =>{
    jobsList.map(job => {
      var  description= job.description
      const fetchJob = async () => {
        const {data, error} = await supabase
          .from('jobs')
          .select()
          .eq(description, description)

        if (error) {
          setJobCheck(jobCheck=>[...jobCheck,false ]) 
        } else {
          setJobCheck(jobCheck=>[...jobCheck,true ]) 
        }
      }
      fetchJob(job)
    });
  } 
 
  useEffect(init, [jobsList])

  const toggle = index => {
    console.log(jobCheck)
    if (jobCheck[index] === false) {
      saveJob(index)
    } else {
      deleteJob(index)
      setJobCheck(jobCheck.map((check,i) => {
        if (i===index){
          return false
        } else {
          return check
        }
      }))
    }  
  }

  const saveJob = async(index) => {
    console.log('miao')
    const {title, description, location, url} = jobsList[index]
    const email = loggedInEmail
    const { data, error } = await supabase 
      .from('jobs')
      .insert([{
        title,description,location,url, email
      }])
    if (data) {
      console.log('job saved')
      setJobCheck(jobCheck.map((check,i) => {
        if (i===index){
          return true
        } else {
          return check
        }
      }))
    } 
    if (error) {
      console.log(error)
    }
    // if (loggedInEmail !== null) {
    //   fetch('/api/save', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify([jobtoBeSaved, loggedInEmail])
    //   })
    //   .then(res => res.json())
    //   .then(res => {
    // console.log('job saved')    
    // })
    // }
  }

  const deleteJob = index => {
  //   const description = jobsList[index].description
  //   fetch(`/api/save/${description}`, {
  //     method: 'DELETE'
  //   })
  //   .then(res => res.json())
  //   .then(res => {
  //   console.log('job removed')
  // })
  }

  return (
    <IconContext.Provider value={{color:"rgb(110,223,94)", size:"2rem"}}>
      <Container className="d-block g-1">
        {jobsList.map((job, index) =>       
          <Card key={index}>
            <Card.Header as="h5">{job.location}</Card.Header>
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Text>
                {job.description}
              </Card.Text>
              <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}} href={job.url}>Read more</Button>
              <Button className='col' variant="outline-*" style={{border:"none"}} onClick={ ()=> toggle(index) }>{jobCheck[index]?<AiFillHeart />:<AiOutlineHeart /> }</Button>
            </Card.Body>
          </Card>
        )}
      </Container>  
    </IconContext.Provider>  
  )
}

export default JobBoard