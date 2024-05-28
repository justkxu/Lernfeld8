'use client'

import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {usePathname} from "next/navigation";


const NavBar = () => {
    let pathname = usePathname();
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
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
                                    <Nav.Link href="/data/students"
                                              className={pathname == "/data/students" ? "active" : ""}>Schüler</Nav.Link>
                                    <Nav.Link href="/data/users"
                                              className={pathname == "/data/users" ? "active" : ""}>Benutzer</Nav.Link>
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