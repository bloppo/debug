import React, {useEffect} from 'react';

import {DoubleSide, RepeatWrapping, TextureLoader, SRGBColorSpace, Box3} from "three";
import {useLoader} from "@react-three/fiber";
import {useRef} from "react";

import useAppState from "../../AppState.js";

import {useGLTF, Clone, Decal} from "@react-three/drei";
import CeilingLights from "./CeilingLights.jsx";

const Store = (props) => {

const storeDimensions = useAppState((state) => state.storeDimensions);

const lightRef = useRef(null)

const floorRef = useRef(null)

//region Store  Dimensions ***************************************
const floor = storeDimensions.floor
const ceiling = storeDimensions.ceiling
const backWall = storeDimensions.back
const leftWall = storeDimensions.left
const rightWall = storeDimensions.right

const floorPos = useAppState((state) => state.floorPosition)
const ceilingPos = useAppState((state) => state.ceilingPosition)
const backWallPos = useAppState((state) => state.backWallPosition)
const leftWallPos = useAppState((state) => state.leftWallPosition)
const rightWallPos = useAppState((state) => state.rightWallPosition)
//endregion

//region Textures ***************************************
const texture = useLoader(TextureLoader,'granite_tile_ao_1k.jpg');

texture.roughness = 0.1;
texture.displacementMap = useLoader(TextureLoader,'granite_tile_disp_1k.jpg');
texture.normalMap = useLoader(TextureLoader,'granite_tile_nor_gl_1k.jpg');

texture.colorSpace = SRGBColorSpace;
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
texture.repeat.set(10, 10);

const muralTexture = useLoader(TextureLoader,'beautiful-woman.jpg');

const bwtexture = useLoader(TextureLoader,'brick_wall_11_ao_1k.jpg');
bwtexture.colorSpace = SRGBColorSpace;

//endregion ***************************************

    useEffect(() => {
        if(lightRef.current) {
            console.log(lightRef.current)
        }
    },[lightRef])

return (

    <>

        <CeilingLights ref={lightRef} pos={[0, 10 - 0.15/2, 0]} />

        <CeilingLights pos={[-5, 10 - 0.15/2, 0]} />

        <mesh receiveShadow={true}
            ref={floorRef}
            position={floorPos()}
            rotation-x={ - Math.PI /2 }
            onPointerDown={(e) => {props.clicked(e,{name:"floor"});}}>
            <planeGeometry args={[floor.width,floor.height]}/>
            <meshStandardMaterial color="#cccccc" side={DoubleSide} map={texture}/>
        </mesh>

        <mesh
            position={ceilingPos()}
            rotation-x={ - Math.PI /2 }
            onPointerDown={(e) => {props.clicked(e,{name:"ceiling"});e.stopPropagation()}}>
            <planeGeometry args={[ceiling.width,ceiling.height]}/>
            <meshStandardMaterial color="#ffffff" side={DoubleSide}/>
        </mesh>

        <mesh
            position={backWallPos()}
            onPointerDown={(e) => {props.clicked(e,{name:"back"});e.stopPropagation()}}>
            <planeGeometry args={[backWall.width,backWall.height]}/>
            <meshStandardMaterial color="#cccccc" map={bwtexture} side={DoubleSide} />
        </mesh>

        <mesh
            position={leftWallPos()}
            rotation-y={Math.PI/2}
            opacity={1}
            onPointerDown={(e) => {props.clicked(e,{name:"left"});e.stopPropagation()}}>
            <Decal
                depthTest={true}
                position={[0, 0.5, 0]} // adjust as needed
                rotation={[0, 0, 0]}
                scale={[6,6,0.01]}
                map={muralTexture}
            />
            <planeGeometry args={[leftWall.width,leftWall.height]}/>
            <meshStandardMaterial color="#aaaaaa" map={bwtexture}  side={DoubleSide} />
        </mesh>

        <mesh
            position={rightWallPos()}
            rotation-y={Math.PI/2}
            onPointerDown={(e) => {props.clicked(e,{name:"right"});e.stopPropagation()}}>
            <planeGeometry args={[rightWall.width,rightWall.height]}/>
            <meshStandardMaterial color="#aaaaaa" map={bwtexture}  side={DoubleSide} />
        </mesh>
    </>

        )
}

export default Store;