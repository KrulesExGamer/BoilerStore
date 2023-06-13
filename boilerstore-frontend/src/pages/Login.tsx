import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateAccount } from '../utils/apiCalls';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Login.css'

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setError] = useState('');

    const navigate = useNavigate();

    // Verifica se a conta existe e se os dados estão corretos
    const checkLogin = () => {
        if (name === '' || password === '')
            setError('Erro: Há campos não preenchidos!');
        
        if (validateAccount({task: 'login', name: name, password: password}))
            navigate('/')

        else
            setError('Erro: Usuário e/ou senha inválidos!');
    }

    const welcomeMessage = () => {
        return (
            <p className='welcome'>
                ʕっ•ᴥ•ʔっ <br/>
                Welcome Back!! :)
            </p>
        );
    }

    const loginForm = () => {
        return (
            <>
                <p>
                    <input className='login_input'
                    style={{marginRight: '15%'}}
                        onChange={(event)=>setName(event.target.value)} 
                        type='text'
                        placeholder='Email or username...'
                        id='name' />
                </p>
                <p>
                    <input className='login_input'
                    style={{marginLeft: '15%'}}
                        onChange={(event)=>setPassword(event.target.value)} 
                        type='password' 
                        placeholder='Password' 
                        id='password' />
                </p>

                <p><button className='login_button unselectable' onClick={checkLogin}>Login</button></p>
            </>
        )
    }

    return (
        <div className='login-background'>
            <div className='conteiner-middle-center conteiner-login'>
                <div className='item-middle-center item-login'>
                    <div className='login-container'>
                        {errorText !== '' && <p className='error'>{`${errorText}`}</p>}
                        
                        {welcomeMessage()}
                        
                        {loginForm()}
                        
                        <Link to='/signup'><p className='link'>Are you new here?</p></Link>
                        <Link to='/recovery'><p className='link'>Forgot your password?</p></Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Login;