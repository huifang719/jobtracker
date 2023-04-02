import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { IoLogIn, IoEarthOutline, IoLogOut } from 'react-icons/io5'
import { IconContext } from 'react-icons'
import { Row, Col, Container } from 'react-bootstrap';
import Quote from './Quote';
import jobtracker from "../../assets/jobtracker.png"
import SearchJobs from './SearchJobs';
import { FieldValues } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface PropState {
  logOut: () => void
  handleSearch: (data: FieldValues) => void
}
const PageHeader = ( { logOut, handleSearch }: PropState ) => {
  const loggedInEmail = useSelector((state: any) => state.user.value.email)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <div>
        <Container fluid>
          <Row className='d-flex justify-content-space-around'>
            <Col className='col-10 ms-lg-3 ms-sm-2 align-content-center'>
              <SearchJobs handleSearch={handleSearch} />
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
          <IconContext.Provider value={{  color: 'rgb(110,223,94)' }}>
              <Nav.Link style={{color:"rgb(51,73,96)"}} as={Link} to="/"><FaHome />Home</Nav.Link>
              {!loggedInEmail&&<Nav.Link style={{color:"rgb(51,73,96)"}} as={Link} to="../LogIn"><IoLogIn />Login</Nav.Link>}
              {!loggedInEmail&&<Nav.Link style={{color:"rgb(51,73,96)"}} as={Link} to="../SignUp"><IoEarthOutline />Sign up</Nav.Link>}
              {loggedInEmail&&<Nav.Link style={{color:"rgb(51,73,96)"}} onClick={ logOut }><IoLogOut />Logout</Nav.Link>}
            </IconContext.Provider>
          </Nav>
          <Quote />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  </>
  )
}

export default PageHeader;