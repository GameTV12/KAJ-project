import React from "react";
import {Container, Nav, Navbar, NavDropdown, Form, FormControl, Button, Row} from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

export function TopBar(){
    return (
        <>
            <Navbar className="fixed-top navbar navbar-dark bg-dark text-white container-fluid" expand="lg">
                <Container className={"offset-xl-2 col-xl-8 offset-xxl-2 col-xxl-8 col-sm-12 col-xs-12 col-md-9 offset-md-1 col-12"}>

                    <Navbar.Brand href="#">Myselect</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        <Form className="d-flex me-auto col-xxl-8 offset-xxl-1 col-xl-8 offset-xl-1 col-md-12 col-sm-12 col-xs-12 col-12">
                            <FormControl
                                type="search"
                                placeholder="Write here..."
                                className="me-3"
                                aria-label="Search"
                            />
                            <Button variant="outline-success"><SearchIcon/></Button>
                        </Form>
                        <Nav
                            className="my-2 my-lg-0 offset-xxl-1 col-xxl-2 offset-xl-1 col-xl-2 col-md-2"
                            style={{ maxHeight: '130px' }}
                            navbarScroll
                        >
                           <Nav.Link href="#action1"><LogoutIcon/> Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}