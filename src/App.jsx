import { useState, useEffect } from 'react'
import Formulario from './Formulario'
import Color from './Color'
import ModalEditar from './ModalEditar'

function App() {

  let [colores,setColores] = useState([]) //primero se carga vacio

  useEffect(() => { 
    fetch("https://api-colores-dlta.onrender.com/colores")
    .then(respuesta => respuesta.json())
    .then(colores => {
      setColores(colores)//estos colores no son los de arriba, despues de que cargue todo, rellenamos con los colores. En cuanto llamas a setColores, React se entera de que hay datos nuevos y vuelve a pintar el componente, esta vez mostrando la lista de colores real.
    })
  },[])

  function crearColor(color){
      setColores([...colores,color])
  }
  function borrarColor(id){
      setColores(colores.filter( color => color._id != id ))
  }
  function actualizarColor(id,objColor){
      setColores(colores.map( color => {
        if(color._id == id){
            objColor._id = id
            return objColor
        }
        return color
      }))
  }

  return <>
        <Formulario crearColor={crearColor} />
        <ul>
          {
            colores.map(({_id,r,g,b}) => <Color key={_id} id={_id} r={r} g={g} b={b} borrarColor={borrarColor} actualizarColor={actualizarColor} />)
          }
        </ul>
        </>
}

export default App
