import React from 'react';

import {StrictMode, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";

import './UI/ddstyle.css'

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import MyDialog from "./UI/Dialog/MyDialog.jsx";

import Exp2 from "./Exp2.jsx";

import AppProviders from "./AppProviders.jsx";

import useAppState from "./AppState.js";

const DropdownMenuRoot = DropdownMenu.Root
const DropdownMenuTrigger = DropdownMenu.Trigger
const DropdownMenuContent = DropdownMenu.Content
const DropdownMenuItem = DropdownMenu.Item

//className="DropdownMenu.Separator"
// style={{ zIndex: 2000, backgroundColor: '#ffffff', padding: '10px', borderRadius: '5px' }}

const App = () =>  {

    const [open, setOpen] = useState(false);

    const initialMenuItems = [
        { label: 'Add Item', action: () => alert('one') },
        { label: 'Add Item', action: () => alert('one') },
    ]

    const contextMenu = useAppState((state) => state.contextMenu);

    const menuTitle = contextMenu.title;
    const setMenuTitle = contextMenu.setTitle //useAppState((state) => state.setTitle);
    const setNewMenuItems =  contextMenu.setMenuItems //useAppState((state) => state.setMenuItems);

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
                width: "100vw",
                height: "100vh",
                margin: 0,
                padding: 0,
                overflow: "hidden" }}>
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
            <MyDialog />
        </AppProviders>
</StrictMode>
    )

}

export default App;
