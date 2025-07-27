import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

import './ddstyle.css'

const DropdownMenuRoot = DropdownMenu.Root
const DropdownMenuTrigger = DropdownMenu.Trigger
const DropdownMenuContent = DropdownMenu.Content
const DropdownMenuItem = DropdownMenu.Item
const DropdownMenuSeparator = DropdownMenu.Separator

const MyDropdownMenu = ({ddmRef,
                            open,
                            handleOpenChange,
                            menuTitle,
                            menuItems}) => {

    return (
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

                    item.label === 'sep' ?
                        <DropdownMenuSeparator className="DropdownMenuSeparator" key={index} />
                        :
                        <DropdownMenuItem className="DropdownMenuItem" key={index} onSelect={item.action}>
                            {item.label}
                        </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenuRoot>

    )

}

export default MyDropdownMenu;
