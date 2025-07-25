import React from 'react';

import {useState} from "react";
import {useGlobal} from "../../Provider/GlobalProvider.jsx";
import Milk from "../Product/Milk.jsx";
import useAppState from "../../AppState.js";

//<Milk position={[-0.125,0.125+0.001,0.25]}/>

const BottomSide = ({dimensions,color,thisRef,fixtureNdx,clicked}) => {

    const bottomWidth = dimensions.width - dimensions.thickness
    const bottomX = (dimensions.thickness + bottomWidth)/2
    const bottomY = - (dimensions.height - dimensions.thickness - .1)/2

    const updateSelectedShelf = useAppState((state) => state.updateSelectedShelf);
    const updateShelfPosition  = useAppState((state) => state.updateShelfPosition);

    const [aColor, setAColor] = useState(color)

    const ug = useGlobal()

    const highlite = true; //ug.movingObj

    const handleMouseOver = (e) => {
        setAColor("#000000")
        e.stopPropagation()
        updateSelectedShelf(fixtureNdx, null)
        updateShelfPosition(thisRef.current.position)
    }

    const handleMouseOut = (e) => {
        setAColor(color)
        e.stopPropagation()
        updateSelectedShelf(null,null)
        updateShelfPosition(null)
    }

    const productsOnShelf = useAppState(state => state.productsOnShelf);

    const fp = productsOnShelf(fixtureNdx,null);

    return (
    <group
        onPointerOver = {(e) => {highlite && handleMouseOver(e);}}
        onPointerOut = {(e) => {highlite && handleMouseOut(e);}}
        onPointerDown = {(e) => {clicked(e,{name:"bottom"}); e.stopPropagation()}}
        position={[bottomX,bottomY,0]}>
        <mesh ref={thisRef}
              receiveShadow={true}
        >
            <boxGeometry args={[bottomWidth, dimensions.thickness, dimensions.depth]}/>
            <meshStandardMaterial color={aColor} wireframe={false}/>
        </mesh>

        {fp && fp.map((item, ndx) => (
            <Milk key={ndx}
                  ndx={ndx}
                  position={item.position}
                  color={item.color}
                  size={item.size}
                  fixtureNdx={item.fixtureNdx}
                  shelfNdx={null}
            />
        ))}

    </group>
    )
}

export default BottomSide;
