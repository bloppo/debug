import React, {memo, useEffect, useSyncExternalStore} from 'react';

import {useState} from "react";
import {useGlobal} from "../../Provider/GlobalProvider.jsx";
import useAppState from "../../AppState.js";

import Milk from "../Product/Milk.jsx";

const Shelf = ({
                   dimensions,
                   shelfNdx,
                   fixtureNdx,
                   shelf,
                   deg,
                   color,
                   thisRef,
               clicked}) => {

    const [aColor, setAColor] = useState(color)

    const toRad = 0; //Math.PI / 180

    const shelfWidth =  dimensions.width - dimensions.thickness

    const shelfX = (dimensions.thickness + shelfWidth)/2
    const shelfY = (dimensions.height - dimensions.thickness)/2

    const ug = useGlobal()

    const highlite =  true; //ug.movingObj

    //const fixtureNdx = useAppState((state) => state.selectShelf.fixtureNdx);
    //const shelfNdx = useAppState((state) => state.selectShelf.shelfNdx);
    const updateSelectedShelf = useAppState((state) => state.updateSelectedShelf);
    const updateShelfPosition  = useAppState((state) => state.updateShelfPosition);

    const selectedProduct = useAppState((state) => state.selectedProduct);
    const selectedTarget = useAppState((state) => state.selectedTarget);

    const selectProduct = useAppState((state) => state.selectProduct);
    const selectTarget = useAppState((state) => state.selectTarget);

    const moveProduct = useAppState((state) => state.moveProduct);
    const arrangeProducts = useAppState((state) => state.arrangeProducts);

    const clearSelectedProduct = useAppState((state) =>state.clearSelectedProduct);
    const clearSelectedTarget = useAppState((state) => state.clearSelectedTarget);

    const setProductOutline = useAppState((state) => state.setProductOutline);

    const handleMouseOver = (e) => {
        setAColor("#000000")
        e.stopPropagation()
        updateSelectedShelf(fixtureNdx, shelfNdx)
        updateShelfPosition(thisRef.current.position)
    }

    const handleMouseOut = (e) => {
        setAColor(color)
        e.stopPropagation()
        updateSelectedShelf(null,null)
        updateShelfPosition(null)
    }


    const moveProductToShelf = (e) => {
        if(e.button === 0 && selectedProduct !== null) {
            console.log(fp)
            clicked(e, {name: "Shelf", fixture: fixtureNdx, shelf: shelfNdx});
            setProductOutline(false)
            selectTarget({fixtureNdx, shelfNdx})
            moveProduct()
            arrangeProducts(selectedProduct.fixtureNdx,selectedProduct.shelfNdx,shelfWidth)
            clearSelectedProduct()
            arrangeProducts(fixtureNdx,shelfNdx,shelfWidth)
            console.log(selectedProduct)
        }
    }

    const productsOnShelf = useAppState(state => state.productsOnShelf);

    const fp = productsOnShelf(fixtureNdx,shelfNdx);

    //console.log(fixtureNdx, shelfNdx, fp)

    return (

        <group ref={thisRef}
            castShadow={true}
            receiveShadow={true}
            position={[shelfX, shelfY - shelf*dimensions.thickness , 0]}
            onPointerOver = {(e) => {highlite && handleMouseOver(e);}}
            onPointerDown = {(e) => {moveProductToShelf(e); e.stopPropagation()}}
            onPointerOut = {(e) => {highlite && handleMouseOut(e);}}
        >
            <mesh>
                <boxGeometry args={[shelfWidth, dimensions.thickness, dimensions.depth]}/>
                <meshStandardMaterial color={aColor}/>
            </mesh>

            {fp && fp.map((item, ndx) => (
                <Milk key={ndx}
                      ndx={item.ndx}
                      isOutline={item.isOutline}
                      position={item.position}
                      color={item.color}
                      size={item.size}
                      type={item.type}
                      fixtureNdx={item.fixtureNdx}
                      shelfNdx={item.shelfNdx}
                />
            ))}

        </group>
    )
}

export default memo(Shelf);
