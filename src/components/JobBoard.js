import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SavedJob from "./SavedJob";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { IconContext } from "react-icons"
import { useEffect, useState } from "react";

function JobBoard({ loggedInEmail, jobsList }) {
  const [jobSaved, setJobSaved] = useState(null)

  const init =() => { 
    const jobCheck = jobsList.map(job => {
    job["isSave"] = false 
    return job['isSave']
  })
    return setJobSaved(jobCheck)
  }
 
  useEffect(init, [jobsList])

  // const checkIfSaved = index => {
  //   if (jobSaved[index]['isSave'] === true) {
  //     icon = <AiFillHeart />
  //   } else {
  //     icon = <AiOutlineHeart />
  //   }
  // }

  var icon = <AiOutlineHeart />
  const savedJob = (index, event) => {
    event.preventDefault()
    icon = <AiFillHeart />
    const jobtoBeSaved = jobsList[index]
    if (loggedInEmail !== null) {
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([jobtoBeSaved, loggedInEmail])
      })    
    }
    // const updatedSaveCheck = jobSaved.map((item, i) => {
    //   if(i== index) {
    //     return {index: true}
    //   } else {
    //     return item
    //   }
    // })
    //   setJobSaved(updatedSaveCheck)
    // }
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
              <Button className='col' variant="outline-*" style={{border:"none"}} onClick={ ()=> savedJob(index) }>{icon}</Button>
            </Card.Body>
          </Card>
        )}
      </Container>  
    </IconContext.Provider>  
  )
}

export default JobBoard