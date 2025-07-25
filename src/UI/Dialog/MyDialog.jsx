
import React, {useEffect, useRef, useState} from 'react';
import {useLilGui} from '../../Provider/LilGuiProvider.jsx'
import * as Dialog from '@radix-ui/react-dialog';
import {Button, Flex, TextField, Text} from "@radix-ui/themes";

import DraggableDialog from "./DraggableDialog.jsx";

import useAppState from "../../AppState.js";

const MyDialog = () => {

    const {count, inc, dec} = useAppState();

    const gui = useLilGui();

    const [open, setOpen] = useState(true);

    const nodeRef = useRef(null);

    const id = 'dialogContent'

    const params = {test: () => {console.log('test');setOpen(true);gui.close()}}

    useEffect(() => {

        gui.add(params,'test').name('Show Dialog')

    },[])

    return (

<DraggableDialog open={open} onOpenChange={setOpen} nodeRef={nodeRef} id={'bigid'}>
    <Dialog.Title style={{
        backgroundColor:'#000000',
        color:'white',
        padding:3,
        margin:0,
        }}>Test Dialog</Dialog.Title>
    <Dialog.Description size="2" mb="4">
        Test HTML {count}
    </Dialog.Description>
    <Dialog.Close asChild>
        <Button onClick={inc} style={{padding:'5px', margin:'5px', border:'2px solid red'}}>Close</Button>
    </Dialog.Close>
</DraggableDialog>

)

}

export default MyDialog;

//export default TestDialog