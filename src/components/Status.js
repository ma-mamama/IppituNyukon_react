import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const Status = () => {
    const { user } = useAuthContext();
    console.log(user);
    return ( 　
        user ? <div>ログイン：{user.displayName}</div> : <div>未ログイン</div>
    )
}

export default Status 