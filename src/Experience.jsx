import {CameraControls, OrbitControls, PerspectiveCamera, useHelper} from '@react-three/drei'
import { useControls, button } from 'leva'
import { Perf } from 'r3f-perf'
import {useRef, useState} from "react";
import {CameraHelper} from "three";

export default function Experience({chVisible})
{

    const camRef = useRef();

    const ch = useHelper(camRef, CameraHelper)

if( ch && ch.current ){

    ch.current.visible = chVisible

    }

    const {
        fov,
        near,
        far} = useControls('camera', {
                fov: {folder: "Camera", value: 60, min: 1, max: 180, step: 1},
                near: {folder: "Camera",value: 0.1, min: 0.01, max: 10, step: 0.01},
                far: {folder: "Camera",value: 1000, min: 10, max: 2000, step: 1}
    })

    const { position, color, visible } = useControls({

        position:
        {
            value: 0, //{ x: - 2, y: 0 },
            //step: 0.01,
            //joystick: 'invertY',
            folder:'Sphere',
        },

        color: {value:'#ff0000',folder:'Sphere'},
        visible: {value:true,folder:'Sphere'},
/*
        myInterval:
        {
            folder:'Sphere',
            min: 0,
            max: 10,
            value: [4, 5],
        },
        clickMe: button(() => { console.log('ok') },{folder:'Sphere'}),
        choice: {options: [ 'a', 'b', 'c' ], value: 'b', folder: 'Sphere' }
        */
    })
/*
    const { scale } = useControls('cube', {
        scale:
        {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        }
    })

    const { perfVisible } = useControls('debug', {
        perfVisible: false
    })

    const { gridVisible } = useControls('grid', {
        gridVisible: {value: true, label: 'Grid Visible'}
    })
*/

const scale = 1
const gridVisible=false;
const perfVisible=false;

    /*
                camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ - 4, 3, 6 ]
            } }

    * */

    return <>

        <PerspectiveCamera
        ref={ camRef }
        fov = {60}
        near = {0.1}
        far = {1000}
        position = {[0, 0, 5 ]}
        />

        {perfVisible && <Perf position="top-left" />}

        <OrbitControls makeDefault />

        <gridHelper visible = {gridVisible} />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh visible={ visible } position={ [ position.x, position.y, 0 ] }>
            <sphereGeometry />
            <meshStandardMaterial color={ color } />
        </mesh>

        <mesh position-x={ 2 } scale={ scale }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}