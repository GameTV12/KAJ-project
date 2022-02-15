import React from "react";
import App from "../../App";
import "../posts/style.css";
import {Button, Card, ProgressBar} from 'react-bootstrap';

export type PollProps = {
    id: number;
    frozen: boolean;
    variants: VariantProps[];
}

export type VariantProps = {
    id: number;
    text: string;
    votes: number;
    summaryVotes: number;
}

export function Poll(props: PollProps) {
    const summaryVotes = props.variants.map((variant: VariantProps) => variant.votes).reduce((a, b)=> (a+b));
    props.variants.forEach(value => value.summaryVotes = summaryVotes);
    return (
        <>
            <Card className={"p-2"}>
                <h3 className={"text-center"}>id - {props.id}, frozen - {props.frozen.toString()}</h3>
                <div>{props.variants.map((variant: VariantProps) => <PollVariant key={variant.id}{...variant}/>)}</div>
            </Card>
        </>
    );
}

function PollVariant(props: VariantProps) {
    const percent = props.summaryVotes > 0 ? Number((props.votes/props.summaryVotes*100).toFixed(2)) : 0;
    return (
        <>
            <div>
                <h5>Id: {props.id} </h5>
                <h6>Text: {props.text} ({percent}%)</h6>
                <a href={"https://google.com"} className={"text-decoration-none font-weight-bold post__variant__text text-dark"}>
                    <ProgressBar className={"post__variant__bar"} now={percent} animated label={`${props.text}`}/>
                </a>
            </div>
        </>
    );
}