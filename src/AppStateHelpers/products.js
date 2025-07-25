import {useSyncExternalStore} from "react";
import useAppState from "../AppState.js";
import {shallow} from "zustand/shallow";

export const getProductIndex = (get) => {

    const fixtureNdx = get().selectedProduct.fixtureNdx;
    const shelfNdx = get().selectedProduct.shelfNdx;
    const ndx = get().selectedProduct.ndx;
    const target = get().selectedTarget;

    const idx = get().products.findIndex(item =>
        item.fixtureNdx === fixtureNdx &&
        item.shelfNdx === shelfNdx &&
        item.ndx === ndx);

return idx

}

export const getProductIndex2 = (products,f,s,ndx) => {

    return products.findIndex(item =>
        item.fixtureNdx === f &&
        item.shelfNdx === s &&
        item.ndx === ndx);

}

export const xStart = (fp,width) => {

    const w = 0.25

    // left start
    let xPos = - (width)/2 + w;

    for (let item of fp) {
        xPos += item.size[0] + 0.05;
    }

    return xPos

}

export const arrangeAcrossRow = (fp, width) => {

    const w = 0.25

    const pos = []

    // left start
    let xPos = - (width)/2 + w;

    pos.push(xPos)

    for (let item of fp) {

        xPos += (item.size[0] + 0.05);

        pos.push(xPos)

    }

    return pos

}

export const arrangeOnShelf = (allproducts,shelfproducts,fixtureNdx,shelfNdx,width) => {

    const pos = arrangeAcrossRow(shelfproducts,width)

    shelfproducts.forEach((item,i) => {
        const ndx = getProductIndex2(allproducts,fixtureNdx,shelfNdx,item.ndx)
        if(ndx >= 0) {
            allproducts[ndx].position[0] = pos[i];
        }
    })
}