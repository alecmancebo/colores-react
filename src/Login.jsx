import { useState } from "react"

function Login() {
    const [nombre, setNombre] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    return (
        <div className="modal-editar modal-visible">
            <form onSubmit={(e) => {
                                e.preventDefault()
                                fetch("https://api-colores-dlta.onrender.com/login", {
                                method: "POST",
                                body: JSON.stringify({ nombre, password }),
                                headers: { "Content-type": "application/json" }
                                })
                                .then(res => res.json())
                                
            }} className="modal">
                <h2>Login</h2>
                <input type="text" placeholder="Usuario" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                <p style={{color: 'red'}} className="datos">Datos incorrectos</p>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login