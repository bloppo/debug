import React from 'react';

import {createContext, useContext, useRef, useState} from 'react'

const GlobalContext = createContext(null)

export const GlobalProvider  = ({ children }) => {

    const [movingObj, setMovingObj] = useState(false)

    const [added, setAdded] = useState(false)

    return (
        <GlobalContext.Provider value={
            {movingObj,
             setMovingObj
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobal() {
    return useContext(GlobalContext)
}