import React, {useState} from "react";
import "./PostComments.css";
import {Card, Col, Row} from 'react-bootstrap';
import moment from 'moment';
import {useTranslation} from "react-i18next";


export type CommentProps = {
    id: number;
    text: string;
    createdBy: string;
    createdAt: Date;
    visible: boolean;
    repliedTo?: number;
}
export function OneComment({id, text, createdBy, createdAt, visible, repliedTo}: CommentProps) {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Card className={"p-4 mt-5 col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-md-10 offset-md-1 col-sm-12 col-xs-12 col-12 bg-light"}>
                <Row>
                    {repliedTo != null ? <Col xl={12} lg={12} md={12} sm={12} xs={12} className={"comment__author"}>{t('reply_to')} {repliedTo}</Col> : ""}
                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className={"comment__author"}>{createdBy}&nbsp;&nbsp;&nbsp;<span className={"post__time"}>{moment(createdAt).format("HH:mm DD/MM/YY")}</span></Col>
                    <p className={"comment__text"}>{text}</p>
                </Row>
            </Card>
        </>
    );
}