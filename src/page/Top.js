import React from 'react'
import { Link } from 'react-router-dom';

import ippitu from './../static/media/ippitu.png';
import pen from './../static/media/pen.png';
import book from './../static/media/book.png';

const ippituStyle = {
    height: "200px",
    width: "auto",
    left: "auto",
    right: "auto",
}

const buttonStyle = {
    height: "100px",
    width: "auto",
    borderRadius: "50px", 
}



const Top = () => {
    return (
        <main>
            <div>
                <img src={ippitu} alt="title" style={ippituStyle}/>
                <div>
                    <Link to='/Paint'><img src={pen} alt="write" style={buttonStyle}/></Link>
                    <Link to='/Home'><img src={book} alt="watch" style={buttonStyle}/></Link>
                </div>
            </div>
        </main>
    )
}

export default Top