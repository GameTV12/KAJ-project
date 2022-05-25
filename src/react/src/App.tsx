import React, {useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import {Post, PostProps} from "./components/posts/post";
import {Register} from "./components/register/register";
import CookiesBanner from "./components/cookies/CookiesBanner";
import {TopBar} from "./components/topbar/topBar";
import {Homepage} from "./components/homepage/Homepage";
import {NotFound} from "./components/notfound/notfound";
//import {TopBar} from "./components/topbar/topBar";


function App() {

    const [regularUser, setRegularUser] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [moderator, setModerator] = useState(false);
    const [banned, setBanned] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    // useEffect(() => {
    //     const user = AuthService.getCurrentUser();
    //     if (user) {
    //         setCurrentUser(user);
    //         setRegularUser(user.roles.includes("ROLE_REGULAR_USER"));
    //         setAdmin(user.roles.includes("ROLE_ADMIN"));
    //         setSystemOwner(user.roles.includes("ROLE_SYSTEM_OWNER"));
    //         setSystemEmployee(user.roles.includes("ROLE_SYSTEM_EMPLOYEE"));
    //     }
    // }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Register/>}/>
                {/*<Route path="/post/:id" element={<PostFull/>}/>*/}
                {/*<Route path="/post/:id/comments" element={<PostComments/>}/>*/}
                {/*<Route path="/user/:id/posts" element={<AllPosts/>}/>*/}
                {/*<Route path="/register/after" element={<AfterRegistration/>}/>*/}
                <Route path="*" element={<NotFound />}/>

                {/*{regularUser && (*/}
                {/*    <Route path="/writepost" element={<WritePost/>}/>*/}
                {/*    <Route path="/myfollowers" element={<MyFollowers/>}/>*/}
                {/*)}*/}

                {/*{moderator && (*/}
                {/*    <Route path="/" element={<CustomerRoutes/>}/>*/}
                {/*)}*/}

                {/*{banned && (*/}
                {/*    <Route path="/" element={<CustomerRoutes/>}/>*/}
                {/*)}*/}
            </Routes>

        </>

    );
}

export default App;
