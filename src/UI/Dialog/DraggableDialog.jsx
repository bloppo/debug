import React, {useEffect, useRef, useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Draggable from "react-draggable";

const DraggableDialog = (props) => {

    return (
        <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
            <Dialog.Overlay style={{background: 'rgba(10, 10, 10, 0.7)', position: 'fixed', inset: 0, zIndex: 0}}/>
            <Draggable nodeRef={props.nodeRef} handle={`#${props.id}`} bounds="parent">
                <Dialog.Content ref={props.nodeRef} id={props.id} style = {{
                    position:'fixed',
                    zIndex:10,
                    padding:'10px',
                    border:'4px solid black',
                    top:"200px",
                    left:"200px",
                    backgroundColor:"white",
                    color:"black",
                    maxWidth:"450px",
                    width:"300px"}}>
                    {props.children}
                </Dialog.Content>
            </Draggable>
        </Dialog.Root>

            )
}

export default DraggableDialog;
