import "./login.css"
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {CloseButton, Modal} from "react-bootstrap";

export type LoginProps = {
    name: string
    password: string
}

export function Login( {closeModal}: any ) {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Modal show={closeModal}>
                <form>
                    <Modal.Header>
                        <Modal.Title><h3>{t('authentication')}</h3></Modal.Title>
                        <CloseButton onClick={()=>closeModal(false)}/>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor={"nickname_id"}>{t('nickname')}</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={t('enter_nickname')}
                                id="nickname_id"
                                required
                                pattern={"[A-Za-z0-9!@#]{5,20}$"}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={"password_id"}>{t('password')}</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder={t('enter_password')}
                                id="password_id"
                                required
                                pattern={"/^[a-zA-Z0-9!@#\\$%\\^\\&*_=+-]{6,18}$/g"}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="col-12">
                            <button type="submit" className="btn btn-primary" onClick={() => closeModal(false)}>
                                {t('log_in')}
                            </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}