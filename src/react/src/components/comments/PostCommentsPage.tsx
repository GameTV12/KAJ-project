import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../posts/style.css";
import "./PostComments.css";
import {OneComment as Comment, CommentProps} from "./OneComment";
import { useParams } from "react-router-dom";
import {TopBar} from "../topbar/topBar";
import CookiesBanner from "../cookies/CookiesBanner";
import {Post, PostProps} from "../posts/post";
import {Col, Row} from "react-bootstrap";
import {AiOutlineArrowLeft} from "react-icons/ai";

/*
    * Page for all comments of post
*/

export function PostCommentsPage(){
    const { postId } = useParams();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<CommentProps[]>([]);
    const { t, i18n } = useTranslation();
    const [hasConnection, setConnection] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:8080/epoll/post/${postId}/comments', {method: 'HEAD'})
                .then((response) => {
                    setConnection(true);
                })
                .catch((error) => {
                    setConnection(false);
                });
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (!hasConnection)
            return;

        fetch(`http://localhost:8080/epoll/post/${postId}/comments`)
            .then(response => response.json())
            .then(json => {
                setComments(json);
                setLoading(false);
            }).catch(() => {});
    }, [hasConnection]);

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

    return (
        <>
            <nav className={"fixed-top navbar navbar-light bg-light container-fluid "}>
                <div onClick={()=>{window.history.go(-1)}} className={"comment__back"}><AiOutlineArrowLeft size={24} color={"black"}/> {t('return_to_main')}</div>
            </nav>
            <div className="container comment__comments">
                <section className="row">
                    {!hasConnection ? <h2 style={{marginTop: '70px'}}>No internet</h2> : ""}
                    {comments.sort().map((comment:CommentProps) => <Comment key={comment.id}{...comment}/>)}
                </section>
            </div>
            <div className="fixed-bottom comment__field">
                <section className="container">
                    <Row>
                        <div className="form-group">
                            <form>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                                <div className="d-grid">
                                    <button className="btn btn-primary btn" type="submit">Submit form</button>
                                </div>
                            </form>
                        </div>
                    </Row>
                </section>

            </div>
        </>
    );

}