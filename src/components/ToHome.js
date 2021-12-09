import React from 'react'
import { Link } from 'react-router-dom';

import ippitu from './../static/media/ippitu.png';

const ippituStyle = {
    height: "50px",
    width: "auto"
}

const ToHome = () => {
    return (
        <>
          <Link to='/'><img src={ippitu} alt="home" style={ippituStyle}/></Link>
        </>
    )
}

export default ToHome
