import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import './Nav.css'

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-nav">
      <Container>
        <img src="/logo.ico" alt="Logo.ico" style={
          {width: '65px',
          height: '65px'}
        } />
        <Navbar.Brand href="#home">ConstrumantaP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="#usuarios">Usuarios</Nav.Link>
            <Nav.Link href="#inventario">Inventario</Nav.Link>
            <Nav.Link href="#herramientas">Herramientas</Nav.Link>
            <Nav.Link href="#reservas">Reservas</Nav.Link>
            <Nav.Link href="#ventas">Ventas</Nav.Link>
            <Nav.Link href="#sugerencias">Sugerencias</Nav.Link>
            <Nav.Link href="#proveedores">Proveedores</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent