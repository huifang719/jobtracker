import { Container } from "react-bootstrap"
import Calender from "./inc/Calender"
import VideoForTips from "./inc/VideoForTips"
function Home () {
  return (
    <Container style={{display:"block"}}>
    <VideoForTips />
    <Calender />
    </Container>
  )
}

export default Home