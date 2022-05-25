import "./register.css"
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Route, Link} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import {Axios} from "axios";

export type RegisterProps = {
    username: string,
    password: string,
    phoneNumber: string,
    email: string,
    age: number
}

export function Register() {
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
            console.log(res.data)
        })
    }

    function handle(e: any) {
        const newdata: any = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
    }

    const { t, i18n } = useTranslation();
    return (
        <>
            <Container>
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
                                onChange={(e) => handle(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
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
                                className="form-control"
                                placeholder={t('enter_password')}
                                value={data.password}
                                onChange={(e) => handle(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_confirm">{t('confirm_password')}</label>
                            <input
                                id="id_confirm"
                                type="password"
                                className="form-control"
                                placeholder={t('enter_password')}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber">{t('phone_number')}</label>
                            <input
                                type="text"
                                className="form-control"
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
                                className="form-control"
                                id="age"
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