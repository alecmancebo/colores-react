import { useState } from "react"

function ModalEditar({id,r,g,b,actualizarColor,setEditando, token}){

    let [inputR,setInputR] = useState(r)
    let [inputG,setInputG] = useState(g)
    let [inputB,setInputB] = useState(b)


    return <div className="modal-editar modal-visible">
                <div className="modal">
                    <div className="color" style={ { backgroundColor : `rgb(${[inputR,inputG,inputB].join(",")})` } }></div>
                    <input type="range" min="0" max="255" value={inputR} onChange={ evento => setInputR(Number(evento.target.value))} />
                    <input type="range" min="0" max="255" value={inputG} onChange={ evento => setInputG(Number(evento.target.value))} />
                    <input type="range" min="0" max="255" value={inputB} onChange={ evento => setInputB(Number(evento.target.value))} />
                    <button onClick={ () => {

                        if(
                            inputR != r || 
                            inputG != g ||
                            inputB != b
                        ){
                             [r,g,b] = [inputR,inputG,inputB]

                              return fetch(`https://api-colores-dlta.onrender.com/actualizar/${id}`, {
                                method: "PATCH",
                                body: JSON.stringify ({ r,g,b }),
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Content-type" : "application/json"
                                }
                                })
                                .then( ({status}) => { //nos llegará el id del back o error si no existe en el back
                                if(status == 204){
                                    actualizarColor(id,{r,g,b})
                                    return setEditando(false)
                                }
                                console.log("...error, aqui se informaría del error")

                            })
                        
                        }

                        setEditando(false)

                    } }>guardar</button>
                    <button onClick={ () => 
                        setEditando(false) }>cancelar</button>
                </div>
            </div>
}

export default ModalEditar 