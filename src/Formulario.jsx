import { useState } from "react"

function Formulario({crearColor, token}){

    let [textoInput,setTextoInput] = useState("")
    let [error,setError] = useState(false)


    return <form onSubmit={ evento => {
                    evento.preventDefault()

                    setError(false)

                    if(/^([0-9]{1,3},){2}[0-9]{1,3}$/.test(textoInput)){
        
                        let rgb = textoInput.split(",").map(n => Number(n));

                        let valido = true;

                        let i = 0;

                        while(valido && i < rgb.length){
                            valido = rgb[i] <= 255;
                            i++;
                        }

                        if(valido){
                            let [r,g,b] = rgb;

                            return fetch("https://api-colores-dlta.onrender.com/nuevo", {
                                method: "POST",
                                body: JSON.stringify ({ r,g,b }),
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Content-type" : "application/json"
                                }
                            })
                            .then( respuesta => respuesta.json() )
                            .then( ({id,error}) => { //nos llegará el id del back o error si no existe en el back
                                if(!error){
                                    crearColor({
                                        _id : id,
                                        r,g,b
                                    })
                                return setTextoInput("")
                                }
                                console.log("...error, aqui se informaría del error")
                            })
                        
                        }
                    }

                    setError(true)
                } }>
                <input type="text" placeholder="rrr,ggg,bbb" value={textoInput} onChange={ evento => setTextoInput(evento.target.value) } />
                <p className={ `error ${ error ? "visible" : "" }` }>debe escribir tres valores entre 0 y 255 separados por comas</p>
                <input type="submit" value="crear color" />
            </form>
}

export default Formulario 