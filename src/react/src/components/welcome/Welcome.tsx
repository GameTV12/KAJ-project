import React, {useRef, useState} from "react";
import "./Welcome.css";
import {Button, Card, Col, Row} from 'react-bootstrap';
import moment from 'moment';
import { AiOutlinePlusSquare, AiOutlineEye } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import {useTranslation} from "react-i18next";
// @ts-ignore
import RSPfinal from "../../videos/RSPfinal.mp4";


export function Welcome() {
    const { t, i18n } = useTranslation();
    const cubeRef = useRef(null);

    let rotateY: number = 0;
    let rotateX: number = 0;

    // @ts-ignore
    document.onkeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 65) rotateY -= 3
        else if (e.keyCode === 87) rotateX += 3
        else if (e.keyCode === 68) rotateY += 3
        else if (e.keyCode === 83) rotateX -= 3

        // @ts-ignore
        cubeRef.current.style.transform =
            'rotateY('+rotateY+'deg)'+
            'rotateX('+rotateX+'deg)';
    }


    return (
        <>
            <div className={"container"}>
                <Row>
                    <Col className={"mt-5"} lg={{span: 10, offset: 1}} xl={{span: 10, offset: 1}} md={{span: 10, offset: 1}} sm={{span: 12, offset: 0}}>
                        <h1 className={"text-center"}>Welcome to Myselect</h1>
                        <h2 className={"text-center"}>Video manual - <a href={"https://youtu.be/ic-KoPYFrxw"}>https://youtu.be/ic-KoPYFrxw</a></h2>
                        <p className={"welcome__hello"}>Myselect - is a social network for communication between people. The network allows you to create posts, write comments and add a poll to post. You can use this network as independent sociologist for monitoring of public opinions. Are you ready? Let's go!</p>
                        <div className={"d-flex align-items-center justify-content-center"}>
                            <ul><strong>Pages:</strong>
                                <li>Main page</li>
                                <li>Create a new post</li>
                                <li>Comments of posts</li>
                                <li>Comments of variant (yes)</li>
                                <li>404 page (not found)</li>
                            </ul>
                        </div>
                        <h2 className={"text-center"}>Cube game</h2>
                        <p className={"text-center"}>Play this game. Rotate this cube through W-A-S-D</p>
                        <div className="cube_div">
                            <div className="cube" ref={cubeRef}>
                                <div className="side front d-flex justify-content-center align-items-center"><div><h1>Myselect</h1></div></div>
                                <div className="side back d-flex justify-content-center align-items-center">Thanks for attention</div>
                                <div className="side right d-flex justify-content-center align-items-center"><div>Created by:<br/>Viktor Kozhemiakin</div></div>
                                <div className="side left d-flex justify-content-center align-items-center"><div>Please <a href={"https://www.paypal.com"} className={"text-decoration-none"}>donate</a> money for site</div></div>
                                <div className="side top d-flex justify-content-center align-items-center"><div className={"text-left"}>
                                    <ul>Rules:
                                        <li>No hate</li>
                                        <li>No spam</li>
                                        <li>Just enjoying</li>
                                    </ul></div></div>
                                <div className="side bottom d-flex justify-content-center align-items-center">All rights are reserved &copy; 2022</div>
                            </div>
                        </div>
                        <div className={"d-flex justify-content-center welcome__video"}>
                            <div>
                                <h2 className={"text-center"}>Video</h2>
                                <video width={"100%"} height={"100%"} controls>
                                    <source src={RSPfinal} type={"video/mp4"}/>
                                </video>
                            </div>
                        </div>
                        <div className="d-flex">
                            <p className="forgot-password text-right">
                                <a href="/">{t('return_to_main')}</a>
                            </p>
                        </div>

                    </Col>
                </Row>
            </div>
        </>
    );
}
