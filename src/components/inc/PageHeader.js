import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { IoLogIn, IoEarthOutline, IoLogOut } from 'react-icons/io5'
import { IconContext } from 'react-icons'
import { Row, Button, Form, Col } from 'react-bootstrap';
import Quote from './Quote';
import jobtracker from "../img/jobtracker.png"

function PageHeader() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logOut = () => {
    fetch('/api/sessions', {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
    console.log('successfully logged out')
  })
  }
  return(
    <>
      <Row className='d-flex me-6 justify-content-space-between'>
        <Col className='col-9 ms-lg-3 ms-sm-2 align-content-center'>
          <Form className='d-flex mt-4' style={{height: "3rem"}}>
            <Form.Control
              type="search"
              placeholder="Search by job title or location"
              className="me-2"
              aria-label="Search"
            />
            <Button style={{backgroundColor:"rgb(110,223,94)", border:"none"}}>Search</Button>
          </Form>
        </Col>
        <Col className='col-1 me-lg-3 me-sm-1 justify-content-end'>
          <img className='col-1 ' style={{height:"100px", width:"auto"}} onClick={handleShow} src={jobtracker} alt="" />
        </Col>
      </Row>
   
    <Offcanvas style={{width:"300px"}}show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title><img style={{height:"70px", width:"auto"}} src={jobtracker} alt="" /></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav defaultActiveKey="/" className="flex-column">
        <IconContext.Provider value={{color:"lightgrey"}}>
            <Nav.Link as={Link} to="/"><FaHome />Home</Nav.Link>
            <Nav.Link as={Link} to="../LogIn"><IoLogIn />Login</Nav.Link>
            <Nav.Link as={Link} to="../SignUp"><IoEarthOutline />Sign up</Nav.Link>
            <Nav.Link onClick={ logOut }><IoLogOut />Logout</Nav.Link>
          </IconContext.Provider>
        </Nav>
        <Quote />
      </Offcanvas.Body>
    </Offcanvas>
  </>
  )
}

export default PageHeader