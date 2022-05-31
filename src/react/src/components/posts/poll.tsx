import React, {useEffect, useState} from "react";
import "../posts/style.css";
import {Card, ProgressBar} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import {Login} from "../login/login";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// If frozen is false you can add a new variant to this poll, else - no
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

    const { t, i18n } = useTranslation();
    const [summaryVotes, setSummaryVotes] = useState(props.variants.map((variant: VariantProps) => variant.votes).reduce((a, b)=> (a+b)));
    props.variants.forEach(value => value.summaryVotes = summaryVotes);
    return (
        <>
            <Card className={"p-2"}>
                <div>{props.variants.sort((a, b) => b.votes - a.votes).map((variant: VariantProps) => <PollVariant key={variant.id}{...variant}/>)}</div>
            </Card>
        </>
    );
}

function PollVariant(props: VariantProps) {
    const nav = useNavigate();
    // @ts-ignore
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    useEffect( () => {
        // @ts-ignore
        setCurrentUser(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    }, [localStorage.getItem("currentUser")])

    const percent: number = props.summaryVotes > 0 ? Number((props.votes/props.summaryVotes*100).toFixed(2)) : 0;

    function voteForVariant(e: any){
        e.preventDefault();
        axios.put(`http://localhost:8080/epoll/post/postId/poll/${props.id}/vote`, props.id, {headers: {'Authorization' : 'Bearer ' + currentUser.accessToken,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'}}
        )
        nav(`/variant/${props.id}/comments`);

    }
    return (
        <>
            <div className={"post__variant__block"}>
                <a href={`/variant/${props.id}/comments`} onClick={(e) => voteForVariant(e)} className={"text-decoration-none font-weight-bold post__variant_link text-dark"}>
                    <ProgressBar className={"post__variant__bar"} now={percent} animated label={<span className={"post__variant__text"}>{props.text} ({percent}%)</span>}/>
                </a>
            </div>

        </>

    );
}