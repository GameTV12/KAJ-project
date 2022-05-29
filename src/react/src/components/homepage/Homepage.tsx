import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../App.css';
import {Post, PostProps} from "../posts/post";
import CookiesBanner from "../cookies/CookiesBanner";
import {TopBar} from "../topbar/topBar";
import './Homepage.css'
//import {TopBar} from "./components/topbar/topBar";
import { useTranslation } from "react-i18next";


export function Homepage() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostProps[]>([]);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        fetch('http://localhost:8080/epoll/post/')
            .then(response => response.json())
            .then(json => {
                setPosts(json);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (<><h1>Loading</h1></>);
    }

    console.log(posts)
    return (
        <>
            <TopBar/>
            <div className="container" style={{marginTop: '70px'}}>
                <section className="row">
                    <div className={"d-flex flex-row-reverse col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-md-10 offset-md-1 col-sm-12 col-xs-12 col-12 main__forward"} onClick={()=>{window.history.go(1)}}>{t('return_to_last')}</div>
                    {posts.sort().map((post:PostProps) => <Post key={post.id}{...post}/>)}
                </section>
            </div>
            <footer id="cookies"><CookiesBanner/></footer>
        </>

    );
}