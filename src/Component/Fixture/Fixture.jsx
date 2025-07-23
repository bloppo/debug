
import {useEffect, useRef, useState} from "react";
import VerticalSide from "./VerticalSide.jsx";
import BackSide from "./BackSide.jsx";
import BottomSide from "./BottomSide.jsx";
import Shelf from "./Shelf.jsx";

import useAppState from "../../AppState.js";

const Fixture = (params) => {

    const menuItems = [
        { label: `Add Item ${params.ndx}` , action: () => alert('Add Item') },
    ]


    const contextMenu = useAppState((state) => state.contextMenu);

    const menuTitle = contextMenu.title;
    const setMenuTitle = contextMenu.setTitle //useAppState((state) => state.setTitle);
    const setMenuItems =  contextMenu.setMenuItems //useAppState((state) => state.setMenuItems);

    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const centerRef = useRef(null);
    const backRef = useRef(null);
    const bottomRef = useRef(null);

    const dimensions = {

        depth:0.75,
        thickness:0.025,
        height:params.height,
        width:params.width

    }

    const color = "#888888";

    const backColor = "#ffffff"

    const shelfs = [];

    const numShelfs = dimensions.height / (20 * dimensions.thickness);

    for(let i= 0; i < numShelfs; i++) {
        shelfs.push(i * 20 + 2)
    }

    const clicked = (e,obj) => {
        if(e.ctrlKey) {
            if (obj.name === "Shelf") {
                //console.log(obj);
                params.setEnabled(params.ndx)
            } else {
                //console.log("Clicked on", obj.name);
                params.setEnabled(params.ndx)
            }
        } else {
            //console.log(obj);
        }
    }

    const updateContextMenuTitle = () => {
        setMenuTitle("Fixture " + params.ndx)
        setMenuItems(menuItems)
    }

    return (
        <>

            <group castShadow={true} receiveShadow={true}
                position={params.position}
                rotation={params.rotation}
                ref={params.ref}
                onContextMenu={(e) => {e.stopPropagation();updateContextMenuTitle()}}
            >

                <VerticalSide
                    x={0}
                    dimensions={dimensions}
                    color={color}
                    thisRef={leftRef}
                    clicked={clicked}
                />

                <VerticalSide
                    x={params.width}
                    dimensions={dimensions}
                    color={color}
                    thisRef={rightRef}
                    clicked={clicked}
                />

                <BackSide
                    dimensions={dimensions}
                    color={backColor}
                    thisRef={backRef}
                    clicked={clicked}
                />


                <BottomSide
                    dimensions={dimensions}
                    color={"#555555"}
                    thisRef={bottomRef}
                    clicked={clicked}
                />


                {shelfs.map((shelf, index) => (
                    <Shelf key={index}
                           index={index}
                           fixtureIndex={params.ndx}
                           dimensions={dimensions}
                           shelf={shelf}
                           deg = {5}
                           color={"#555555"}
                           thisRef={centerRef}
                           clicked={clicked}
                    />
                ))}

            </group>

        </>
    )
}

export default Fixture;
