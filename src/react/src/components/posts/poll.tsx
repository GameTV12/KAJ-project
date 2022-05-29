import React, {useState} from "react";
import "../posts/style.css";
import {Card, ProgressBar} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import {Login} from "../login/login";

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

export function Poll(props: PollProps, numberOfVariants: number) {
    const { t, i18n } = useTranslation();
    const summaryVotes: number = props.variants.map((variant: VariantProps) => variant.votes).reduce((a, b)=> (a+b));
    props.variants.forEach(value => value.summaryVotes = summaryVotes);
    if (numberOfVariants==5){
        return (
            <>
                <Card className={"p-2"}>
                    <div>{props.variants.sort((a, b) => b.votes - a.votes).slice(0, 5).map((variant: VariantProps) => <PollVariant key={variant.id}{...variant}/>)}</div>
                </Card>
            </>
        );
    }
    else {
        return (
            <>
                <Card className={"p-2"}>
                    <div>{props.variants.sort((a, b) => b.votes - a.votes).map((variant: VariantProps) => <PollVariant key={variant.id}{...variant}/>)}</div>
                </Card>
            </>
        );
    }
}

function PollVariant(props: VariantProps) {
    const percent: number = props.summaryVotes > 0 ? Number((props.votes/props.summaryVotes*100).toFixed(2)) : 0;
    return (
        <>
            <div className={"post__variant__block"}>
                <a href={`/variant/${props.id}/comments`} className={"text-decoration-none font-weight-bold post__variant_link text-dark"}>
                    <ProgressBar className={"post__variant__bar"} now={percent} animated label={<span className={"post__variant__text"}>{props.text} ({percent}%)</span>}/>
                </a>
            </div>

        </>

    );
}