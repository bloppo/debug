import {Box3, Vector3, DoubleSide, CameraHelper} from 'three'

import {CameraControls, OrbitControls, PerspectiveCamera, useHelper} from '@react-three/drei'

import { Perf } from 'r3f-perf'

import {useEffect, useRef, useState} from "react";

//import {CameraHelper} from "three";

import {useGlobal} from "./Provider/GlobalProvider.jsx";

import { useLilGui } from './Provider/LilGuiProvider.jsx'

import { TransformControls } from "@react-three/drei"

import Fixture from './Component/Fixture/Fixture.jsx'

import Store from "./Component/Store/Store.jsx";

import Milk from "./Component/Product/Milk.jsx";

import useAppState from "./AppState.js";

const builder = [{
    camera:{
        fov : 50,
        near : 0.1,
        far :  300,
        position : {x:1, y:4, z:9}

    },

    light: {
        position: [1, 8, 3],
        intensity: 0.3,
        shadowCamera: {
            near: 1,
            far: 20,
            left: -9,
            right: 9,
            top: 9,
            bottom: -9
        },
    },
fixture:{
        color: '#888888',
        backColor: '#ffffff',
        dimensions: {
            depth:0.75,
            thickness:0.025,
        }
    },
    fixtures: [
        {
            height:3,
            width:2,
            position: [0, 1.5, -1],
            rotation: [0, 0, 0]
        },
        {
            height:3,
            width:4,
            position: [-6.5 , 1.5, 1.5],
            rotation: [0, Math.PI / 2, 0]
        },
        {
            height:2,
            width:3,
            position: [-6, 1, 3],
            rotation: [0, 0, 0]
        },
        {
            height:2,
            width:2,
            position: [5, 1, 1],
            rotation: [0, 0, 0]
        }
    ]
}]

export default function Exp2() {

    const myParams = {
        mode: 'translate'
    }

    const modeOptions = ['translate','rotate','scale']

    const [enabled, setEnabled] = useState(false);

    const myParamsRef = useRef(myParams);

    const fRef = useRef([null,null]);

    const [selNdx, setSelNdx] = useState(0);

    const [selRef, setSelRef] = useState(0);

    const camRef = useRef(null);

    const lightRef = useRef(null);

    const transformRef = useRef(null);

    //const ch = useHelper(camRef, CameraHelper)

    const gui = useLilGui(); //new GUI({width: 300})

    const ug = useGlobal();

    const storeDimensions = useAppState((state)    => state.storeDimensions);

    const enabledRef = useRef(enabled);

    const clicked = (ndx) => {

        setSelRef(ndx);

        if (ndx === selNdx) {
            ug.setMovingObj(!enabled)
            setEnabled(!enabled);
        } else
        {
            ug.setMovingObj(true)
            setEnabled(true);
            setSelNdx (ndx);
        }

    }

    const storeClicked = (e, obj) => {
        if(enabled && e.ctrlKey) {
            setEnabled(false);
            ug.setMovingObj(false)
        }
    }

        const handler = (event) => {
            if (event.key === 'Escape') {
                setEnabled(false);
                ug.setMovingObj(false)
            }
        };

    const calcSize = (b,rotY) => {

        const rotated = rotY !== 0 ;

        if(rotated) {

            return{
                h: b.max.y - b.min.y,
                w: b.max.x - b.min.x,
                d: b.max.z - b.min.z
            }

        } else {

            return{
                h: b.max.y - b.min.y,
                w: b.max.x - b.min.x,
                d: b.max.z - b.min.z
            }

        }
    }

    const calcMinMax = (h,w,d,rotY) => {
        const yh = storeDimensions.back.height;
        const xw = storeDimensions.back.width ;
        const zw = storeDimensions.left.width;

        const rotated = rotY !== 0 ;

        let xMin,xMax,zMin,zMax

        if(rotated) {
            xMin = - xw/2
            xMax = xw/2 - w

            zMin = (- zw + d)/2
            zMax =  (zw - d)/2
        } else {
            xMin = - xw/2
            xMax = xw/2 - w

            zMin = (- zw + d)/2
            zMax =  (zw - d)/2
        }

        return {
            yMin: h / 2,
            yMax: yh - h / 2,
            xMin: xMin ,
            xMax: xMax,
            zMin: zMin,
            zMax: zMax
        }
    }

    const handleObjectMove = () => {

        if(!enabledRef.current || !fRef.current[selRef]) return;

        const b = new Box3().setFromObject(fRef.current[selRef]);

        if(transformRef &&

            transformRef.current &&

            transformRef.current.object) {

            const obj = transformRef.current.object

            const {h,w,d} = calcSize(b,obj.rotation.y)

            //console.log(h,w,d)

            const {
                yMin,
                yMax,
                xMin,
                xMax,
                zMin,
                zMax} = calcMinMax(h,w,d,obj.rotation.y)

            const min = new Vector3(xMin, yMin, zMin);

            const max = new Vector3(xMax, yMax, zMax);

            obj.position.clamp(min,max)
        }
    }

    useEffect(() => {

        enabledRef.current = enabled;

    }, [enabled]);

    useEffect(() => {

        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler)
    }

    },[])

    const addCameraToGui = (cam) => {

        const cam2 = cam.addFolder("Settings")

        cam2.close()

        cam2.add(camRef.current, 'fov').onChange((v) => {

            camRef.current.fov = v;

            camRef.current.updateProjectionMatrix();

            console.log(camRef)

        })

        cam2.add(camRef.current, 'near').onChange((v) => {

            camRef.current.near = v;

            camRef.current.updateProjectionMatrix();

        })

        cam2.add(camRef.current, 'far').onChange((v) => {

            camRef.current.far = v;

            camRef.current.updateProjectionMatrix();

        })

        const cam3 = cam2.addFolder("Position")

        cam3.close()

        cam3.add(camRef.current.position, 'x').min(-10).max(10).step(0.01).name('X')
        cam3.add(camRef.current.position, 'y').min(-10).max(10).step(0.01).name('Y')
        cam3.add(camRef.current.position, 'z').min(-10).max(10).step(0.01).name('Z')

    }

    const addLightToGui = (gui) => {

        const light = gui.addFolder("Light")

        light.close()

        light.add(lightRef.current.position,'x').min(-10).max(10).step(0.01).name('X')
        light.add(lightRef.current.position,'y').min(-10).max(10).step(0.01).name('Y')
        light.add(lightRef.current.position,'z').min(-10).max(10).step(0.01).name('z')
        light.add(lightRef.current,'intensity').min(0.1).max(3).step(0.001).name('Intensity')

        const shadowCam = light.addFolder("Shadow Camera")
        shadowCam.close()
        shadowCam.add(lightRef.current.shadow.camera, 'near').min(0.1).max(10).step(0.01).name('Near')
        shadowCam.add(lightRef.current.shadow.camera, 'far').min(10).max(100).step(0.01).name('Far')
        shadowCam.add(lightRef.current.shadow.camera, 'left').min(-20).max(20).step(0.01).name('Left')
        shadowCam.add(lightRef.current.shadow.camera, 'right').min(-20).max(20).step(0.01).name('Right')
        shadowCam.add(lightRef.current.shadow.camera, 'top').min(-20).max(20).step(0.01).name('Top')
        shadowCam.add(lightRef.current.shadow.camera, 'bottom').min(-20).max(20).step(0.01).name('Bottom')

    }

    useEffect(() => {

            gui.close()

            const tcontrols = gui.addFolder("Transform Controls")

            tcontrols.close()

            tcontrols.add(myParamsRef.current, 'mode', modeOptions)
                .name('Mode')
                .onChange((v) => {
                    if(transformRef.current) {
                        transformRef.current.setMode(v);
                    }
                })

            const cam = gui.addFolder("Camera")

            cam.close()

            addCameraToGui(cam)

            addLightToGui(gui)

            return () => {
                //gui.destroy();
            }

    },[])

    const gridVisible= false;
    const perfVisible= false;

//    const milk = useAppState(state => state.milk);
    const milkPositions = useAppState(state => state.milk.position);

    return <>

        <PerspectiveCamera
            makeDefault
            ref={ camRef }
            fov = {builder[0].camera.fov}
            near = {builder[0].camera.near}
            far = {builder[0].camera.far}
            position-x = {builder[0].camera.position.x}
            position-y = {builder[0].camera.position.y}
            position-z = {builder[0].camera.position.z}
        />

        {perfVisible && <Perf position="top-left" />}

        <OrbitControls makeDefault/>

        <gridHelper visible = {gridVisible} />

        <hemisphereLight color={"#ffffff"} intensity={ 1.5 }/>

        {<directionalLight
            ref={lightRef}
            shadow-camera-near={builder[0].light.shadowCamera.near}
            shadow-camera-far={builder[0].light.shadowCamera.far}
            shadow-camera-left={builder[0].light.shadowCamera.left}
            shadow-camera-right={builder[0].light.shadowCamera.right}
            shadow-camera-top={builder[0].light.shadowCamera.top}
            shadow-camera-bottom={builder[0].light.shadowCamera.bottom}
            castShadow={true}
            position={ builder[0].light.position }
            intensity={ builder[0].light.intensity }
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}/>}

        {/*<ambientLight color={"#00aaff"} intensity={ 0.5 } />*/}

        <Store clicked={storeClicked}/>

        {builder[0].fixtures.map((e,i) => (
            <Fixture key={i}
                     ndx={i}
                     ref={(e1) => (fRef.current[i] = e1)}
                     setEnabled={clicked}
                     height={e.height}
                     width={e.width}
                     position={e.position}
                     rotation={e.rotation}/>
        ))}

        {milkPositions.map((pos, i) => (
            <Milk key={i} ndx={i} />
        ))}

        { enabled && myParamsRef.current.mode && fRef.current && fRef.current[selRef] && (
            <TransformControls
                onChange={() => {handleObjectMove()}}
                ref={transformRef}
                object ={fRef.current[selRef]}
                mode={myParamsRef.current.mode} />
        ) }

    </>

}
