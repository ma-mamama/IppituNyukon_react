import React from 'react'
import { Link } from 'react-router-dom';
import {Card, CardHeader, CardMedia, CardContent, Typography,} from '@mui/material';

const Creation =(props)=> {
    const cardStyle = {
        width : "220px",
        height : "auto",
    }

    return (
        <Card className='short-margin' style={cardStyle} key={props.paintUrl} >
            <CardHeader
                title={props.paintTitle}
                className=".MuiCardHeader-title"
                subheader={<Link to={'/userspage/'+ props.uid}>{props.userName}</Link>}
            />
            <CardMedia
                component="img"
                height="auto"
                width="auto"
                image={props.paintUrl} 
                alt={props.paintTitle}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.content}
                </Typography>
            </CardContent>
            
            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
            </CardActions> */}
        </Card>
    )
}

export default Creation
