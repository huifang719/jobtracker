import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { IoLogIn, IoEarthOutline, IoLogOut } from 'react-icons/io5'
import { IconContext } from 'react-icons'
import { Row, Button, Form, Col, Container } from 'react-bootstrap';
import Quote from './Quote';
import jobtracker from "../img/jobtracker.png"

const PageHeader = ( { logOut, searchForJob } ) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <div>
        <Container fluid>
          <Row className='d-flex justify-content-space-around'>
            <Col className='col-10 ms-lg-3 ms-sm-2 align-content-center'>
              <Form onSubmit={ searchForJob } className='d-flex mt-4' style={{height: "3rem"}}>
                <Form.Control
                  type="search"
                  placeholder="Job Title"
                  className="me-2"
                  name = "title"
                  aria-label="Search"
                />
                  <Form.Control
                  type="search"
                  placeholder="Location"
                  className="me-2"
                  name = "location"
                  aria-label="Search"
                />
                <Button type="submit"  style={{backgroundColor:"rgb(110,223,94)", border:"none"}}>Search</Button>
              </Form>
            </Col>
            <Col className='col-1 me-0 justify-self-end'>
              <img style={{height:"100px", width:"auto"}} onClick={handleShow} src={jobtracker} alt="" />
            </Col>
          </Row>
        </Container>
      
      <Offcanvas placement={'end'} style={{width:"300px"}}show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><img style={{height:"70px", width:"auto"}} src={jobtracker} alt="" /></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/" className="flex-column">
          <IconContext.Provider value={{color:"lightgrey"}}>
              <Nav.Link style={{color:"rgb(51,73,96)"}} as={Link} to="/"><FaHome />Home</Nav.Link>
              <Nav.Link style={{color:"rgb(51,73,96)"}} as={Link} to="../LogIn"><IoLogIn />Login</Nav.Link>
              <Nav.Link style={{color:"rgb(51,73,96)"}} as={Link} to="../SignUp"><IoEarthOutline />Sign up</Nav.Link>
              <Nav.Link style={{color:"rgb(51,73,96)"}} onClick={ logOut }><IoLogOut />Logout</Nav.Link>
            </IconContext.Provider>
          </Nav>
          <Quote />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  </>
  )
}

export default PageHeader