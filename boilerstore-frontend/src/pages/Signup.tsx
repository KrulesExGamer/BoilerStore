import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateAccount } from '../utils/validateAccount';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Login.css'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorText, setError] = useState("");

    const navigate = useNavigate();

    const checkSignup = () => {
        if (name === "" || email === "" || password === "")
            setError("Erro: Há campos não preenchidos!");
        
        if (validateAccount({task: "signup", name: name, email: email}))
            navigate("/");

        else
            setError("Erro: Usuário e/ou email já foram cadastrados!");
    }

    return (
        <div className='conteiner-middle-center'><div className='item-middle-center'>
            <div className='login-container'>
                {errorText != "" && <p className='error'>{`${errorText}`}</p>}
                
                <p className='welcome'>
                    ʕっ•ᴥ•ʔっ <br/>
                    Welcome aboard!! :)
                </p>
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
                
                <Link to='/login'><p className='link'>Already a homie?</p></Link>
                <Link to='/recovery'><p className='link'>Having some skill issues?</p></Link>
                
            </div>
        </div></div>
    )
}



export default Signup;