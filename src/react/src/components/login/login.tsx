import "./login.css"
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {CloseButton, Modal} from "react-bootstrap";
import axios, {Axios} from "axios";
import {Api} from "../Api";

export type LoginProps = {
    name: string
    password: string
}

/*
    * A component (modal window) for login with validation and sending
 */

export function Login( {closeModal}: any ) {
    const { t, i18n } = useTranslation();
    const [usernameReq, setUsernameReq] = useState("");
    const [passwordReq, setPasswordReq] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const axios = require('axios');
    function submit(e: any){
        e.preventDefault();
        axios.post(Api.signIn, {
            username: data.username,
            password: data.password
        }).then((res: any) => {
            // @ts-ignore
            document.querySelectorAll("input").forEach(x => x.value = "");
            if (res.data.accessToken == null || res.data.accessToken=='') {
            } else {
                localStorage.setItem("currentUser", JSON.stringify(res.data));
                // @ts-ignore
                console.log(localStorage.getItem("currentUser"));
                closeModal(false);
            }
        })
    }
    function handle(e: any) {
        const newdata: any = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
    }

    return (
        <>
            <Modal show={closeModal}>
                <form onSubmit={(e)=>submit(e)}>
                    <Modal.Header>
                        <Modal.Title><h3>{t('authentication')}</h3></Modal.Title>
                        <CloseButton onClick={()=>closeModal(false)}/>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor={"username"}>{t('nickname')}</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={t('enter_nickname')}
                                id="username"
                                required
                                value={data.username}
                                onChange={(e) => handle(e)}
                                pattern={"[A-Za-z0-9!@#]{5,20}$"}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"password"}>{t('password')}</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder={t('enter_password')}
                                id="password"
                                required
                                value={data.password}
                                onChange={(e) => handle(e)}
                                pattern={"/^[a-zA-Z0-9!@#\\$%\\^\\&*_=+-]{6,18}$/g"}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="col-12">
                            <button type="submit" className="btn btn-primary">
                                {t('log_in')}
                            </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}