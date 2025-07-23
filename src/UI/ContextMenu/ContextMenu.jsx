

import * as ContextMenu from "@radix-ui/react-context-menu";
import {useState} from "react";

const WrapperContextMenu = ({children}) => {

    const [checked, setChecked] = useState(false);

    return (

            <ContextMenu.Root>
                <ContextMenu.Trigger asChild>
                    <div>Yipper</div>
                </ContextMenu.Trigger>
                {children}
            </ContextMenu.Root>

    )

}

export const MyContextMenu = () => {

    return (
        <WrapperContextMenu>
            <ContextMenu.Content size="2"
                                 style={{
                                     position:'relative',
                                     top:30,
                                     left:0,
                                     backgroundColor:'#aaaaaa'}}>
                <ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
                <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item shortcut="⌘ ⌫" color="red">Delete</ContextMenu.Item>
            </ContextMenu.Content>
        </WrapperContextMenu>
    )
}

export default WrapperContextMenu;
