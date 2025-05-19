import { useState } from "react";
import fetchData from "../../utils/fetchData";

function Register({ }) {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        nickname: "",
        email: "",
        password: ""
    }) //para modificar estos estados debo desestructurar y modificarlos de a uno, si no un useState por campo

    const handleUserPassword = (e) => {
        const newPassword = e.target.value;
        const newState = { ...userData, password: newPassword }
        setUserData(newState);
    }
    const handleUserEmail = (e) => {
        const newEmail = e.target.value;
        const newState = { ...userData, email: newEmail }
        setUserData(newState);
    }

    const handleNickname = (e) => {
        const newNickname = e.target.value;
        const newState = { ...userData, nickname: newNickname }
        setUserData(newState);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const { nickname, email, password } = userData;

        
            if (!nickname || nickname.trim() === "") {
                setError("El nombre de usuario es obligatorio");
                return;
            }
        
            if (!email) {
                setError("Debes introducir un email"); //editado
                return;
            }
        
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError("El formato de email no es válido");
                return;
            }
        
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
            if (!passwordRegex.test(password)) {
                setError("La contraseña debe tener al menos 8 caracteres, con letras y números");
                return;
            }

            const registerResponse = await fetchData("/register", "POST", userData);

            if (registerResponse.error) {
                setError(registerResponse.error);
                return;
            }

            if (registerResponse.token) {
                localStorage.setItem('authToken', registerResponse.token);
                /* alert("¡Registro exitoso!"); */

            } 
            
            setError(null);
            
            setUserData({
                nickname: "",
                email: "",
                password: ""
            })

        
        } catch (error) {
                setError(error.message || "Ocurrió un error");
                setUserData({ nickname: "", email: "", password: "" }); //limpiar los campos
        }
    }
    
    return (
        <section className="auth_wrapper">

            <section className="auth__header">
                <h1>Registro</h1>
                <p className="error">{error}</p>
            </section>

            <form className="auth__form" onSubmit={handleSubmit}>
                <label htmlFor="nickname">Nombre de usuario</label>
                <input type="text" name="nickname" id="nickname" value={userData.nickname} onChange={handleNickname} />
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" name="email" id="email" value={userData.email} onChange={handleUserEmail} />
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" value={userData.password} onChange={handleUserPassword} />
                <button>Regístrate</button>
            </form>
            {/* <section className="auth__redirect">
                <p>¿Ya tienes cuenta? </p>
                <Link to="/login">Inicia sesión</Link>
            </section> */}
        </section>
    )
}

export default Register;