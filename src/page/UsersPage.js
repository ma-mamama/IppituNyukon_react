import {useEffect, useState} from 'react' 
import { auth } from '../firebase';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import {TextField, Button, IconButton} from '@mui/material';


import { useAuthContext } from '../context/AuthContext';

import { getUserName,} from '../models/models';
import { getPaint } from '../models/models'
import Creation from '../components/Creation';

import ToHome from '../components/ToHome';

const  MyPage = () => {
    const {userId} = useParams();
    console.log(userId);

    const [paints, setPaints] =useState([]);
    const [userName, setUserName] = useState();
    const history = useHistory();

    useEffect(() => {
        const f = async() =>{
            setPaints( await getPaint(userId));
            setUserName( await getUserName(userId));
        };f();
    },[userId]);

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
        <>
            <ToHome />
            <div>{userName}さん</div>
            <hr />                
            <div>作品リスト</div>
            <div style={flexStyle}>
            {paints && paints.map((p,i) => (
                <Creation
                paintTitle = {p.paintTitle} 
                paintUrl = {p.paintUrl} 
                uid = {p.uid}
                // userName = {p.userName}
                key = {p.paintUrl}
            />
            ))}
            </div>
        </>
    );
    
}

export default  MyPage
