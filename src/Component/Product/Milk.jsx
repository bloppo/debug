import React from 'react';

import {DoubleSide, Matrix4, Quaternion, Vector3} from "three";
import useAppState from "../../AppState.js";
import {DragControls, PivotControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";


const Milk = (props) => {

    const [orgPosition, setOrgPosition] = useState(props.position);

    const ref = useRef(null);
    const dragRef = useRef(null);

    const menuItems = [
        {label: 'Add Milk ', action: () => alert('Add Milk to shelf')},
    ]

    const contextMenu = useAppState((state) => state.contextMenu);
    const setMenuTitle = contextMenu.setTitle
    const setMenuItems = contextMenu.setMenuItems

    const fixtureNdx = useAppState((state) => state.selectShelf.fixtureNdx);
    const shelfNdx = useAppState((state) => state.selectShelf.shelfNdx);
    const shelfPosition = useAppState((state) => state.selectShelf.position);

    const milk = useAppState((state) => state.milk);
    const milkPosition = useAppState((state) => state.milk.position);

    const addMilkPosition = milk.addMilkPosition;
    const updateMilkPosition = milk.updateMilkPosition;

    const updateContextMenuTitle = () => {
        setMenuTitle("Milk")
        setMenuItems(menuItems)
    }

    const org = () => {

    }

    const getRnd = () => {
        return (Math.abs(Math.random()*2 - 1) * 3);
    }

    const orgRestore = () => {
        if(shelfPosition !== null) {
            updateMilkPosition(props.ndx, shelfPosition)
        }

        console.log(milkPosition)
        console.log(fixtureNdx,shelfNdx,shelfPosition)
    }

    const handleDrag = (local, delta, world) => {
        const position = new Vector3();
        const scale = new Vector3();
        const quaternion = new Quaternion();
        world.decompose(position, quaternion, scale);
        updateMilkPosition(props.ndx,position.clone());
/*
        const position = new Vector3();
        const quaternion = new Quaternion();
        const scale = new Vector3();
        e.decompose(position, quaternion, scale);
        const p = [
            orgPosition[0]+position.x,
            orgPosition[1]+position.y,
            orgPosition[2]+position.z,
        ]
        setDragPosition(p);
        ref.current.position.set(p[0],p[1],p[2])
        console.log(p)
*/

    }

    useEffect(() => {

        setOrgPosition(milkPosition[props.ndx]);

    },[])

    return (

        <DragControls ref={dragRef}
                autoTransform={true}
                onDrag={(local, delta, world) => {handleDrag(local, delta, world)}}
                onDragEnd={(e) => {orgRestore()}}
            >
                <mesh ref={ref} position={milkPosition[props.ndx]}
                        castShadow={true} receiveShadow={true}
                        onPointerDown={(e) => {}}
                        onContextMenu={(e) => {e.stopPropagation();updateContextMenuTitle();}}
                >
                    <boxGeometry args={[0.25,0.25,0.25]}/>
                    <meshStandardMaterial color="green" side={DoubleSide} />
                </mesh>
            </DragControls>
    )
}

export default Milk;