import React from 'react'
import {useEffect, useState} from 'react' 
import ToHome from '../components/ToHome';


import { getAllPaints } from '../models/models'

const  ListPaint = () => {
    const [paints, setPaints] =useState([]);

    useEffect(() => {
        const f = async() =>{
            setPaints( await getAllPaints() )

        };f();
    },[]);

    const paintStyle = {
        height: "100px",
        width: "auto"
    }

    const flexStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",    
    }

    const opusStyle = {
        margin: "10px",
    }
    const titleStyle = {
        fontSize: "20px",
        lineHeight:"3px"        
    }

    return (
        <div>
            <ToHome />
            <div>作品リスト</div>
                <div style={flexStyle}>
                {paints.map((p,i) => (
                    <div style={opusStyle} key={p.id + p.paintTitle}>
                    <p style={titleStyle}>{p.paintTitle}</p>
                    <img src={p.paintUrl} style={paintStyle} alt="paint"/>
                    <p >{}</p>
                    </div>
                ))}
                </div>
        </div>
    )
}

export default  ListPaint

