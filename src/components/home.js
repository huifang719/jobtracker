import { Row, Col } from "react-bootstrap"
import Calender from "./inc/Calender"
import VideoForTips from "./inc/VideoForTips"
import SavedJob from "./SavedJob"
import { useState, useEffect } from 'react';
import supabase from "../supabaseClient";

const  Home =loggedInEmail => {
  const [savedJobList, setSavedJobList] =useState(null)
  const getSavedJobList = async()  => {
    const email = loggedInEmail['loggedInEmail']
    if (typeof email === "string") {
      const {data, error} = await supabase
        .from('jobs')
        .select()
        .eq("email",email)
      if (error) {
        console.log(error)
      } 
      if (data) {
        console.log(data)
        setSavedJobList(data)
      }
    } else {
      console.log('no user logged in')
    }   
  } 

  useEffect(() => {
    getSavedJobList();
  }, []);
  
  return (
    <div>
      <Row className="ms-2 justify-content-center" style={{dispay:"flex", gap:"20px"}}>
        <Col className="col-sm-12 col-lg-6 col-md-6">
          <VideoForTips className="mx-auto"/>
        </Col>
        <Col className="col-sm-12 col-lg-5 col-md-5">
          <Calender className="mx-auto"/>
        </Col>
      </Row>
      <Row className="ms-2 gx-3">
        <SavedJob 
          savedJobList = {savedJobList} />
      </Row>
    </div>
  )
}

export default Home