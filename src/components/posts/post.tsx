import React, {useState} from "react";
import App from "../../App";
import "../posts/style.css";
import {Button, Card} from 'react-bootstrap';
import {Poll, PollProps} from "./poll";


export type PostProps = {
    id: number;
    title: string;
    text: string;
    poll?: PollProps;
}
export function Post({title, text, id, poll}: PostProps) {
    const [value, setValue] = useState(0);

    function increment(){
        setValue( (value) => {return value+1})
    }

    return (
        <>
        <Card className={"p-4 mt-5 col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-md-10 offset-md-1 col-sm-12 col-xs-12 col-12 bg-light"}>
            <h2 className={"post__title text-center text-dark"}>Title - {title}</h2>
            <h3>id - {id}</h3>
            <p className={"post__text"}>text - {text}</p>
            { poll ? <Poll {...poll}/> : null}
            <h6>Counter: {value}</h6>
            <Button className={"btn btn-primary"} onClick={increment}>Show full</Button>
        </Card>
        </>
    );
}