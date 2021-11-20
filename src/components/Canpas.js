import React, { useCallback, useEffect, useState, useRef} from 'react';
import {Stage ,Graphics } from '@inlet/react-pixi';

const PixiTest = (props) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);
  const [isWrite, setIsWrite] = useState(false);
  const [titleName, setTitleName] = useState("");
  const [url, setUrl] = useState("")

  const stageRef = useRef(null);
  const grapficsRef = useRef(null);
  const titleRef = useRef(null);

  const mouseDown = (e) => {
    setIsWrite(true);
    setPosX(e.nativeEvent.offsetX)
    setPosY(e.nativeEvent.offsetY)
    console.log("on:\n")
    console.log(e.nativeEvent)
  }

  const mouseUp = (e) => {
    setIsWrite(false);
  }

  const mouseMove = (e) => {
    setMoveX(e.nativeEvent.offsetX)
    setMoveY(e.nativeEvent.offsetY)
    console.log("move:\n")
    console.log(e.nativeEvent)
    
  }

  const draw = useCallback((g) => {
    if(!isWrite) return;
    g.beginFill(props.color);
    g.lineStyle(4, 0x000, 1);
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
             preserveDrawingBuffer: true
            }} 
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
          onMouseMove={mouseMove} 
          renderOnComponentChange={true} //画像URLに変換するための設定
          >
          <Graphics draw={draw} ref={grapficsRef}/> 
        </Stage>
        <br /><input type="button" value="登録" onClick={register}/>
        <br />{titleName}
        <br /><img src={url} alt={titleName}/>
    </>
  );
}

export default PixiTest;