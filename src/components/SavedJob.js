import { Container, Button, Card } from 'react-bootstrap';

const SavedJob = (savedJobList) => {
  return (
    <Container className="d-block g-1">
      {savedJobList.savedJobList?.map((job, index) =>       
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