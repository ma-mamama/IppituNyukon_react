import React, { useCallback, useEffect, useState, useRef} from 'react';
import { useHistory } from 'react-router';
import {Stage ,Graphics } from '@inlet/react-pixi';
import { addPaint } from '../models/models';
import { useAuthContext } from '../context/AuthContext';
import Announce from './Announce';
import { Paper, Button } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

const PixiTest = (props) => {
  let history = useHistory();
  const { user, setLogs, userName} = useAuthContext();
  if(!user){
    history.push('/login')
  }
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  const [moveX, setMoveX] = useState();
  const [moveY, setMoveY] = useState();
  const [error, setError] = useState("");
  
  const [isWrite, setIsWrite] = useState(false);
  const [titleName, setTitleName] = useState("");
  const [ishidden, setIshidden] = useState(false);
  const [isColor, setIsColor] = useState('0x000000');

  const colorElement = [];
  const colorList = {'black':'0x000000', 'gray':'0x808080','silver':'0xc0c0c0','white':'0xffffff','maroon':'0x800000','red':'0xff0000','orange':'0xffa500','gold':'0xffd700','yellow':'0xffff00','lime':'0x00ff00','cyan':'0x00ffff','blue':'0x0000ff','magenta':'0xff00ff','violet':'0xee82ee','pink':'0xffc0cb'}

  

  const stageRef = useRef(null);
  const grapficsRef = useRef(null);


  const setTitle = (e) => {
    setTitleName(e.target.value)
  }

  const startPaint = () => {
    if(titleName === ""){
      setError("タイトルを入力してください")
      return 
    }
    setIshidden(!ishidden);
  }

  const mouseDown = (e) => {
    setIsWrite(true);
    setPosX(e.nativeEvent.offsetX)
    setPosY(e.nativeEvent.offsetY)
  }

  const mouseUp = (e) => {
    setIsWrite(false);
  }

  const mouseMove = (e) => {
    setMoveX(e.nativeEvent.offsetX)
    setMoveY(e.nativeEvent.offsetY)
  }

  const touchStart = (e) => {
    console.log("touchStart");

    setIsWrite(true);
    console.log(e.touches[0].clientX - stageRef.current._canvas.offsetLeft)
    setPosX(e.touches[0].clientX - stageRef.current._canvas.offsetLeft)
    setPosY(e.touches[0].pageY - stageRef.current._canvas.offsetTop) 
    console.log(e.touches[0].clientY)
    console.log(posX)
    console.log(posY)
    // etBoundingClientRect()
  }
  const touchEnd = (e) => {
    setPosX();
    setPosY();
    setMoveX();
    setMoveY();
  }
  const touchMove = (e) =>{
    console.log("touchMove");
    setMoveX(e.touches[0].clientX - stageRef.current._canvas.offsetLeft)
    setMoveY(e.touches[0].pageY - stageRef.current._canvas.offsetTop)
  }

  const draw = useCallback((g) => {
    if(!isWrite)  return;
    console.log("draw");
    // g.lineStyle({width:4, color:0x000,alpha:1, alignment:0.5, native:false, cap:"PIXI.LINE_CAP.ROUND"});
    g.lineStyle(4, isColor,1, 0.5, false, "ROUND");

    // g.lineStyle({"options.cap":"round"});
    g.moveTo(posX, posY);
    console.log(moveX,moveY)
    g.lineTo(moveX, moveY);
    setPosX(moveX);
    setPosY(moveY);
  }, [moveX, moveY, isWrite, posX, posY, isColor]);

  const register = () => {
    addPaint(user.uid, userName, titleName, stageRef.current._canvas.toDataURL()).then(
     (e) =>{
       if(e){
         setError(e.message)
         alert("ログインしてください")
         history.push('/Login')
       }
     },
      // setLogs({userLog:user, titleLog:titleRef.current.value, actionLog: '作成'}),
      alert("アップロード完了"),
      history.push('/listpaint')
    )
  }

  const colorStyle = (color) => {
    return({
    backgroundColor: color,
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    margin: "10px",
      }
    )
  }

  const flexStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  }

  const paperTitleStyle = {
    margin: '20px'
  }

  const paperStyle = {
    padding: '20px'
  }
  Object.keys(colorList).forEach((c, i) => {
    colorElement.push(
    <p key={i} style={colorStyle(c)} onClick={()=>setIsColor(colorList[c])}></p> 
    )
    }
  )
  return (
    <>
        {ishidden ? 
          <div>
            <p>{titleName}</p>
              <Stage 
                ref={stageRef}
                width={300} 
                height={300} 
                options={{
                  backgroundColor: 0xfffffffff ,
                  preserveDrawingBuffer: true,
                  antialias: true
                  }} 
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseMove={mouseMove} 
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEnd={touchEnd}
                renderOnComponentChange={true} //画像URLに変換するための設定
              >
                <Graphics draw={draw} ref={grapficsRef} /> 
              </Stage>
              <div style={flexStyle}>
                {colorElement}
              </div>
            <p><Button variant="contained" onClick={register}>登録</Button></p>
          </div>
          :
          <Paper elevation={3} style={paperStyle}>
            <p style={paperTitleStyle}>Titleを決めてください</p>
            <div><input name="title" type="text" value={titleName} onChange={setTitle} placeholder="title" /></div>
            <div style={paperTitleStyle}><Button variant="contained" name="start" onClick={startPaint} >絵を描く</Button></div>
            <p>{error}</p>
          </Paper>
        }
    </>
  );
}

export default PixiTest;