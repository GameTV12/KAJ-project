import React, {useState} from "react";
import "../posts/style.css";
import {Button, Card, Col, Row} from 'react-bootstrap';
import {Poll, PollProps, VariantProps} from "./poll";
import moment from 'moment';
import { AiOutlinePlusSquare, AiOutlineEye } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import {useTranslation} from "react-i18next";
import {AddNewVariant} from "./AddNewVariant";


export type PostProps = {
    id: number;
    title: string;
    text: string;
    poll?: PollProps;
    videoUrl?: string;
    createdBy: string;
    createdAt: Date;
}
export function Post({title, text, id, poll, videoUrl, createdBy, createdAt}: PostProps) {
    const { t, i18n } = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const summaryVotes: number = (poll != null) ? poll.variants.map((variant: VariantProps) => variant.votes).reduce((a, b)=> (a+b)) : 0;
    const [value, setValue] = useState(0);

    function increment(){
        setValue( (value) => {return value+1})
    }

    return (
        <>
        <Card className={"p-4 mt-5 col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-md-10 offset-md-1 col-sm-12 col-xs-12 col-12 bg-light"}>
            <Row>
                <Col xl={10} lg={10} md={9} sm={8} className={"post__author"}>{createdBy}&nbsp;&nbsp;&nbsp;<span className={"post__time"}>{moment(createdAt).format("HH:mm DD/MM/YY")}</span></Col>
                <Col xl={2} lg={2} md={3} sm={4} className={"d-flex flex-row-reverse"}>{(poll != null && !poll.frozen) ? <><a className={"post__a"} onClick={() => setOpenModal(true)}><AiOutlinePlusSquare size={32} color={"blue"}/></a></> : ""}</Col>
                <h2 className={"post__title text-center text-dark"}>{title}</h2>
                <p className={"post__text"}>{text}</p>
                { poll ? <Poll {...poll}/> : null}
                <h6>Counter: {value}</h6>
                {(poll != null && poll.variants.length > 5) ? <><Button className={"btn btn-primary post__fullButton"} onClick={increment}>{t('show_full')}</Button></> : ""}
                <Col xl={10} lg={10} md={9} sm={8} xs={8} className={"post__views"}>
                    {summaryVotes > 0 ? <><AiOutlineEye size={24}/>&nbsp;{summaryVotes}</> : ""}
                </Col>
                <Col xl={2} lg={2} md={3} sm={4} xs={4} className={"d-flex flex-row-reverse"}><a href={"https://google.com"}><BiComment size={32} color={"blue"}/></a></Col>
            </Row>
        </Card>
            {openModal && <AddNewVariant closeModal={setOpenModal} />}
        </>
    );
}