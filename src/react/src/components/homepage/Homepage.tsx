import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import '../../App.css';
import {Post, PostProps} from "../posts/post";
import CookiesBanner from "../cookies/CookiesBanner";
import {TopBar} from "../topbar/topBar";
import './Homepage.css'
//import {TopBar} from "./components/topbar/topBar";
import {useTranslation} from "react-i18next";
import { Api } from '../Api';

/*
    * Main page of website (link - '/')
    * Shows all posts
    * If connection is broke, you see "Loading..."
*/
export function Homepage() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostProps[]>([]);
    const {t, i18n} = useTranslation();
    const [hasConnection, setConnection] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(Api.posts, {method: 'HEAD'})
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

    // Connection with my server
    useEffect(() => {
        if (!hasConnection)
            return;

        fetch(Api.posts)
            .then(response => response.json())
            .then(json => {
                setPosts(json);
                setLoading(false);
            }).catch(() => {
        });
    }, [hasConnection]);

    if (loading) {
        return (<>
            <TopBar/>
            <div className="container" style={{marginTop: '70px'}}>
                <section className="row">
                    <h1>Loading</h1>
                    {!hasConnection ? <h2>No internet</h2> : ""}
                </section>
            </div>
            <footer id="cookies"><CookiesBanner/></footer>
        </>);
    }

    console.log(posts)
    return (
        <>
            <TopBar/>
            <div className="container" style={{marginTop: '70px'}}>
                <section className="row">
                    <div
                        className={"d-flex flex-row-reverse col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-md-10 offset-md-1 col-sm-12 col-xs-12 col-12 main__forward"}
                        onClick={() => {
                            window.history.go(1)
                        }}>{t('return_to_last')}</div>
                    {!hasConnection ? <h2>No internet</h2> : ""}
                    {posts.sort().map((post: PostProps) => <Post key={post.id}{...post}/>)}
                </section>
            </div>
            <footer id="cookies"><CookiesBanner/></footer>
        </>

    );
}