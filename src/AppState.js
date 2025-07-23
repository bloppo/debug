
import {create} from 'zustand';

import {immer} from 'zustand/middleware/immer'
import {produce} from "immer";

/*
                state.milk.position = state.milk.position.map((value, index) =>
                ndx === index ? item : value);

 */

const useAppState = create(immer((set,get) => (
    {

        count: 0,

        inc: () => set((state) => ({
            count: state.count + 1
        })),

        dec: () => set((state) => ({
            count: state.count - 1
        })),

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
            }

        },

        contextMenu: {

            title: "Actions",

            menuItems: [],

            setTitle: (title) => set((state) => {state.contextMenu.title = title}),

            setMenuItems: (items) => set((state) =>  {state.contextMenu.menuItems = [...items]}),

        },

        selectShelf:{
            fixtureNdx:null,
            shelfNdx:null,
            position:null,
            updateSelectedShelf: (fixtureNdx, shelfNdx) => set((state) => {
                state.selectShelf.fixtureNdx = fixtureNdx;
                state.selectShelf.shelfNdx = shelfNdx;
            }),
            updateShelfPosition: (pos) => set((state) => {
                state.selectShelf.position = pos;
            })
        },

        milk : {

            position : [
                [-1, 0.125, 4.5],
                [-0.25, 0.125, 4.5],
                [0.5, 0.125, 4.5]
            ],

            addMilkPosition: (pos) => set(state => {state.milk.position.push(pos)}),
            updateMilkPosition: (ndx,pos) =>  set(state => {

                const newPos = state.milk.position.map((item, i) => (
                    i === ndx ? pos : Array.from(item)
                ))

                state.milk.position = Array.from(newPos);

                }

            )
        }

    }

    )))

export default useAppState;
