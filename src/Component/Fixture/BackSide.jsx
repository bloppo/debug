import React from 'react';

const BackSide = ({dimensions,color,thisRef,clicked}) => {

    const backSideWidth = dimensions.width + dimensions.thickness
    const backSideX = dimensions.width / 2
    const backSideZ = -(dimensions.depth + dimensions.thickness)/2

    return (

        <mesh ref={thisRef}
                castShadow={true}
                receiveShadow={true}
              position={[backSideX,0,backSideZ]}
              onPointerOver = {(e) => {e.stopPropagation();}}
              onPointerDown = {(e) => {clicked(e,{name:"back"}); e.stopPropagation()}}
              onPointerOut = {(e) => {e.stopPropagation();}}
        >
            <boxGeometry args={[backSideWidth, dimensions.height, dimensions.thickness]}/>
            <meshStandardMaterial color={color} wireframe={false}/>
        </mesh>

    )

}

export default BackSide;
