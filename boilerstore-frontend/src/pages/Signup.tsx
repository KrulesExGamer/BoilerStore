import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateAccount } from '../utils/apiCalls';
import '../shared_styles/alignment.css';
import '../shared_styles/unselectable.css';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setError] = useState("");

    const navigate = useNavigate();

    // Verifica se o email e/ou nome já estão cadastrados
    const checkSignup = () => {
        if (name === "" || email === "" || password === "")
            setError("Erro: Há campos não preenchidos!");
        
        if (validateAccount({task: "signup", name: name, email: email}))
            navigate("/");

        else
            setError("Erro: Usuário e/ou email já foram cadastrados!");
    }

    const welcomeMessage = () => {
        return (
            <p className='welcome'>
                ʕっ•ᴥ•ʔっ <br/>
                Welcome aboard!! :)
            </p>
        );
    }

    const signupForm = () => {
        return (
            <>
                <p>
                    <input className='login_input'
                        style={{marginRight: "15%"}}
                        onChange={(event)=>setName(event.target.value)} 
                        type="text"
                        placeholder='Username...'
                        id="name" />
                </p>
                <p>
                <input className='login_input'
                        style={{marginLeft: "15%"}}
                        onChange={(event)=>setEmail(event.target.value)} 
                        type="text"
                        placeholder='Email...'
                        id="name" />
                </p>
                <p>
                    <input className='login_input'
                        style={{marginRight: "15%"}}
                        onChange={(event)=>setPassword(event.target.value)} 
                        type="password" 
                        placeholder="Password" 
                        id="password" />
                </p>
                <p>
                    <button className='login_button unselectable' onClick={checkSignup}>Sign Up</button>
                </p>
            </>
        );
    }

    return (
        <div className='signup-background'>
            <div className='conteiner-middle-center'>
                <div className='item-middle-center item-signup'>
                    <div className='login-container'>
                        {errorText != "" && <p className='error'>{`${errorText}`}</p>}
                        
                        {welcomeMessage()}
                        
                        {signupForm()}
                        
                        <Link to='/login'><p className='link'>Already have an account?</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Signup;