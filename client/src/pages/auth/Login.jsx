import { useState } from "react";
import "./Login.css"

// LOGIN 
function Login({ }) {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleUserEmail = (e) => {
        setUserData({ ...userData, email: e.target.value });
    };

    const handleUserPassword = (e) => {
        setUserData({ ...userData, password: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData.email || !userData.password) {
            setError("Debes completar ambos campos");
            return;
        }

        setError(null);
        console.log("Usuario autenticado:", userData);
        alert("Inicio de sesión exitoso");
        
    };


    return (
        <section className="auth-wrapper">

            <section className="auth__header">
                <h1>Inicia sesión</h1>
                <p className="error">{error}</p>
            </section>

            <form className="auth__form" onSubmit={handleSubmit}>
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" name="email" id="email" value={userData.email} onChange={handleUserEmail} />
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" value={userData.password} onChange={handleUserPassword} />
                <button className="auth__button">Acceder</button>
            </form>
           {/*  <section className="auth__redirect">
                <p>¿No tienes una cuenta? </p>
                <Link to="/registro">Regístrate</Link>
            </section> */}
        </section>
    )
}

export default Login;