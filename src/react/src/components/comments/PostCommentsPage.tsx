import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../posts/style.css";
import "./PostComments.css";
import { useParams } from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import {AiOutlineArrowLeft} from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import {RiChatDeleteLine} from "react-icons/ri";

/*
    * Page for all comments of post
*/
export type CommentProps = {
    id: number;
    text: string;
    createdBy: string;
    createdAt: Date;
    visible: boolean;
    repliedTo?: number;
    type: string
}

export function PostCommentsPage(){
    const { elementType, elementID } = useParams();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<CommentProps[]>([]);
    const { t, i18n } = useTranslation();
    const anchor = useRef(null);
    const [hasConnection, setConnection] = useState(true);
    const [text, setText] = useState("");
    const [myCurrentMessages, setMyCurrentMessages] = useState(0);
    // @ts-ignore
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    useEffect( () => {
        // @ts-ignore
        setCurrentUser(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    }, [localStorage.getItem("currentUser")])


    let URL: string = "";
    if (elementType == "post"){
        URL = `http://localhost:8080/epoll/post/${elementID}/`;
    }
    if (elementType == "variant"){
        URL = `http://localhost:8080/epoll/post/postId/poll/${elementID}/`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(URL + `comments`, {method: 'HEAD'})
                .then((response) => {
                    setConnection(true);
                })
                .catch((error) => {
                    setConnection(false);
                });
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (!hasConnection)
            return;

        fetch(URL + `comments`)
            .then(response => response.json())
            .then(json => {
                setComments(json);
                setLoading(false);
            }).catch(() => {});
    }, [hasConnection, myCurrentMessages]);

    function handle(e: any){
        setText(e.target.value);
    }

    function submit(e: any) {
        e.preventDefault();
        axios.post(URL, {text: text, reply: 0}, {
            headers: {'Authorization' : 'Bearer ' + currentUser.accessToken,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'}
        }).then((response: any) => {
            if (response.data != null) {
                setMyCurrentMessages( (current) => current+1);
                setText("");
                // @ts-ignore
                anchor.current.scrollIntoView({block: "end"});
            }
        })
    }

    function deleteComment(e: any, id: number) {
        e.preventDefault();
        let deleteURL: string = "";
        if (elementType == "post"){
            deleteURL = `http://localhost:8080/epoll/post/postId/comments/delete?id=`+id;
        }
        if (elementType == "variant"){
            deleteURL = `http://localhost:8080/epoll/post/postId/poll/variantId/comments/delete?id=`+id;
        }
        axios.delete(deleteURL, {
            headers: {'Authorization' : 'Bearer ' + currentUser.accessToken,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'}
        }).then((response: any) => {
            if (response.data != null) {
                setMyCurrentMessages( (current) => current+1);
                console.log(1);
                // @ts-ignore
            }
        })
    }

    if (loading) {
        return (
        <>
            <nav className={"fixed-top navbar navbar-light bg-light container-fluid "}>
                <div onClick={()=>{window.history.go(-1)}} className={"comment__back"}><AiOutlineArrowLeft size={24} color={"black"}/> {t('return_to_main')}</div>
            </nav>
            <div className={"container comment__comments"} style={{marginTop: '70px'}}>
                <section className="row">
                    <h1>Loading</h1>
                    {!hasConnection ? <h2>No internet</h2> : ""}
                </section>
            </div>
        </>);
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <nav className={"fixed-top navbar navbar-light bg-light container-fluid "}>
                <div onClick={()=>{window.history.go(-1)}} className={"comment__back"}><AiOutlineArrowLeft size={24} color={"black"}/> {t('return_to_main')}</div>
            </nav>
            <div className="container comment__comments">
                <section className="row d-flex" ref={anchor}>
                    {!hasConnection ? <h2 style={{marginTop: '70px'}}>No internet</h2> : ""}
                    {comments.sort().map((comment:CommentProps) =>
                        <Card className={"p-4 mt-5 col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-md-10 offset-md-1 col-sm-12 col-xs-12 col-12 bg-light"}>
                            <Row>
                                <Col xl={10} lg={10} md={9} sm={8} xs={12} className={"comment__author"}>{comment.createdBy}&nbsp;&nbsp;&nbsp;<span className={"post__time"}>{moment(comment.createdAt).format("HH:mm DD/MM/YY")}</span></Col>
                                <Col xl={2} lg={2} md={3} sm={4} xs={12} className={"d-flex flex-row-reverse"}>{currentUser!=null && (currentUser.username==comment.createdBy || currentUser.role=="MODERATOR" || currentUser.role=="ADMIN") ? <a className={"post__a"} onClick={(e) => deleteComment(e, comment.id)}><RiChatDeleteLine size={32} color={"red"}/></a> : ""}</Col>
                                <p className={"comment__text"}>{comment.text}</p>
                            </Row>
                        </Card>)}
                </section>
            </div>
            <div className="fixed-bottom comment__field" >
                <section className="container">
                    <Row>
                        <div className="form-group">
                            <form onSubmit={(e) => submit(e)}>
                                <textarea className="form-control" id="text" onChange={handle} rows={3} value={text}/>
                                <div className="d-grid">
                                    <button className="btn btn-primary btn" type="submit">{t('send_comment')}</button>
                                </div>
                            </form>
                        </div>
                    </Row>
                </section>
            </div>
            <div style={{bottom: 0}} ref={anchor}></div>
        </>
    );

}