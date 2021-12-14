import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const Status = () => {
    const { user, userName } = useAuthContext();
    console.log(user);
    return ( 
        user ? <div>ログイン：{userName}</div> : <div>未ログイン</div>
    )
}

export default Status 