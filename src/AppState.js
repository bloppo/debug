
import {create} from 'zustand';
import {persist, createJSONStorage } from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer'
import {getProductIndex,getProductIndex2,arrangeOnShelf} from './AppStateHelpers/products.js'

/*
{id:0,type:'Milk',fixtureNdx:0, shelfNdx:3, position:[-0.575,0.125+0.001,0.25]},
{id:1,type:'Milk',fixtureNdx:2, shelfNdx:3, position:[-0.125,0.125+0.001,0.25]},
{id:2,type:'Milk',fixtureNdx:3, shelfNdx:2, position:[-0.125,0.125+0.001,0.25]},
 */

const useAppState = create(

        persist(
            immer((set,get) => (
                {

                    count: 0,

                    inc: () => set((state) => ({
                        count: state.count + 1
                    })),

                    dec: () => set((state) => ({
                        count: state.count - 1
                    })),

//region Store dimensions ********************************************
                    storeDimensions: {
                        floor: {
                            width: 15,
                            height: 10
                        },
                        ceiling: {
                            width: 15,
                            height: 10
                        },
                        back: {
                            width: 15,
                            height: 10
                        },
                        left: {
                            width: 10,
                            height: 10
                        },
                        right: {
                            width: 10,
                            height: 10
                        },

                    },

                    floorPosition: () => [0, 0, 0],
                    ceilingPosition: () => [0, 10, 0],
                    backWallPosition: () => {
                        //= [0, backWallH / 2, - floorH / 2]
                        const sd = get().storeDimensions;
                        const backHeight = sd.back.height;
                        const floorHeight = sd.floor.height;
                        return [0, backHeight / 2, -floorHeight / 2]
                    },
                    leftWallPosition: () => {
                        //[- floorW / 2, leftWallH / 2, 0]
                        const sd = get().storeDimensions;
                        const leftHeight = sd.left.height;
                        const floorWidth = sd.floor.width;
                        return [-floorWidth / 2, leftHeight / 2, 0]
                    },
                    rightWallPosition: () => {
                        //[floorW / 2, rightWallH / 2, 0]
                        const sd = get().storeDimensions;
                        const rightHeight = sd.right.height;
                        const floorWidth = sd.floor.width;
                        return [floorWidth / 2, rightHeight / 2, 0]
                    },
//endregion

//region Context Menu ********************************************

                    contextMenu: {

                        title: "Actions",

                        menuItems: [],
                    },

                    setTitle: (title) => set((state) => {
                        state.contextMenu.title = title
                    }),

                    setMenuItems: (items) => set((state) => {
                        state.contextMenu.menuItems = [...items]
                    }),

//endregion

//region Fixture ********************************************

                    fixture: {
                        color: '#888888',
                        backColor: '#ffffff',
                        dimensions: {
                            depth: 0.75,
                            thickness: 0.025,
                        }
                    },

                    fixtures: [

                        {
                            height: 3,
                            width: 2,
                            position: [0, 1.5, -1],
                            rotation: [0, 0, 0]
                        },
                        {
                            height: 3,
                            width: 4,
                            position: [-6.5, 1.5, 1.5],
                            rotation: [0, Math.PI / 2, 0]
                        },
                        {
                            height: 2,
                            width: 3,
                            position: [-6, 1, 3],
                            rotation: [0, 0, 0]
                        },
                        {
                            height: 2,
                            width: 2,
                            position: [5, 1, 1],
                            rotation: [0, 0, 0]
                        }
                    ],

                    addFixture: (fixture) => set((state) => {
                        state.fixtures.push(fixture);
                    }),
                    removeFixture: (ndx) => set((state) => {
                        state.fixtures = state.fixtures.filter((_, index) => index !== ndx);
                    }),
                    updateFixture: (ndx, fixture) => set((state) => {
                        state.fixtures = state.fixtures.map((item, index) =>
                            index === ndx ? fixture : item
                        );
                    }),

                    updateFixturePosition: (ndx, pos) => set((state) => {
                        state.fixtures = state.fixtures.map((item, index) =>
                            index === ndx ? {...item, position: pos} : item
                        );
                    }),

                    selectShelf: {
                        fixtureNdx: null,
                        shelfNdx: null,
                        position: null,
                    },

                    updateSelectedShelf: (fixtureNdx, shelfNdx) => set((state) => {
                        state.selectShelf.fixtureNdx = fixtureNdx;
                        state.selectShelf.shelfNdx = shelfNdx;
                    }),

                    updateShelfPosition: (pos) => set((state) => {
                        state.selectShelf.position = pos;
                    }),
//endregion

//region Products ********************************************

                    products:[],

                    addProduct: (prod,fixtureNdx,shelfNdx) => set(state => {

                        const width = state.fixtures[fixtureNdx].width

                        state.products.push(prod)

                        //products on shelf
                        const fp  = state.products.filter(item => item.fixtureNdx===fixtureNdx &&
                                                                  item.shelfNdx===shelfNdx)

                        arrangeOnShelf(state.products,fp,fixtureNdx,shelfNdx,width)

                    }),

                    removeProduct: (fixtureNdx, shelfNdx, itemNdx) => set(state => {

                        const width = state.fixtures[fixtureNdx].width

                        state.products = state.products.filter(item => ! (item.fixtureNdx === fixtureNdx &&
                                                                          item.shelfNdx === shelfNdx &&
                                                                          item.ndx === itemNdx))

                        const fp  = state.products.filter(item => item.fixtureNdx===fixtureNdx &&
                                                                  item.shelfNdx===shelfNdx)

                        arrangeOnShelf(state.products,fp,fixtureNdx,shelfNdx,width)

                    }),

                    arrangeProducts: (fixtureNdx, shelfNdx, width) => set(state => {

                        const fp  = state.products.filter(item => item.fixtureNdx===fixtureNdx &&
                            item.shelfNdx===shelfNdx)

                        arrangeOnShelf(state.products,fp,fixtureNdx,shelfNdx,width)

                    }),

                    moveProduct: () => set(state => {

                        const target = get().selectedTarget;

                        const idx = getProductIndex(get)

                        state.products[idx].fixtureNdx = target.fixtureNdx;
                        state.products[idx].shelfNdx = target.shelfNdx;

                    }),

                    selectedProduct:null,  //{fixtureNdx:null, shelfNdx:null, ndx:null},
                    selectedTarget:null,  //{fixtureNdx:null, shelfNdx:null, ndx:null},

                    selectProduct: (prod) => set(state => {
                        state.selectedProduct = prod;
                    }),

                    selectTarget: (prod) => set(state => {
                        state.selectedTarget = prod;
                    }),

                    clearSelectedProduct: () => set(state => {
                        state.selectedProduct = null;
                        // state.selectedProduct.fixtureNdx = null;
                        // state.selectedProduct.shelfNdx = null;
                        // state.selectedProduct.ndx = null;
                    }),
                    clearSelectedTarget: () => set(state => {
                        state.selectedTarget = null;
                        // state.selectedTarget.fixtureNdx = null;
                        // state.selectedTarget.shelfNdx = null;
                        // state.selectedTarget.ndx = null;
                    }),

                    productOutline : false,

                    setProductOutline: (val) => set(state => {

                        const idx = getProductIndex(get)

                        state.products[idx].isOutline = val;

                    }),

                    productsOnShelf: (f,s) => { return get().products.filter(item => item.fixtureNdx === f &&
                                                      item.shelfNdx === s)},

                    milk: {

                        position: [
                            [-1, 0.125, 4.5],
                            [-0.25, 0.125, 4.5],
                            [0.5, 0.125, 4.5]
                        ]
                    },

                    addMilkPosition: (pos) => set(state => {
                        state.milk.position.push(pos)
                    }),

                    updateMilkPosition: (ndx, pos) => set(state => {

                        const newPos = state.milk.position.map((item, i) => (
                            i === ndx ? pos : Array.from(item)
                        ))

                        state.milk.position = Array.from(newPos);


//        hasHydrated: false,

//        setHasHydrated: (val) => set(state => ({hasHydrated: val})),

                    }),

//endregion

                    _isHydrated: false,

                    setHasHydrated: (val) => set(state => ({_isHydrated: val})),
                }
        )),
            {
                skipHydration: false,
                name:'app-state',
                storage: createJSONStorage(() => localStorage),
                onRehydrateStorage: (state,storage) => {
                    return () => state.setHasHydrated(true);
                }
            }
     ),
)

const jsonData = {

    camera: {
        fov: 50,
        near: 0.1,
        far: 300,
        position: {x: 1, y: 4, z: 9}

    },

    light: {
        position: [1, 8, 3],
        intensity: 0.3,
        shadowCamera: {
            near: 1,
            far: 20,
            left: -9,
            right: 9,
            top: 9,
            bottom: -9
        },
    },
    fixture: {
        color: '#888888',
        backColor: '#ffffff',
        dimensions: {
            depth: 0.75,
            thickness: 0.025,
        }
    }
}

//const jsonData = {count:20}

//console.log(useAppState.getState())

useAppState.setState(state => ({ ...state, ...jsonData }));

console.log(useAppState.getState())

//console.log(localStorage.getItem('app-state'))

export default useAppState;
