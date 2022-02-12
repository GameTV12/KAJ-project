import React from "react";
import App from "../../App";
import "../posts/style.css";

export type PollProps = {
    id: number;
    frozen: boolean;
    variants: VariantProps[];
}

export type VariantProps = {
    id: number;
    text: string;
    votes: number;
}

export function Poll(props: PollProps) {
    return (
        <>
            <div>
                <h2>id - {props.id}, frozen - {props.frozen.toString()}</h2>
                <div>{props.variants.map((variant: VariantProps) => <PollVariant key={variant.id}{...variant}/>)}</div>
            </div>
        </>
    );
}

function PollVariant(props: VariantProps) {
    return (
        <>
            <div>
                <h5>Id: {props.id} </h5>
                <h6>Text: {props.text}</h6>
                <h6>Views: {props.votes}</h6>
            </div>
        </>
    );
}