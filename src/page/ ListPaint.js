import React from 'react'
import {useEffect, useState} from 'react' 
import { Link } from 'react-router-dom'
import {IconButton, Button,Card, CardHeader, Avatar, MoreVertIcon, CardMedia, CardContent, Typography, CardActions, Collapse} from '@mui/material';
import {FavoriteIcon, ShareIcon, ExpandMoreIcon} from '@mui/icons-material/Info';


import ToHome from '../components/ToHome';
import Creation from '../components/Creation';

import { getAllPaints} from '../models/models'


const ListPaint = () => {
    const [paints, setPaints] =useState([]);

    useEffect(() => {
        const f = async() =>{
            setPaints( await getAllPaints() )
        };f();
    },[]);

    const flexStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",    
    }

    return (
        <div>
            <ToHome />
            <div>作品リスト</div>
            <div style={flexStyle}>
                {paints.map((p) => (
                    <Creation
                        paintTitle = {p.paintTitle} 
                        paintUrl = {p.paintUrl} 
                        uid = {p.uid}
                        userName = {p.userName}
                        key = {p.paintUrl}
                    />
                ))}
            </div>
            {/* <Card></Card> */}

        </div>
    )
}

export default  ListPaint

