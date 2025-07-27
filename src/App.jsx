import React from 'react';

import {StrictMode, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";

import {Loader} from "@react-three/drei";

import MyDialog from "./UI/Dialog/MyDialog.jsx";
import MyDropdownMenu from "./UI/ContextMenu/MyDropdownMenu.jsx";

import Exp2 from "./Exp2.jsx";

import AppProviders from "./AppProviders.jsx";

import useAppState from "./AppState.js";


/*
                <DropdownMenuRoot open={open} onOpenChange={handleOpenChange}>
                    <DropdownMenuTrigger asChild>
                        <button ref={ddmRef}
                            style={{ position: "absolute",
                                display:'none',
                                marginBottom:50,
                                top: 20,
                                left: 20,
                                zIndex: 1100 }}
                        >
                            {menuTitle}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="DropdownMenuContent">
                        {menuItems.map((item, index) => (
                        <DropdownMenuItem className="DropdownMenuItem" key={index} onSelect={item.action}>
                                {item.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenuRoot>
 */

const App = () =>  {

    const [open, setOpen] = useState(false);

    const initialMenuItems = [
        { label: 'Help', action: () => alert('Help') },
        { label: 'Add Fixture', action: () => addAFixture() },
    ]

    const contextMenu = useAppState((state) => state.contextMenu);

    const menuTitle = contextMenu.title;
    const setMenuTitle = useAppState((state) => state.setTitle);
    const setNewMenuItems =  useAppState((state) => state.setMenuItems);

    const tempItems = useAppState((state) => state.contextMenu.menuItems)

    if(tempItems.length === 0) {
        setNewMenuItems(initialMenuItems)
        console.log('initial menu')
    }

    const menuItems = useAppState((state) => state.contextMenu.menuItems)

    const ddmRef = useRef(null)

    const showContextMenu = (e) => {

        if(menuTitle === 'Actions'){
            setNewMenuItems(initialMenuItems)
        }

        ddmRef.current.style.display = 'block';
        ddmRef.current.style.top = e.clientY + 'px';
        ddmRef.current.style.left = e.clientX + 'px';

        try {
            setOpen(true);
        }catch(err) {

        }

    }

    const addFixture = useAppState((state) => state.addFixture);

    const addAFixture = () => {
        const fixture = {
            height: 3,
            width: 2,
            position: [0,1.5,0],
            rotation: [0,0,0]
        }
        addFixture(fixture)
    }

    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
        setMenuTitle("Actions")
        ddmRef.current.style.display = 'none'
    }

    return (
<StrictMode>
        <AppProviders>
            <div style={{
                position:'relative',
                backgroundColor: '#000000',
                width: "100vw",
                height: "100vh",
                margin: 0,
                padding: 0,
                overflow: "hidden" }}>

                <MyDropdownMenu ddmRef={ddmRef}
                                open={open}
                                handleOpenChange={handleOpenChange}
                                menuTitle={menuTitle}
                                menuItems={menuItems}/>

                <Canvas shadows={true} style={{
                    position:'absolute',
                    top:0,
                    left:0,
                    width: '100%',
                    height: '100%'}}
                onContextMenu={(e) => {e.preventDefault();showContextMenu(e);}}
                    >
                    <Exp2/>
                </Canvas>
            </div>
            <Loader />
            <MyDialog />
        </AppProviders>
</StrictMode>
    )

}

export default App;
