import React, { useState, useEffect }from 'react';
import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IconContext } from "react-icons"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

const JobBoard = ({ loggedInEmail, jobsList }) => {
  const [saveStatus, setSaveStatus] = useState([])

  const init = () =>{
    jobsList.forEach(job => {
    var  description= job.description
    fetch(`/api/save/${loggedInEmail}/${description}`)
      .then(res => res.json())  
      .then(res => {
        if (typeof res === 'string') {
          setSaveStatus(saveStatus=>[...saveStatus, false]) 
        } else {
          setSaveStatus(saveStatus=>[...saveStatus, true])
        }
      })
    });
  } 

  useEffect(init, [jobsList])

  const toggle = index => {
    if (saveStatus[index]) {
      deleteJob(index)
      setSaveStatus(saveStatus.map((status,i) => {
        if (i===index){
          return false
        } else {
          return status
        }
      }))
    } else {
      saveJob(index)
      setSaveStatus(saveStatus.map((status,i) => {
        if (i===index){
          return true
        } else {
          return status
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
      .then(res => res.json())
      .then(res => {
        console.log('job saved')
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
        {jobsList&&jobsList.map((job, index) =>       
          <Card key={index}>
            <Card.Header as="h5">{job.location}</Card.Header>
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Text>
                {job.description}
              </Card.Text>
              <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}} href={job.url}>Read more</Button>
              <Button className='col' variant="outline-*" style={{border:"none"}} onClick={ ()=> toggle(index) }>{saveStatus[index]? <AiFillHeart /> : <AiOutlineHeart />}</Button>
            </Card.Body>
          </Card>
        )}
      </Container>  
    </IconContext.Provider>  
  )
}

export default JobBoard;