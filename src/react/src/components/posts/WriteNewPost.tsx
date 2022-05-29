import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Route, Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {Axios} from "axios";

export type NewPostProps = {
    username: string,
    password: string,
    phoneNumber: string,
    email: string,
    age: number
}

export function WriteNewPost() {
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
            <Container className={"new__main__div"}>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div>
                            <form onSubmit={(e)=>submit(e)}>
                                <h3>{t('write_post')}</h3>
                                <div className="mb-3">
                                    <label htmlFor="username">{t('title')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t('enter_title')}
                                        id="username"
                                        value={data.username}
                                        required
                                        pattern={"[A-Za-z0-9!@#]{5,50}$"}
                                        onChange={(e) => handle(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text_post">{t('text')}</label>
                                    <textarea className="form-control" id="text_post" rows={3} placeholder={t('enter_text')} required/>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        {t('new_post')}
                                    </button>
                                </div>
                            </form>
                            <p className="forgot-password text-right">
                                {t('return_from_writepost')} <a href="/">{t('return_to_main')}</a>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}