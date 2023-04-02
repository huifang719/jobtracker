import { Row, Col } from "react-bootstrap"
// import Calender from "./inc/Calender"
import VideoForTips from "./inc/VideoForTips"
import SavedJob from "./SavedJob";

const Home = () => {
  return (
    <div>
      <Row className="ms-2 justify-content-center" style={{ gap:"20px"}}>
        <Col className="col-sm-12 col-lg-6 col-md-6">
          <VideoForTips />
        </Col>
        {/* <Col className="col-sm-12 col-lg-5 col-md-5">
          <Calender />
        </Col> */}
      </Row>
      <Row className="ms-2 gx-3">
        <SavedJob />
      </Row>
    </div>
  )
}

export default Home