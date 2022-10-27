import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SavedJob from "./SavedJob";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { IconContext } from "react-icons"
import { useState } from "react";

function JobBoard({ loggedInEmail, jobsList }) {
  // const [jobSaved, setJobsaved] = useState({index: false})
  
  const savedJob = (index, event) => {
    const jobtoBeSaved = jobsList[index]
    if (loggedInEmail !== null) {
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([jobtoBeSaved, loggedInEmail])
      })
    }
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
              <Button className='col' variant="outline-*" style={{border:"none"}} onClick={ ()=> savedJob(index) }><AiOutlineHeart /></Button>
            </Card.Body>
          </Card>
        )}
      </Container>  
    </IconContext.Provider>  
  )
}

export default JobBoard