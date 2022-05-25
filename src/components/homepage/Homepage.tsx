import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../App.css';
import {Post, PostProps} from "../posts/post";
import CookiesBanner from "../cookies/CookiesBanner";
import {TopBar} from "../topbar/topBar";
//import {TopBar} from "./components/topbar/topBar";


export function Homepage() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostProps[]>([]);

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
            <div className="container">
                <section className="row">
                    {posts.sort().map((post:PostProps) => <Post key={post.id}{...post}/>)}
                </section>
            </div>
            <div id="cookies"><CookiesBanner/></div>
        </>

    );
}