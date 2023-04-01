import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Container, Button, Card } from 'react-bootstrap';
import { IconContext } from "react-icons"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface jobState {
  title: string, 
  location: string,
  description: string,
  url: string,
}
const JobBoard = () => {

  const jobs = useSelector((state:any) => state.job.value)
  const [saveStatus, setSaveStatus] = useState<boolean[]>([])
  const loggedInEmail = useSelector((state: any) => state.user.value.email)

  // I would like the site to fetch the status whether the job has been saved or not from the backend, then saved into the state, so that jobs wont be saved twice or more times
  const init = () =>{
    jobs.length>0&&jobs.forEach((job:jobState) => {
    var  description= job.description
    fetch(`/api/save/${loggedInEmail}/${description}`) 
      .then(res => {
        if (res.status === 404) {
          console.log(res)
          setSaveStatus(saveStatus=>[...saveStatus, false]) 
        } else {
          console.log(res.json())
          setSaveStatus(saveStatus=>[...saveStatus, true])
        }
      })
    });
  } 
  
  //only fetch and save the status everytime job list changes, so if user search for new jobs, we get new set of status according to user saved history
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(init, [jobs])

  const toggle = (index:number) => {
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

  const saveJob = (index:number) => {
    const jobtoBeSaved = jobs[index]
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

  const deleteJob = (index: number) => {
    const description = jobs[index].description
    fetch(`/api/save/${description}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => {
      console.log('job removed')
    })
  }


  return (
    <>
      <h3> Job Board</h3>
      <IconContext.Provider value={{color:"rgb(110,223,94)", size:"2rem"}}>
        <Container className="d-block g-1">
          {jobs.length >0 &&jobs.map((job:any, index: number) =>       
            <Card key={index}>
              <Card.Header as="h5">{job.location}</Card.Header>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Text>
                  {job.description}
                </Card.Text>
                <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}} href={job.url}>Read more</Button>
                <Button className='col' variant="outline-*" style={{border:"none"}} onClick={ ()=> toggle(index) }>{saveStatus[index]=== true? <AiFillHeart /> : <AiOutlineHeart />}</Button>
              </Card.Body>
            </Card>
          )}
        </Container>  
      </IconContext.Provider>  
    </>
  )
}

export default JobBoard;