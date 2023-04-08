import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Container, Button, Card } from 'react-bootstrap';
import { IconContext } from "react-icons"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import Job from "../Jobs"

const JobBoard: React.FC  = () => {
  const jobs = useSelector((state:any) => state.job.value)
  console.log(jobs)
  const [saveStatus, setSaveStatus] = useState<boolean[]>([])
  const loggedInEmail = useSelector((state: any) => state.user.value.email)

  // I would like the site to fetch the status whether the job has been saved or not from the backend, then saved into the state, so that jobs wont be saved twice or more times
  const init = () =>{
    jobs.length>0&&jobs.forEach((job:Job) => {
    var  description= job.description
    const response = fetch(`/api/save/${loggedInEmail}/${description}`) 
      .then(res => res.json())
      .then(res => {
        if (res.error) return setSaveStatus(saveStatus=>[...saveStatus, false])       
        return setSaveStatus(saveStatus=>[...saveStatus, true])
        })
    });
  } 
  
  //only fetch and save the status everytime job list changes, so if user search for new jobs, we get new set of status according to user saved history
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(init, [jobs])

  const toggle = (index:number) => {
    //checking the state, if it's saved, toggle will delete the job then change the state
    if (saveStatus[index]) return deleteJob(index)
     
    //if not, it will save the job on server and change the state
    return saveJob(index)
  }

  const saveJob = async(index:number) => {
    const jobtoBeSaved = jobs[index]
    
    const response=await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([jobtoBeSaved, loggedInEmail])
      })
      .then(res => res.json())
    await console.log('miao')
    if (response.error) return console.log(response.error)

    return await setSaveStatus(saveStatus.map((status,i) => i === index? true : status))
  }
  

  const deleteJob = async(index: number) => {
    const description = jobs[index].description
    const response = await fetch(`/api/save/${description}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
    
    return await setSaveStatus(saveStatus.map((status,i) => i === index? false: status))
  }
  
  return (
    <>
      <Container className="d-block g-2">
        <IconContext.Provider value={{color:"rgb(110,223,94)", size:"2rem"}}>
          {jobs.length>0&&jobs.map((job:Job, index: number) =>       
            <Card key={index} className='mb-2'>
              <Card.Header className='d-flex justify-content-between'>
                <Card.Text>Location: {job.location}</Card.Text>
                {job.company&&<Card.Text>Company: {job.company}</Card.Text>}
              </Card.Header>
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
        </IconContext.Provider>  
      </Container>     
    </>
  )
}

export default JobBoard;