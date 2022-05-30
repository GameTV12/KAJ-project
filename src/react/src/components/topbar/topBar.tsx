import React, {useEffect, useState} from "react";
import {Container, Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
//import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTranslation } from "react-i18next";
import {Cookies} from "react-cookie-consent";
import i18next from "i18next";
import {Login} from "../login/login";
import {Link} from "react-router-dom";

const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'en'
    },
    {
        code: 'cz',
        name: 'Čeština',
        country_code: 'cz'
    },
    {
        code: 'ru',
        name: 'Русский',
        country_code: 'ru'
    }
]

export function TopBar(){
    const { t, i18n } = useTranslation();

    const currentLanguageCode = Cookies.get('i18next') || 'en';
    const currentLanguage = languages.find(l => l.code === currentLanguageCode);

    const [openModal, setOpenModal] = useState(false);
    // @ts-ignore
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);

    useEffect( () => {
        // @ts-ignore
        setCurrentUser(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    }, [localStorage.getItem("currentUser")])

    function logout() {
        localStorage.removeItem("currentUser");
        setCurrentUser(false);
    }

    // @ts-ignore
    return (
        <>
            <Navbar className="fixed-top navbar navbar-dark bg-dark text-white container-fluid" expand="lg">
                <Container className={"offset-xl-1 col-xl-9 offset-xxl-1 col-xxl-10 col-lg-10 offset-lg-1 col-sm-12 col-xs-12 col-md-10 offset-md-1 col-12"}>

                    <Navbar.Brand href="#">MYSELECT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        <Form className="d-flex me-auto col-xxl-6 col-lg-5 offset-xxl-1 col-xl-6 offset-xl-1 col-md-12 col-sm-12 col-xs-12 col-12">
                            <FormControl
                                type="search"
                                placeholder={t('search')}
                                className="me-3"
                                aria-label="Search"
                            />
                            <Button variant="outline-success"><SearchIcon/></Button>
                        </Form>
                        <Form className="d-flex me-auto">
                            {currentUser!=null && currentUser!=false ? <a href={"/writepost"}><Button variant="outline-warning">{t('write_post')}</Button></a> : ""}
                        </Form>
                        <NavDropdown title={t('dropdown_lang')} id="basic-nav-dropdown">
                            {languages.map(({ code, name, country_code})=>(
                                <button
                                    className="dropdown-item"
                                    onClick={() => i18next.changeLanguage(code)}
                                    disabled={code === currentLanguageCode}
                                >{name}</button>
                            ))}
                        </NavDropdown>

                        {currentUser!=null && currentUser!=false ?
                            // @ts-ignore
                            <NavDropdown title={currentUser.username}>
                                <button
                                    onClick={logout}
                                    className="dropdown-item"
                                >{t('log_out')}</button>
                            </NavDropdown> :
                            <NavDropdown title={<PersonOutlineIcon/>}>
                            <button
                                onClick={() => setOpenModal(true)}
                                className="dropdown-item"
                            >{t('log_in')}</button><a href="/register" className="dropdown-item">{t('sign_up')}</a>
                        </NavDropdown>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {openModal && <Login closeModal={setOpenModal} />}
        </>
    );
}