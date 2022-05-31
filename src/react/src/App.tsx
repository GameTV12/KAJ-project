import React, {createContext, useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import {Post, PostProps} from "./components/posts/post";
import {Register} from "./components/register/register";
import CookiesBanner from "./components/cookies/CookiesBanner";
import {TopBar} from "./components/topbar/topBar";
import {Homepage} from "./components/homepage/Homepage";
import {NotFound} from "./components/notfound/notfound";
import {PostCommentsPage} from "./components/comments/PostCommentsPage";
import {WriteNewPost} from "./components/posts/WriteNewPost";
import {Welcome} from "./components/welcome/Welcome";


/*
    * It's core file of the app. Core React file
    * App starts all pages and defines all routes
    * App is also file for authorization
 */

function App() {

    // @ts-ignore
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);

    useEffect( () => {
        // @ts-ignore
        setCurrentUser(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    }, [localStorage.getItem("currentUser")])


    // Routes for users. These routes manage access to pages
    // @ts-ignore
    return (
        <>
            <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/:elementType/:elementID/comments" element={<PostCommentsPage/>}/>
                    <Route path="/register/after" element={<Welcome/>}/>
                    <Route path="*" element={<NotFound />}/>

                    {currentUser!=null && currentUser!=false ?
                    <Route path="/writepost" element={<WriteNewPost/>}/> : ""}

                    {/*{banned && (*/}
                    {/*    <Route path="/" element={<CustomerRoutes/>}/>*/}
                    {/*)}*/}
            </Routes>
        </>

    );
}

export default App;