import { useState } from "react"
import ModalBorrar from "./ModalBorrar"
import ModalEditar from "./ModalEditar"

function Color({id,r,g,b,borrarColor,actualizarColor}){

    let [borrando,setBorrando] = useState(false)
    let [editando,setEditando] = useState(false)


    return  <>
            <li style={ { backgroundColor : `rgb(${[r,g,b].join(",")})` } }>
                <span>{ r },{ g },{ b }</span>
                <button onClick={ () => setEditando(true) }>editar</button>
                <button onClick={ () => setBorrando(true) }>borrar</button>
            </li>
            { borrando ? <ModalBorrar id={id} borrarColor={borrarColor} setBorrando={setBorrando} /> : null }
            { editando ? <ModalEditar id={id} r={r} g={g} b={b} actualizarColor={actualizarColor} setEditando={setEditando} /> : null }
            </>
}

export default Color 