import { useState } from "react";
import { Link } from 'react-router-dom';
import fetchData from "../../utils/fetchData";
import "./Login.css"

// LOGIN 
function Login() {
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

        try {
            if (!userData.email || userData.email.trim() === "" || !userData.password) {
                setError("Debes completar ambos campos");
                return;
            }
            const loginResponse = await fetchData("/login", "POST", userData);
            if (loginResponse.error) {
                setError(loginResponse.error);
                return;
            }
            if (loginResponse.token) {
            localStorage.setItem('authToken', loginResponse.token);
            setUserData({ email: "", password: "" }); 
            /* alert("¡Registro exitoso!"); */
            }
            setError(null);
        } catch (error) {
            setError("Hubo un problema con la solicitud. Intenta de nuevo.");
        }
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
            <section className="auth__redirect">
                <p>¿No tienes una cuenta? </p>
                <Link to="/register">Regístrate</Link>
            </section>
        </section>
    )
}

export default Login;