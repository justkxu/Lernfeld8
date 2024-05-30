'use client'

import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {usePathname} from "next/navigation";
import {NavDropdown} from "react-bootstrap";


const NavBar = () => {
    let pathname = usePathname();
    return (
        <Navbar bg="primary" variant="dark" expand="lg" >
            <Container fluid>
                <Navbar.Brand href="/home" className="display-4 fw-bold">Codify</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-between">
                    <div>
                        <Nav className="mxe-auto">
                            {

                                <>
                                    <Nav.Link href="/home"
                                              className={pathname == "/home" ? "active" : ""}>Home</Nav.Link>
                                    <NavDropdown title="Verwaltung" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/data/students">Schüler</NavDropdown.Item>
                                        <NavDropdown.Item href="/data/teachers">Lehrer</NavDropdown.Item>
                                        <NavDropdown.Item href="/data/classes">Klassen</NavDropdown.Item>
                                        <NavDropdown.Item href="/data/users">User</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                        </Nav>
                    </div>
                    <div>
                        <Nav>
                            {

                                <>
                                    <Nav.Link href="/data/profile"
                                              className={pathname == "/data/profile" ? "active" : ""}>Profil</Nav.Link>

                                    <Nav.Link href="/"
                                              className={pathname == "/" ? "active" : ""}>Logout</Nav.Link>
                                </>

                            }
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar