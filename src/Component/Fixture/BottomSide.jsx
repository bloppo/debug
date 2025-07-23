import React from 'react';

import {useState} from "react";
import {useGlobal} from "../../Provider/GlobalProvider.jsx";

const BottomSide = ({dimensions,color,thisRef,clicked}) => {

    const bottomWidth = dimensions.width - dimensions.thickness
    const bottomX = (dimensions.thickness + bottomWidth)/2
    const bottomY = - (dimensions.height - dimensions.thickness - .1)/2

    const [aColor, setAColor] = useState(color)

    const ug = useGlobal()

    const highlite = true; //ug.movingObj

    return (

        <mesh ref={thisRef}
              receiveShadow={true}
              position={[bottomX,bottomY,0]}
              onPointerOver = {(e) => {highlite && setAColor("#000000")}}
              onPointerDown = {(e) => {clicked(e,{name:"bottom"}); e.stopPropagation()}}
              onPointerOut = {(e) => {highlite && setAColor(color)}}
        >
            <boxGeometry args={[bottomWidth, dimensions.thickness, dimensions.depth]}/>
            <meshStandardMaterial color={aColor} wireframe={false}/>
        </mesh>

    )
}

export default BottomSide;
