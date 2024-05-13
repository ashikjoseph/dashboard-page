import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row'; // Import Row from Bootstrap
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Row className="m-0"> {/* Use Row to extend to the right margin */}
      <Navbar expand="lg" className="custom-navbar" variant="dark" style={{ width: '100%' }}> {/* Set width to 100% */}
        <Container fluid>
          {/* Add your logo component or an icon here */}
          <Link to="/dashboard" style={{textDecoration:"none"}}><Navbar.Brand href="#" className="fw-bold">Dashboard</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/analytics" className="text-light">Overview</Nav.Link>
              <Nav.Link href="/dashboard" className="text-light">Explore</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{marginLeft:"600px"}}
              />
              <Button variant="outline-light" >Search</Button>
            </Form>
  
        
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
}

export default Header;



