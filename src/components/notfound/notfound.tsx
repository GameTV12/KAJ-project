import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Route, Link} from "react-router-dom";

export type RegisterProps = {
    name: string
    password: string
}

export function NotFound() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className={"d-flex"}>
                <div className={"m-auto text-center"}>
                    <h1>404</h1>
                    <h2>{t('not_found')}</h2>
                    <p className="forgot-password text-right">
                        <a href="/">{t('return_to_main')}</a>
                    </p>
                </div>
            </div>
        </>
    );
}