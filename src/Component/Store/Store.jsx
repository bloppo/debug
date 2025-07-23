
import {DoubleSide, RepeatWrapping, TextureLoader, SRGBColorSpace, Box3} from "three";
import {useLoader} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import useAppState from "../../AppState.js";

import {useGLTF, Clone, Decal} from "@react-three/drei";

const Store = (props) => {

const Model = () => {

    const {scene} = useGLTF('Fluorescent_Light.glb')
    return (
    <>
        <Clone object={scene} position={[-4 + 0.25,10-0.15/2,-3.5]} rotation={[0, 0, 0]} scale={[6,1,5]} />
        <Clone object={scene} position={[3.25 + 0.25,10-0.15/2,-3.5]} rotation={[0, 0, 0]} scale={[6,1,5]} />
        <Clone object={scene} position={[-4 + 0.25,10-0.15/2,0]} rotation={[0, 0, 0]} scale={[6,1,5]} />
        <Clone object={scene} position={[3.25 + 0.25,10-0.15/2,0]} rotation={[0, 0, 0]} scale={[6,1,5]} />
        <Clone object={scene} position={[-4 + 0.25,10-0.15/2,3.5]} rotation={[0, 0, 0]} scale={[6,1,5]} />
        <Clone object={scene} position={[3.25 + 0.25,10-0.15/2,3.5]} rotation={[0, 0, 0]} scale={[6,1,5]} />
    </>
    )
}

const storeDimensions = useAppState((state) => state.storeDimensions);

const floor = storeDimensions.floor
const ceiling = storeDimensions.ceiling
const backWall = storeDimensions.back
const leftWall = storeDimensions.left
const rightWall = storeDimensions.right

const floorPos = storeDimensions.floorPosition()
const ceilingPos = storeDimensions.ceilingPosition()
const backWallPos = storeDimensions.backWallPosition();
const leftWallPos = storeDimensions.leftWallPosition();
const rightWallPos = storeDimensions.rightWallPosition();

const texture = useLoader(TextureLoader,'granite_tile_ao_1k.jpg');

texture.roughness = 0.1;
texture.displacementMap = useLoader(TextureLoader,'granite_tile_disp_1k.jpg');
texture.normalMap = useLoader(TextureLoader,'granite_tile_nor_gl_1k.jpg');

texture.colorSpace = SRGBColorSpace;
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
texture.repeat.set(10, 10);

const muralTexture = useLoader(TextureLoader,'beautiful-woman.jpg');

const floorRef = useRef(null)

const bwtexture = useLoader(TextureLoader,'brick_wall_11_ao_1k.jpg');
      bwtexture.colorSpace = SRGBColorSpace;

// useEffect(() => {
//     const b = new Box3().setFromObject(floorRef.current);
// //    console.log(b);
// })

return (

    <>

        <Model pos={[0, 10 - 0.15/2, 0]} />

        <Model pos={[-5, 10 - 0.15/2, 0]} />

        <mesh receiveShadow={true}
            ref={floorRef}
            position={floorPos}
            rotation-x={ - Math.PI /2 }
            onPointerDown={(e) => {props.clicked(e,{name:"floor"});}}>
            <planeGeometry args={[floor.width,floor.height]}/>
            <meshStandardMaterial color="#aaaaaa" side={DoubleSide} map={texture}/>
        </mesh>

        <mesh
            position={ceilingPos}
            rotation-x={ - Math.PI /2 }
            onPointerDown={(e) => {props.clicked(e,{name:"ceiling"});e.stopPropagation()}}>
            <planeGeometry args={[ceiling.width,ceiling.height]}/>
            <meshStandardMaterial color="#ffffff" side={DoubleSide}/>
        </mesh>

        <mesh
            position={backWallPos}
            onPointerDown={(e) => {props.clicked(e,{name:"back"});e.stopPropagation()}}>
            <planeGeometry args={[backWall.width,backWall.height]}/>
            <meshStandardMaterial color="#cccccc" map={bwtexture} side={DoubleSide} />
        </mesh>

        <mesh
            position={leftWallPos}
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
            position={rightWallPos}
            rotation-y={Math.PI/2}
            onPointerDown={(e) => {props.clicked(e,{name:"right"});e.stopPropagation()}}>
            <planeGeometry args={[rightWall.width,rightWall.height]}/>
            <meshStandardMaterial color="#aaaaaa" map={bwtexture}  side={DoubleSide} />
        </mesh>
    </>

        )
}

export default Store;