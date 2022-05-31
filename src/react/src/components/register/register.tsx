import "./register.css"
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Route, Link, useNavigate} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import {Axios} from "axios";

export type RegisterProps = {
    username: string,
    password: string,
    phoneNumber: string,
    email: string,
    age: number
}

/*
    * If you haven't a profile you must sign up.
    * It's a page for creating a new profile with validation
*/

export function Register() {
    const origPassRef: any = useRef(null);
    const confPassRef: any = useRef(null);
    const nav = useNavigate();

    const url: string = "http://localhost:8080/epoll/auth/signUp";
    const [data, setData] = useState({
        username: "",
        password: "",
        phoneNumber: "",
        email: "",
        age: 0
    });
    const axios = require('axios');
    function submit(e: any){
        e.preventDefault();
        axios.post(url, {
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
            email: data.email,
            age: data.age
        }).then((res: any) => {
            // @ts-ignore
            document.querySelectorAll("input").forEach(x => x.value = "");
            console.log(res.data);
            nav('/register/after');
        })
    }

    function handle(e: any) {
        const newdata: any = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
    }

    function confirm(e: any) {
        const confirmPass: string = confPassRef.current.value;
        const originalPass: string = origPassRef.current.value;
        if (originalPass!=confirmPass){
            confPassRef.current.style.border = "2px solid red";
            confPassRef.current.style.boxSizing = "border-box";
            origPassRef.current.style.border = "2px solid red";
            origPassRef.current.style.boxSizing = "border-box";
        }
        if (originalPass==confirmPass){
            confPassRef.current.style.border = "1px solid #ced4da";
            confPassRef.current.style.boxSizing = "border-box";
            origPassRef.current.style.border = "1px solid #ced4da";
            origPassRef.current.style.boxSizing = "border-box";
        }
    }

    const { t, i18n } = useTranslation();
    return (
        <>
            <Container className={"register__main"}>
                <Row>
                    <form onSubmit={(e)=>submit(e)}>
                        <h3>{t('create_new_user')}</h3>
                        <div className="mb-3">
                            <label htmlFor="username">{t('nickname')}</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={t('enter_nickname(unique)')}
                                id="username"
                                value={data.username}
                                required
                                pattern={"[A-Za-z0-9!@#]{5,20}$"}
                                onChange={(e) => handle(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                required
                                pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$"}
                                placeholder={t('enter_email')}
                                value={data.email}
                                onChange={(e) => handle(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">{t('password')}</label>
                            <input
                                id="password"
                                type="password"
                                required
                                pattern={"/^[a-zA-Z0-9!@#\\$%\\^\\&*_=+-]{6,18}$/g"}
                                className="form-control"
                                placeholder={t('enter_password')}
                                value={data.password}
                                ref={origPassRef}
                                onChange={(e) => {handle(e); confirm(e)}}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_confirm">{t('confirm_password')}</label>
                            <input
                                id="id_confirm"
                                type="password"
                                required
                                className="form-control"
                                placeholder={t('enter_password')}
                                onChange={(e) => confirm(e)}
                                ref={confPassRef}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber">{t('phone_number')}</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                placeholder={t('enter_number')}
                                id="phoneNumber"
                                value={data.phoneNumber}
                                onChange={(e) => handle(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age">{t('age')}</label>
                            <input
                                type="number"
                                required
                                className="form-control"
                                id="age"
                                min={0}
                                max={150}
                                value={data.age}
                                onChange={(e) => handle(e)}
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                {t('sign_up')}
                            </button>
                        </div>
                    </form>
                    <p className="forgot-password text-right">
                        {t('return_from_signup')} <a href="/">{t('return_to_main')}</a>
                    </p>
                </Row>
            </Container>
        </>
    );
}