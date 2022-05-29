import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Route, Link} from "react-router-dom";
import "./notfound.css"
// @ts-ignore
import draw_finish from "./draw_finish.mp3";
// @ts-ignore
import draw_cleared from "./draw_cleared.mp3";


export type RegisterProps = {
    name: string
    password: string
}

export function NotFound() {
    const { t, i18n } = useTranslation();
    const finishSound = new Audio(draw_finish);
    const clearedSound = new Audio(draw_cleared);

    const canvasRef = useRef(null);
    const contextRef: any = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isSound, setIsSound] = useState(true);

    useEffect(() => {
        const canvas: any = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth/2.0}px`;
        canvas.style.height = `${window.innerHeight/2.0}px`;

        const context: any = canvas.getContext("2d");
        context.scale(2,2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 3;
        contextRef.current = context;
    }, [])

    const startDrawing = ({nativeEvent}: any) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        contextRef.current.closePath();
        if (isSound){
            finishSound.pause();
            finishSound.currentTime = 0;
            finishSound.play();
        }
        setIsDrawing(false);
    }

    const draw = ({nativeEvent}: any) => {
        if(!isDrawing){
            return;
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

    const convertToImage = () => {
        // @ts-ignore
        let canvas: HTMLCanvasElement = canvasRef.current;
        let anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "404image.png";
        anchor.click();
    }

    const refreshCanvas = ({e}: any) => {
        // @ts-ignore
        const context = canvasRef.current.getContext('2d');
        if (isSound){
            clearedSound.pause();
            clearedSound.currentTime = 0;
            clearedSound.play();
            console.log(1);
        }
        // @ts-ignore
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }



    return (
        <>
            <div className={"d-flex flex-column justify-content-center notfound__bottom"}>
                <div className="loading"></div>
                <div className={"text-center"}>
                    <h1>404</h1>
                    <h2>{t('not_found')}</h2>
                    <p className="forgot-password text-right">
                        <a href="/">{t('return_to_main')}</a>
                    </p>
                </div>
                <div className={"m-auto no-select"}>
                    <h2 className={"text-center"}>Paint</h2>
                    <ul>
                        <li>{t("lmb_guide")}</li>
                        <li>{t("lmb_double_guide")}</li>
                    </ul>
                    <canvas
                         onMouseDown={startDrawing}
                         onMouseUp={finishDrawing}
                         onMouseMove={draw}
                         onDoubleClick={refreshCanvas}
                         ref={canvasRef}
                    />
                </div>
                <div className={"m-auto"}>
                    <button className="btn btn-primary d-inline-block m-3" type="submit" onClick={()=>(setIsSound(!isSound))}>{t('on_off_sound')}</button>
                    <button className="btn btn-primary d-inline-block m-3" type="submit" onClick={convertToImage}>{t('download_image')}</button>
                </div>
            </div>
        </>
    );
}

