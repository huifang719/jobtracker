import { Container, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

interface jobState {
  title: string, 
  location: string,
  description: string,
  url: string,
}

const SavedJob = () => {
  const savedJobList = useSelector((state: any) => state.savedJob.value)
  return (
    <Container className="d-block g-1">
      {savedJobList.length>0 && savedJobList.map((job:jobState, index: number) =>       
        <Card key={index}>
          <Card.Header as="h5">{job.location}</Card.Header>
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