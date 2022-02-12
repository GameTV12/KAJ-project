import React from "react";
import App from "../../App";
import "../posts/style.css";
import {Poll, PollProps} from "./poll";

export type PostProps = {
    id: number;
    title: string;
    text: string;
    poll?: PollProps;
}
export function Post({title, text, id, poll}: PostProps) {
    return (
        <>
        <div>
            <h1 className={"post__title"}>Title - {title}</h1>
            <h2>id - {id}</h2>
            <p>text - {text}</p>
            { poll ? <Poll {...poll}/> : null}
        </div>
        </>
    );
}