import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { IoLogIn, IoEarthOutline, IoLogOut } from 'react-icons/io5'
import { CgMenuRound } from 'react-icons/cg'
import { IconContext } from 'react-icons'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Quote from './Quote';
function PageHeader() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return(
    <>
    <Container className='container-fluid'>
      <Row className='row'>
        <Col className='col-sm-12 col-md-4 col-lg-3'>
          <CgMenuRound variant="primary" onClick={handleShow}/>
        </Col>
        <Col className='col-sm-12 col-md-7 col-lg-8' >
          <Quote />
        </Col>
      </Row>
    </Container>
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>JobTracker</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav defaultActiveKey="/home" className="flex-column">
        <IconContext.Provider value={{color:"lightgrey"}}>
            <Nav.Link as={Link} to="../home"><FaHome />Home</Nav.Link>
            <Nav.Link as={Link} to="../LogIn"><IoLogIn />Login</Nav.Link>
            <Nav.Link as={Link} to="../SignUp"><IoEarthOutline />Sign up</Nav.Link>
            <Nav.Link onClick={ logout }><IoLogOut />Logout</Nav.Link>
          </IconContext.Provider>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  </>
  )
}

export default PageHeader