import React from 'react';

import {DoubleSide, Matrix4, Quaternion, Vector3} from "three";
import useAppState from "../../AppState.js";
import {DragControls, Edges, PivotControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";


const Milk = (props) => {

    const [orgPosition, setOrgPosition] = useState(props.position);

    const removeTheProduct = useAppState((state) => state.removeProduct);

    const ref = useRef(null);
    const dragRef = useRef(null);

    const menuItems = [
        {label: 'Move', action: () => moveProduct()},
        {label: 'Remove', action: () => removeProduct()},
    ]

    const moveProduct = () => {
        selectProduct({
            fixtureNdx: props.fixtureNdx,
            shelfNdx: props.shelfNdx,
            ndx: props.ndx,
        });
        setProductOutline(true);
    }

    const removeProduct = () => {
        console.log(props.fixtureNdx, props.shelfNdx, props.ndx)
        removeTheProduct(fixtureNdx,shelfNdx,props.ndx)
    }

    const contextMenu = useAppState((state) => state.contextMenu);
    const setMenuTitle = useAppState((state) => state.setTitle)
    const setMenuItems = useAppState((state) => state.setMenuItems)

    const fixtureNdx = useAppState((state) => state.selectShelf.fixtureNdx);
    const shelfNdx = useAppState((state) => state.selectShelf.shelfNdx);
    const shelfPosition = useAppState((state) => state.selectShelf.position);

    const milk = useAppState((state) => state.milk);
    const milkPosition = useAppState((state) => state.milk.position);

    const addMilkPosition = milk.addMilkPosition;
    const updateMilkPosition = milk.updateMilkPosition;

    const selectedProduct = useAppState((state) => state.selectedProduct);
    const selectedTarget = useAppState((state) => state.selectedTarget);

    const selectProduct = useAppState((state) => state.selectProduct);
    const selectTarget = useAppState((state) => state.selectTarget);

    const clearSelectedProduct = useAppState((state) =>state.clearSelectedProduct);
    const clearSelectedTarget = useAppState((state) => state.clearSelectedTarget);

    const productOutline = useAppState((state) => state.productOutline);
    const setProductOutline = useAppState((state) => state.setProductOutline);

    const products = useAppState((state) => state.products);

    const updateContextMenuTitle = () => {
        setMenuTitle("Product")
        setMenuItems(menuItems)
    }

    const org = () => {

    }

    const getRnd = () => {
        return (Math.abs(Math.random()*2 - 1) * 3);
    }

    const cmpSelectedProduct = () => {
        return !!(selectedProduct && selectedProduct.fixtureNdx === props.fixtureNdx &&
            selectedProduct.shelfNdx === props.shelfNdx && selectedProduct.ndx === props.ndx);
    }

    const selected = (e) => {

        if(e.button === 0) {
            if (cmpSelectedProduct()) {
                setProductOutline(false);
                clearSelectedProduct();
             } //else {
            //     console.log(props.fixtureNdx, props.shelfNdx, props.ndx)
            // }
        }
    }

//onPointerDown={(e) => {selected(e); e.stopPropagation();}}

    return (
        <mesh ref={ref} position={props.position}
              castShadow={true} receiveShadow={true}
              onPointerDown={(e) => {selected(e); e.stopPropagation();}}
              onContextMenu={(e) => {e.stopPropagation();updateContextMenuTitle();}}
        >
            <boxGeometry args={props.size}/>
            <meshStandardMaterial color={props.color} opacity={0.5} transparent={true} side={DoubleSide} />
            <Edges
                visible={props.isOutline}
                color="#fff"        // Black outline
                scale={1.03}        // Slightly outside the sphere
                threshold={12}      // Shows edges above 12 degrees
                linewidth={2}
            />
        </mesh>
    )
}

export default Milk;