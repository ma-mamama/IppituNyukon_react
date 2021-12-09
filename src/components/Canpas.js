import React, { useCallback, useEffect, useState, useRef} from 'react';
import {Stage ,Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js'
import { addPaint } from '../models/models';
import { useAuthContext } from '../context/AuthContext';

const PixiTest = (props) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);
  const [isWrite, setIsWrite] = useState(false);
  const [titleName, setTitleName] = useState("");
  const [url, setUrl] = useState("")

  const { user } = useAuthContext();

  const stageRef = useRef(null);
  const grapficsRef = useRef(null);
  const titleRef = useRef(null);

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

  const draw = useCallback((g) => {
    if(!isWrite) return;
    g.beginFill(props.color);
    // g.lineStyle({width:4, color:0x000,alpha:1, alignment:0.5, native:false, cap:"PIXI.LINE_CAP.ROUND"});
    g.lineStyle(4, 0x000,1, 0.5, false, "ROUND");

    // g.lineStyle({"options.cap":"round"});
    g.moveTo(posX, posY);
    g.lineTo(moveX, moveY);
    setPosX(moveX);
    setPosY(moveY)
  }, [moveX, moveY, props.color, isWrite, posX, posY]);

  const register = () => {
    // console.log(stageRef.current._canvas.toDataURL())  
    // console.log(grapficsRef)
    setTitleName(titleRef.current.value)
    setUrl(stageRef.current._canvas.toDataURL())
    addPaint(user.uid,titleRef.current.value, stageRef.current._canvas.toDataURL()).then(
      alert("アップロード完了")
    )
  }

  return (
    <>
        title:<input name="title" type="text" ref={titleRef} placeholder="title"/><br/>
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
          renderOnComponentChange={true} //画像URLに変換するための設定
          >
          <Graphics draw={draw} ref={grapficsRef} /> 
        </Stage>
        <br /><input type="button" value="登録" onClick={register}/>
        <br />{titleName}
        <br /><img src={url} alt={titleName}/>
    </>
  );
}

export default PixiTest;