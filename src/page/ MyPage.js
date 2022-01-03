import {useEffect, useState} from 'react' 
import { auth } from '../firebase';
import { useHistory, Redirect } from 'react-router-dom';
import {Button,} from '@mui/material';


import { useAuthContext } from '../context/AuthContext';

import { deletePaint,getPaint } from '../models/models'

import ToHome from '../components/ToHome';
import Creation from '../components/Creation';

const  MyPage = () => {
    const [paints, setPaints] =useState([]);
    const history = useHistory();
    const {user, userName} = useAuthContext();

    if(!user){
        history.push('/login')
      }

    const handleLogout = () => {
        auth.signOut();
        history.push('/');
    };
    
    useEffect(() => {
        const f = async() =>{
            setPaints( await getPaint(user.uid))
        };f();
    },[]);

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

    const flexStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center", 
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
                    <Creation
                        content = {
                            <Button
                                variant="contained" 
                                href="#contained-buttons"  
                                onClick={()=>deleteOpus(p.paintId)}  
                                color="error">削除</Button>
                        }
                        paintTitle = {p.paintTitle} 
                        paintUrl = {p.paintUrl} 
                        uid = {p.uid}
                        key = {p.paintUrl}
                    />
                ))}
                </div>
            </>
        );
    };
}

export default  MyPage
