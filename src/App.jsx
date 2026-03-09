import { useState, useEffect } from 'react'
import Formulario from './Formulario'
import Color from './Color'
import ModalEditar from './ModalEditar'
import Login from './Login'

function App() {

  let [colores,setColores] = useState([]) //primero se carga vacio
  const [token, setToken] = useState(localStorage.getItem("token"))

  useEffect(() => { 
    if (token){
    fetch("https://api-colores-dlta.onrender.com/colores",{
      headers:{"Authorization": `Bearer ${token}`}
      
    })
    .then(respuesta => respuesta.json())
    .then(colores => {
      setColores(colores)//estos colores no son los de arriba, despues de que cargue todo, rellenamos con los colores. En cuanto llamas a setColores, React se entera de que hay datos nuevos y vuelve a pintar el componente, esta vez mostrando la lista de colores real.
    })
    }
  },[token])
  
  // Si no hay token, mostramos el Login
  if (!token) {
    return <Login setToken={setToken} />}

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
        <button onClick={() => { localStorage.removeItem("token"); setToken(null); }}>Cerrar Sesión</button>
        <Formulario crearColor={crearColor} token={token}/>
        <ul>
          {
            colores.map(({_id,r,g,b}) => <Color key={_id} id={_id} r={r} g={g} b={b} borrarColor={borrarColor} actualizarColor={actualizarColor} token={token}/>)
          }
        </ul>
        </>
}

export default App
