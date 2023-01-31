import React from 'react'
import { Row } from 'react-bootstrap'
import ReactPlayer from 'react-player/youtube'
import "./video.css"

const VideoForTips = () => {
  return(
      <Row>
        <ReactPlayer style={{display:"flex", margin:"0, auto"}} 
      className="video"
      controls
      url='https://youtube.com/playlist?list=PL2GN17YG-9UmEWdkEZ6x6CS6E0OkIeVrv' />
      </Row>
  ) 
}
export default VideoForTips