import React, { useState, useContext } from 'react';
import { MyContext } from '../LogIn'
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
      <Row className='row justify-content-center'>
          <img style={{height:"100px", width:"auto"}} onClick={handleShow} src={jobtracker} alt="" />
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