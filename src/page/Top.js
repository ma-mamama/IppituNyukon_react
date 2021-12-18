import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

import ippitu from './../static/media/ippitu.png';
import pen from './../static/media/write.png';
import book from './../static/media/book.png';
import sign from './../static/media/sign.png';
import mypage from './../static/media/user.png';



const ippituStyle = {
    width: "100%",
    height: "auto",
    margin:"0",
    verticalalign: "middle"
}

const imageStyle = {
    height: "50px",
    width: "auto",
    margin: "auto",
    // position: "absolute",
    top: "auto",
    left: "auto",
}

const buttonStyle = {
    height: "100px",
    width: "100px",
    background: "white",
    borderRadius: "50px",
    position: "relative",
    margin: "10px",
    textAlign: "center",

    //縦中央揃え
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
}

const flexStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
    flexWrap: "wrap",
}

const Top = () => {
    const { user } = useAuthContext();

    return (
        <main >
            <div style={{textAlign: "center"}}>
                <img src={ippitu} alt="title" style={ippituStyle}/>
                <div style={flexStyle}>
                    {user ? (<Link to='/Paint'><div style={buttonStyle}><img src={pen} alt="write" style={imageStyle}/></div></Link>): (<></>)}
                    <Link to='/ListPaint'><div style={buttonStyle}><img src={book} alt="watch" style={imageStyle}/></div></Link>
                    {!user ? (<Link to='/Login'><div style={buttonStyle}><img src={sign} alt="login" style={imageStyle}/></div></Link>):(<></>)}
                    {user ? (<Link to='/MyPage'><div style={buttonStyle}><img src={mypage} alt="mypage" style={imageStyle}/></div></Link>): (<></>)}
                </div>
            </div>
        </main>
    )
}

export default Top