import { useContext, useState } from "react";
import fetchData from "../../utils/fetchData";
import { AuthContext } from "../../components/authContext/AuthContext";
import Register from "./Register";
import "./Login.css"
// LOGIN 
function Login() {
    const { setToken, setNickname, setEmail, set_id } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [displaySignup, setDisplaySignup] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const toggleSignup = () =>{
        setDisplaySignup(!displaySignup);
    }
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
                setError("You must complete both fields");
                return;
            }
            const loginResponse = await fetchData("/login", "POST", userData);
            console.log("This is the loginResponse");
            console.log(loginResponse);
            if (loginResponse.error) {
                setError(loginResponse.error);
                return;
            }
            if (loginResponse.token) {
                localStorage.setItem('authToken', loginResponse.token);
                setToken(loginResponse.token);
                setNickname(loginResponse.userData.nickname);
                setEmail(loginResponse.userData.email);
                setUserData({ email: "", password: "" });
            }
            if (loginResponse.userData){
                set_id(loginResponse.userData._id);
                localStorage.setItem('_id', loginResponse.userData._id);
            }
            setError(null);
        } catch (error) {
            setError("There was an error with your request. Try again later.");
        }
    };

    return (
        !displaySignup ? <>
            <section className="auth__container">

                <div className="auth__image">
                    <img src="src/assets/images/erraton.png" alt="img" />
                </div>

                <section className="auth-wrapper">

                    <section className="auth__header">
                        <h1>Login</h1>
                        <p className="error">{error}</p>
                    </section>

                    <form className="auth__form" onSubmit={handleSubmit}>
                        <label className="auth__label" htmlFor="email">Email</label>
                        <input className="auth__input" type="email" name="email" id="email" value={userData.email} onChange={handleUserEmail} />
                        <label className="auth__label" htmlFor="password">Password</label>
                        <input className="auth__input" type="password" name="password" id="password" value={userData.password} onChange={handleUserPassword} />
                        <button className="auth__button">Sign In</button>
                    </form>

                    <section className="auth__redirect">
                        <p onClick={toggleSignup}> Don't have an account? </p>
                    </section>

                </section>
                
            </section>
        </> : <Register toggleSignup={toggleSignup}/>
    )
}

export default Login;