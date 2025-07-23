import {useState} from "react";
import {useGlobal} from "../../Provider/GlobalProvider.jsx";
import useAppState from "../../AppState.js";

const Shelf = ({
                   dimensions,
                   index,
                   fixtureIndex,
                   shelf,
                   deg,
                   color,
                   thisRef,
               clicked}) => {

    const [aColor, setAColor] = useState(color)

    const toRad = 0; Math.PI / 180

    const shelfWidth =  dimensions.width - dimensions.thickness

    const shelfX = (dimensions.thickness + shelfWidth)/2
    const shelfY = (dimensions.height - dimensions.thickness)/2

    const ug = useGlobal()

    const highlite =  true; //ug.movingObj

    const fixtureNdx = useAppState((state) => state.selectShelf.fixtureNdx);
    const shelfNdx = useAppState((state) => state.selectShelf.shelfNdx);
    const updateSelectedShelf = useAppState((state) => state.selectShelf.updateSelectedShelf);
    const updateShelfPosition  = useAppState((state) => state.selectShelf.updateShelfPosition);

    const handleMouseOver = (e) => {
        setAColor("#000000")
        e.stopPropagation()
        updateSelectedShelf(fixtureIndex, index)
        updateShelfPosition(thisRef.current.position)
    }

    const handleMouseOut = (e) => {
        setAColor(color)
        e.stopPropagation()
        updateSelectedShelf(null,null)
        updateShelfPosition(null)
    }

    return (

        <mesh ref={thisRef}
                castShadow={true}
                receiveShadow={true}
              position={[shelfX, shelfY - shelf*dimensions.thickness , 0]}
              rotation-x={toRad * deg}
              onPointerOver = {(e) => {highlite && handleMouseOver(e);}}
              onPointerDown = {(e) => {clicked(e,{name:"Shelf",fixture:fixtureIndex,shelf:index}); e.stopPropagation()}}
              onPointerOut = {(e) => {highlite && handleMouseOut(e);}}
        >
            <boxGeometry args={[shelfWidth, dimensions.thickness, dimensions.depth]}/>
            <meshStandardMaterial color={aColor}/>
        </mesh>

    )
}

export default Shelf;
