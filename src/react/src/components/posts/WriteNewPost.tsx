import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Route, Link, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {Axios} from "axios";
import "../posts/style.css";
import {GrAdd} from "react-icons/gr"
import {BiMinus} from "react-icons/bi"
/*
    * A page for writing new posts with input validation
*/

export function WriteNewPost() {
    const nav = useNavigate();
    // @ts-ignore
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    useEffect( () => {
        // @ts-ignore
        setCurrentUser(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : false);
    }, [localStorage.getItem("currentUser")])

    const variantAdder = useRef(null);

    const url: string = "http://localhost:8080/epoll/post/";
    // @ts-ignore
    const [data, setData] = useState(localStorage.getItem('postData') ? JSON.parse(localStorage.getItem('postData')) : {
        title: "",
        text: "",
        photos: [],
        frozen: false,
        variants: [""]
    });
    const [highLight, setHighLight] = useState(false);
    useEffect(()=> {
        localStorage.setItem('postData', JSON.stringify(data));
    }, [data])

    const axios = require('axios');
    function submit(e: any){
        e.preventDefault();
        const finalVariants = [...data.variants.filter((x: any) => x.text != "")];
        console.log(finalVariants);
        axios.post(url, finalVariants.length > 0 ? {
            title: data.title,
            content: data.text,
            poll: {frozen: data.frozen, variants: finalVariants}
        } : {
                title: data.title,
                content: data.text
            }, {headers: {'Authorization' : 'Bearer ' + currentUser.accessToken,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'}}
        ).then((res: any) => {
            // @ts-ignore
            document.querySelectorAll("input").forEach(x => x.value = "");
            document.querySelectorAll("textarea").forEach(x => x.value = "");
            localStorage.removeItem('postData');
            nav('/');
        })
    }

    function handle(e: any) {
        const newdata: any = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
    }

    function handleFile(e: any) {
        let files = e.target.files;
        handeFiles(files);
    }

    function handleCheck(e: any){
        setData({
            ...data,
            // @ts-ignore
            frozen: !e.target.checked
        })
    }

    const handeFiles = (files: any[]) => {
        let photosArr: any = [];
        for (let file of files){
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', ()=>{
                let fileObj={
                    name:file.name,
                    type:file.type,
                    size:file.size,
                    src:reader.result
                }
                photosArr.push(fileObj);
                setData({
                    ...data,
                    // @ts-ignore
                    photos: [...data.photos, ...photosArr]
                })
            })
        }
    }

    function handleDelete(e: any) {
        let target = e.target.parentElement;
        let targetIndex = target.dataset.imgindex * 1;
        setData({
            ...data,
            // @ts-ignore
            photos: [...data.photos.slice(0, targetIndex), ...data.photos.slice(targetIndex+1)]
        })
    }

    function handleHighLight(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setHighLight(true);
    }
    function handleUnHighLight(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setHighLight(false);
    }
    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();

        let dt = e.dataTransfer;
        let files = dt.files;
        setHighLight(false);
        handeFiles(files);
    }


    function handleChangeVariant(index: number, e: any) {
        const variants = [...data.variants];
        let fileObj={text: e.target.value};
        variants[index] = fileObj;
        setData({
            ...data,
            // @ts-ignore
            variants: variants
        })
    }

    function handleAddVariant(index: number){
        let variants = [...data.variants];
        if (variants.length<10){
            variants.splice(index+1, 0,'');
            let fileObj={text: ""};
            variants[index+1] = fileObj;
            setData({
                ...data,
                // @ts-ignore
                variants: variants
            })
        }
    }

    function handleDeleteVariant(index: number){
        const variants = [...data.variants];
        variants.splice(index, 1);
        setData({
            ...data,
            // @ts-ignore
            variants: variants
        })
    }

    const { t, i18n } = useTranslation();
    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <Container className={"new__main__div"}>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div>
                            <form onSubmit={(e)=>submit(e)}>
                                <h3>{t('write_post')}</h3>
                                <div className="mb-3">
                                    <label htmlFor="title">{t('title')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t('enter_title')}
                                        id="title"
                                        value={data.title}
                                        required
                                        maxLength={50}
                                        onChange={(e) => handle(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text">{t('text')}</label>
                                    <textarea className="form-control" id="text" rows={3} placeholder={t('enter_text')} value={data.text} required onChange={(e) => handle(e)}/>
                                </div>
                                <div className={"mb-3 custom-form-group"}>
                                    <div className={highLight? "custom-file-drop-area highlight" : "custom-file-drop-area"}
                                         onDragEnter={handleHighLight}
                                         onDragOver={handleHighLight}
                                         onDragLeave={handleUnHighLight}
                                         onDrop={handleDrop}
                                    >
                                        <label htmlFor="photos">{t('title')}</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            placeholder={t('enter_title')}
                                            id="photos"
                                            multiple={true}
                                            onChange={(e) => handleFile(e)}
                                        />
                                    </div>
                                    <div className={"custom-file-preview"}>
                                        {data.photos.length > 0 && data.photos.map((item: any, index: number)=>(
                                            <div className="prev-img" key={index} data-imgindex={index}>
                                                <span onClick={(e) => handleDelete(e)}>&times;</span>
                                                <img src={item.src} alt={item.name}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <h4>{t('poll_title')} (1 - 10)</h4>
                                <input className="form-check-input" type="checkbox" id="frozen" onChange={(e) => handleCheck(e)} checked={data.frozen}/>
                                    <label className="form-check-label" htmlFor="frozen">
                                        { t('frozen_bool')}
                                    </label>
                                <div className="mb-3">
                                    {
                                        data.variants.map((inputField: any, index: number) => (
                                            <div key={index} className={"input-group"}>
                                                <input type="text" className="form-control" id={"variants["+index+"]"}
                                                       placeholder={t('enter_variant')} value={data.variants[index].text} onChange={(e) => handleChangeVariant(index, e)}/>
                                                <div className={"input-group-append"}>
                                                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleAddVariant(index)}><GrAdd></GrAdd></button>
                                                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleDeleteVariant(index)}><BiMinus></BiMinus></button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        {t('new_post')}
                                    </button>
                                </div>
                            </form>
                            <p className="forgot-password text-right">
                                {t('return_from_writepost')} <a href="/">{t('return_to_main')}</a>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}