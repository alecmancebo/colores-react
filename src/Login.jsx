import { useState } from "react"

function Login({ setToken }) {
    const [nombre, setNombre] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const manejarLogin = (e) => {
        e.preventDefault()
        fetch("https://api-colores-dlta.onrender.com/login", {
            method: "POST",
            body: JSON.stringify({ nombre, password }),
            headers: { "Content-type": "application/json" }
        })
        .then(res => res.json())
        .then(({ token, error }) => {
            if (token) {
                localStorage.setItem("token", token) // Guardamos para que no se borre al refrescar
                setToken(token)
            } else {
                setError(true)
            }
        })
    }

    return (
        <div className="modal-editar modal-visible">
            <form onSubmit={manejarLogin} className="modal">
                <h2>Login Administrador</h2>
                <input type="text" placeholder="Usuario" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                {error && <p style={{color: 'red'}}>Datos incorrectos</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login