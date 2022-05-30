import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18next';
import reportWebVitals from './reportWebVitals';
import CookiesBanner from "./components/cookies/CookiesBanner";
import {TopBar} from "./components/topbar/topBar";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Register} from "./components/register/register";

/*
    * index.tsx defines render and renders the app, because react works through rendering of its virtual DOM
*/

// ReactDOM.render(
//     <Suspense fallback>
//       <React.StrictMode>
//           <App/>
//       </React.StrictMode>
//     </Suspense>,
//   document.getElementById('root')
// );

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();