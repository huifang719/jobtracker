import { Row, Col } from "react-bootstrap"
import Calender from "./inc/Calender"
import VideoForTips from "./inc/VideoForTips"
function Home () {
  return (
    <Row>
      <Col className="col-sm-12 col-lg-6 col-md-6">
        <VideoForTips className="w-8 ms-auto"/>
      </Col>
      <Col className="col-sm-12 col-lg-6 col-md-6">
        <Calender className="w-8 ms-auto"/>
      </Col>
    </Row>
  )
}

export default Home