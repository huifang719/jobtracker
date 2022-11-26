import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { IconContext } from "react-icons"
import { useEffect, useState } from "react";

function JobBoard({ loggedInEmail, jobsList }) {
  const [jobIcon, setJobIcon] = useState([])
  const init = () =>{
      jobsList.map(job => {
      var  description= job.description
      fetch(`/api/save/${loggedInEmail}/${description}`)
      .then(res => res.json())  
      .then(res => {
        if (typeof res === 'string') {
          setJobIcon(jobIcon=>[...jobIcon, <AiOutlineHeart />]) 
        } else {
          setJobIcon(jobIcon=>[...jobIcon, <AiFillHeart />])
        }
      })
    });
} 
 
  useEffect(init, [jobsList])

  const toggle = index => {
    if (jobIcon[index] == <AiOutlineHeart />) {
      saveJob(index)
      setJobIcon(jobIcon.map((icon,i) => {
        if (i===index){
          return <AiFillHeart />
        } else {
          return icon
        }
      }))
    } else {
      deleteJob(index)
      setJobIcon(jobIcon.map((icon,i) => {
        if (i===index){
          return <AiOutlineHeart />
        } else {
          return icon
        }
      }))
    }  
  }

  const saveJob = index => {
    const jobtoBeSaved = jobsList[index]
    if (loggedInEmail !== null) {
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([jobtoBeSaved, loggedInEmail])
      })    
    }
  }

  const deleteJob = index => {
    const description = jobsList[index].description
    fetch(`/api/save/${description}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
    console.log('job removed')
  })
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
              <Button className='col' variant="outline-*" style={{border:"none"}} onClick={ ()=> toggle(index) }>{jobIcon[index]}</Button>
            </Card.Body>
          </Card>
        )}
      </Container>  
    </IconContext.Provider>  
  )
}

export default JobBoard