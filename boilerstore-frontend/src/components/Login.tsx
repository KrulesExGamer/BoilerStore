import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Login.css'

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
        
        for (let account of accounts) {
            // More secure algorythm will be used in later implementations
            if ((account.name === name || account.email === name) && account.password === password) {
                setError("Erro: Foi!!");
                navigate("/");
                return;
            }

            else {
                console.log(account.name + " " + name)
                console.log(account.email + " " + name)
                console.log(account.password + " " + password)
            }
        }

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
                    <input style={{marginRight: "20%"}}
                        onChange={(event)=>setName(event.target.value)} 
                        type="text"
                        placeholder='Email or username...'
                        id="name" />
                </p>
                {/* <p>
                    <label htmlFor="email">Email: </label>
                    <input onChange={(event)=>setEmail(event.target.value)} type="email" name="email" id="email" />
                </p> */}
                <p>
                    <input style={{marginLeft: "20%"}}
                        onChange={(event)=>setPassword(event.target.value)} 
                        type="password" 
                        placeholder="Password" 
                        id="password" />
                </p>
                <p>
                    <button className='unselectable' onClick={checkLogin}>Login</button>
                </p>
                
                <Link to='/recovery'><p className='link'>Having some skill issues?</p></Link>
                
            </div>
        </div></div>
    )
}



export default Login;