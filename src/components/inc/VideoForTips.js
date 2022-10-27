import React from 'react'
import ReactPlayer from 'react-player/youtube'

function VideoForTips() {
  return(
    <div className='container'>
      <ReactPlayer style={{width:"100%"}} url='https://youtube.com/playlist?list=PL2GN17YG-9UmEWdkEZ6x6CS6E0OkIeVrv' />
    </div>
  )
}
export default VideoForTips