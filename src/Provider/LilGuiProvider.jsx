import React from 'react';

import { createContext, useContext, useRef } from 'react'

import { GUI } from 'lil-gui'

const GuiContext = createContext(null)

export function LilGuiProvider({ children }) {
    const guiRef = useRef(null)
    if (!guiRef.current) guiRef.current = new GUI()
    return (
        <GuiContext.Provider value={guiRef.current}>
            {children}
        </GuiContext.Provider>
    )
}

export function useLilGui() {
    return useContext(GuiContext)
}
