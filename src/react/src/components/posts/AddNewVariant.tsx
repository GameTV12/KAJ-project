import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {CloseButton, Modal} from "react-bootstrap";

export type LoginProps = {
    name: string
    password: string
}

/*
    * A modal page for adding a new variant
*/

export function AddNewVariant( {closeModal}: any ) {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Modal show={closeModal}>
                <form>
                    <Modal.Header>
                        <Modal.Title><h3>{t('add_new_variant')}</h3></Modal.Title>
                        <CloseButton onClick={()=>closeModal(false)}/>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor={"id_variant"}>{t('variant')}</label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder={t('enter_variant')}
                            id="id_variant"
                                />
                        </div>
                    </Modal.Body>
                            <Modal.Footer className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={() => closeModal(false)}>
                        {t('add')}
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
);
}