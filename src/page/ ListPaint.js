import React from 'react'
import {useEffect, useState} from 'react' 
import {IconButton, Card, CardHeader, Avatar, MoreVertIcon, CardMedia, CardContent, Typography, CardActions, Collapse} from '@mui/material';
import {FavoriteIcon, ShareIcon, ExpandMoreIcon} from '@mui/icons-material/Info';


import ToHome from '../components/ToHome';


import { getAllPaints } from '../models/models'

const  ListPaint = () => {
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
                {paints.map((p,i) => (
                    // <div style={opusStyle} key={p.id + p.paintTitle}>
                    // <p style={titleStyle}>{p.paintTitle}</p>
                    // <img src={p.paintUrl} style={paintStyle} alt="paint"/>
                    // <p className='userName'>{p.userName}</p>
                    // </div>
                    <Card className='middle-margin' key={p.paintUrl}>
                        <CardHeader
                            title={p.paintTitle}
                            subheader={p.userName}
                        />
                        <CardMedia
                            component="img"
                            height="194px"
                            width="194px"
                            image={p.paintUrl}
                            alt={p.paintTitle}
                        />
                        {/* <CardContent> */}
                            {/* <Typography variant="body2" color="text.secondary">
                                {p.paintTitle}
                            </Typography> */}
                        {/* </CardContent> */}
                        {/* <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                            </IconButton>
                            <IconButton aria-label="share">
                            <ShareIcon />
                            </IconButton>
                        </CardActions> */}
                    </Card>
                ))}
            </div>
            {/* <Card></Card> */}

        </div>
    )
}

export default  ListPaint

