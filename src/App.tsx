import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Post, PostProps} from "./components/posts/post";
import {TopBar} from "./components/topbar/topBar";


function App() {
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
        return <h1>Loading</h1>;
    }

    return (
        <>
            <TopBar />
            <div className="container">
                <section className="row">
                    <h1 className={"text-center"}>Main page</h1>
                    {posts.map((post:PostProps) => <Post key={post.id}{...post}/>)}
                </section>
            </div>
        </>
    );
}

export default App;
