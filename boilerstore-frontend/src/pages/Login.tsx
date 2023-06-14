import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Login.css'
import { validateAccount } from '../utils/apiCalls';

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorText, setError] = useState("");

    const navigate = useNavigate();

    const accounts = [{name: "Jorge", email: "jorge@mail.com", password:"123"}, 
                      {name: "Ademir", email: "admin@mail.com", password:"admin"}]

    const checkLogin = () => {
        if (name === "" || password === "")
            setError("Erro: Há campos não preenchidos!");
        
        if (validateAccount({task: "login", name: name, email: email, password: password}))
            navigate("/")

        setError("Erro: Usuário e/ou senha inválidos!");
    }

    return (
        <div className='conteiner-middle-center'><div className='item-middle-center'>
            <div className='login-container'>
                {errorText != "" && <p className='error'>{`${errorText}`}</p>}
                
                <p className='welcome'>
                    ʕっ•ᴥ•ʔっ <br/>
                    Welcome Back!! :)
                </p>
                <p>
                    <input className='login_input'
                    style={{marginRight: "15%"}}
                        onChange={(event)=>setName(event.target.value)} 
                        type="text"
                        placeholder='Email or username...'
                        id="name" />
                </p>
                <p>
                    <input className='login_input'
                    style={{marginLeft: "15%"}}
                        onChange={(event)=>setPassword(event.target.value)} 
                        type="password" 
                        placeholder="Password" 
                        id="password" />
                </p>
                <p>
                    <button className='login_button unselectable' onClick={checkLogin}>Login</button>
                </p>
                
                <Link to='/signup'><p className='link'>Newbie?</p></Link>
                <Link to='/recovery'><p className='link'>Having some skill issues?</p></Link>
                
            </div>
        </div></div>
    )
}



export default Login;