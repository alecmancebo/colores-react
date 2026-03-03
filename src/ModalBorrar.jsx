function ModalBorrar({id,borrarColor,setBorrando}){
    return <div className="modal-borrar modal-visible">
                <div className="modal">
                    <button onClick={ () => {

                        return fetch(`https://api-colores-dlta.onrender.com/borrar/${id}`, {
                                method: "DELETE",
                            })
                            .then( ({status}) => { //nos llegará el id del back o error si no existe en el back
                                if(status == 204){
                                    return borrarColor(id)
                                }
                                console.log("...error, aqui se informaría del error")

                                //aqui: En las operaciones de borrado (DELETE), lo normal es que el servidor responda con un código de éxito pero sin contenido en el cuerpo. Si el servidor no envía texto ni JSON, intentar ejecutar .json() daría un error porque no hay nada que transformar.
                                //Los headers (como "Content-type": "application/json") le sirven al servidor para saber qué tipo de datos le estás enviando en el body
                                //El objeto que recibe el .then es la respuesta completa del navegador (la Response). status es el código numérico HTTP que devuelve el servidor. Código 204: Significa "No Content". Es el estándar para decir: "Hecho, lo he borrado con éxito y no tengo nada más que decirte". Al usar if(status == 204), estás condicionando que tu función de React (borrarColor(id)) solo se ejecute si la API externa confirma que el borrado fue exitoso en la base de datos.
                            })
                    } }>borrar</button>
                
                    <button onClick={ () => setBorrando(false) }>cancelar</button>
                </div>
            </div>
}

export default ModalBorrar 