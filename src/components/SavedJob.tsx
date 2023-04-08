import { Container, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Job from "../Jobs"

const SavedJob:React.FC = () => {
  const savedJobList = useSelector((state: any) => state.savedJob.value)
  
  return (
    <Container className="d-block g-2">
      {savedJobList.length>0 && savedJobList.map((job:Job, index: number) =>      
          <Card key={index} className='mb-2'>
            <Card.Header  className='d-flex justify-content-between'>
            <Card.Text>Location: {job.location}</Card.Text>
                  {job.company&&<Card.Text>Company: {job.company}</Card.Text>}
            </Card.Header>
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Text>
                {job.description}
              </Card.Text>
              <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}} href={job.url}>Read more</Button>
            </Card.Body>
          </Card> 
      )}
    </Container> 
  )
}

export default SavedJob