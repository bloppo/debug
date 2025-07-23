import React from 'react';

const VerticalSide = ({dimensions,x,color,thisRef,clicked}) => {

    return (

        <mesh ref={thisRef}
                castShadow={true}
              metalness={0.9}
              roughness={0.6}
              position={[x,0,0]}
              onPointerOver = {(e) => {e.stopPropagation();}}
              onPointerDown = {(e) => {clicked(e,{name:"side"});e.stopPropagation()}}
              onPointerOut = {(e) => {e.stopPropagation();}}
        >
            <boxGeometry args={[dimensions.thickness, dimensions.height, dimensions.depth]}/>
            <meshStandardMaterial color={color} wireframe={false}/>
        </mesh>

    )

}

export default VerticalSide;
