import React from 'react'
import { useAuthContext } from '../context/AuthContext';

const Announce =()=> {
    const {logs} = useAuthContext();
    return (
        <div>
            {logs}
        </div>
    )
}

export default Announce
