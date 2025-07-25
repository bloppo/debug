import React from 'react';
import {Clone, useGLTF} from "@react-three/drei";

const CeilingLights = (props) => {

    const {scene} = useGLTF('Fluorescent_Light.glb')
    return (
        <>
            <Clone ref={props.ref} object={scene} position={[-4 + 0.25,10-0.15/2,-3.5]} rotation={[0, 0, 0]} scale={[6,1,5]} />
            <Clone object={scene} position={[3.25 + 0.25,10-0.15/2,-3.5]} rotation={[0, 0, 0]} scale={[6,1,5]} />
            <Clone object={scene} position={[-4 + 0.25,10-0.15/2,0]} rotation={[0, 0, 0]} scale={[6,1,5]} />
            <Clone object={scene} position={[3.25 + 0.25,10-0.15/2,0]} rotation={[0, 0, 0]} scale={[6,1,5]} />
            <Clone object={scene} position={[-4 + 0.25,10-0.15/2,3.5]} rotation={[0, 0, 0]} scale={[6,1,5]} />
            <Clone object={scene} position={[3.25 + 0.25,10-0.15/2,3.5]} rotation={[0, 0, 0]} scale={[6,1,5]} />
        </>
    )
}

export default CeilingLights;