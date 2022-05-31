import React, {useEffect, useRef, useState} from "react";
import "../posts/style.css";
import {Button, Card, Col, Row} from 'react-bootstrap';
import {Poll, PollProps, VariantProps} from "./poll";
import moment from 'moment';
import { AiOutlinePlusSquare, AiOutlineEye } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import {useTranslation} from "react-i18next";
import {AddNewVariant} from "./AddNewVariant";
import {RiChatDeleteLine} from "react-icons/ri";
import axios from "axios";


export type PostProps = {
    id: number;
    title: string;
    text: string;
    poll?: PollProps;
    videoUrl?: string;
    createdBy: string;
    createdAt: Date;
}

/*
    * A post component
*/

export function Post({title, text, id, poll, videoUrl, createdBy, createdAt}: PostProps) {
    // @ts-ignore
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    useEffect( () => {
        // @ts-ignore
        setCurrentUser(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    }, [localStorage.getItem("currentUser")])

    const thisPost = useRef(null);
    const { t, i18n } = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const summaryVotes: number = (poll != null) ? poll.variants.map((variant: VariantProps) => variant.votes).reduce((a, b)=> (a+b)) : 0;

    function deletePost(e: any, id: number) {
        e.preventDefault();
        axios.delete(`http://localhost:8080/epoll/post/`+id, {
            headers: {'Authorization' : 'Bearer ' + currentUser.accessToken,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'}
        }).then((response: any) => {
            if (response.data != null) {
                console.log(1);
                // @ts-ignore
                thisPost.current.style.display="none";
                // @ts-ignore
            }
        })
    }

    return (
        <>
        <article className={"p-4 mb-5 col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-md-10 offset-md-1 col-sm-12 col-xs-12 col-12 bg-light"} ref={thisPost}>
            <Row>
                <Col xl={11} lg={11} md={10} sm={10} className={"post__author"}>{createdBy}&nbsp;&nbsp;&nbsp;<span className={"post__time"}>{moment(createdAt).format("HH:mm DD/MM/YY")}</span></Col>
                <Col xl={1} lg={1} md={2} sm={2} className={"d-flex flex-row-reverse justify-content-between"}>{(currentUser!=null && currentUser!=false && currentUser.username!=createdBy && poll != null && !poll.frozen) ? <><a className={"post__a"} onClick={() => setOpenModal(true)}><AiOutlinePlusSquare size={32} color={"blue"}/></a></> : ""}{currentUser!=null && currentUser!=false && (currentUser.username==createdBy || currentUser.role=="MODERATOR" || currentUser.role=="ADMIN") ? <a className={"post__a"} onClick={(e) => deletePost(e, id)}><RiChatDeleteLine size={32} color={"red"}/></a> : ""}</Col>
                <h2 className={"post__title text-center text-dark"}>{title}</h2>
                <p className={"post__text"}>{text}</p>
                { poll ? <Poll {...poll}/> : null}
                <Col xl={10} lg={10} md={9} sm={8} xs={8} className={"post__views"}>
                    {summaryVotes > 0 ? <><AiOutlineEye size={24}/>&nbsp;{summaryVotes}</> : ""}
                </Col>
                <Col xl={2} lg={2} md={3} sm={4} xs={4} className={"d-flex flex-row-reverse"}><a href={`/post/${id}/comments`}><BiComment size={32} color={"blue"}/></a></Col>
            </Row>
        </article>
            {openModal && <AddNewVariant closeModal={setOpenModal} />}
        </>
    );
}