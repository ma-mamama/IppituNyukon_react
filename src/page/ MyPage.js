import {useEffect, useState} from 'react' 
import { auth } from '../firebase';
import { useHistory, Redirect } from 'react-router-dom';
import {TextField, Button, IconButton} from '@mui/material';


import { useAuthContext } from '../context/AuthContext';

import { GetUserName } from '../models/models';
import { deletePaint,getPaint } from '../models/models'

import ToHome from '../components/ToHome';
import { db } from '../firebase'

const  MyPage = () => {
    const [paints, setPaints] =useState([]);
    const history = useHistory();
    const {user, userName} = useAuthContext();
    console.log(paints)

    const handleLogout = () => {
        auth.signOut();
        history.push('/');
    };
    
    useEffect(() => {
        const f = async() =>{
            setPaints( await getPaint(user.uid))
            console.log(await getPaint(user.uid))
        };f();
    },[user.uid]);

    const deleteOpus = async(paintId) => {
        const result = window.confirm('本当に削除しますか？')
        if(result) {
            await deletePaint(paintId);
            const pList = paints.filter(p => p.paintId !== paintId)
            console.log(pList);
            setPaints(pList)
            window.alert('削除しました');
        }else {
            console.log('削除キャンセル')
        } 
    };

    const paintStyle = {
        height: "100px",
        width: "auto"
    }

    const flexStyle = {
        display: "flex",
    
    }

    const opusStyle = {
        margin: "10px",
    }
    const titleStyle = {
        fontSize: "20px",
        lineHeight:"3px"        
    }
    if(!user) {
        return <Redirect to="/login" />
    } else {
        return (
            <>
                <ToHome />
                <div>{userName}さん</div>
                <div>ログイン中：{ user.email }</div>
                <button onClick={handleLogout}>ログアウト</button>
                <hr />                
                <div>作品リスト</div>
                <div style={flexStyle}>
                {paints && paints.map((p,i) => (
                    <div style={opusStyle} key={p.id + p.paintTitle}>
                    <p style={titleStyle}>{p.paintTitle}</p>
                    <img src={p.paintUrl} style={paintStyle} alt="paint"/>
                    <p>
                    <Button variant="contained" href="#contained-buttons"  onClick={()=>deleteOpus(p.paintId)}  color="error">削除</Button>
                    </p>
                    </div>
                ))}
                </div>
            </>
        );
    };
}

export default  MyPage
