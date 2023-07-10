import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../utils/apiCalls';
import { UserContext } from '../Context';
import SimpleHeader from '../components/SimpleHeader';
import { UserState } from '../utils/types';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Login.css'

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setError] = useState('');

    const navigate = useNavigate();

    const {userState, setUserState} = useContext(UserContext)
    const [buttonClicked, setButtonClicked] = useState(0);


    useEffect(() => {
        // Verifies if the account is valid
        const checkLogin = async () => {
            if (buttonClicked === 0)
                return;

            if (name === '' || password === '') {
                setError('Erro: Há campos não preenchidos!');
                return;
            }

            const account : UserState | undefined = await validateLogin(name, password);

            if (account === undefined) {
                setError('Erro: Houve um problema de conexão com o banco de dados!');
                return;
            }

            else if (!account.isLoggedIn) {
                setError('Erro: Usuário ou senha não encontrados!');
                return;
            }

            performLogin(account);
        }

        checkLogin();
    }, [buttonClicked])

    // Actually performs the login
    const performLogin = (account : UserState) => {
        if (account.isLoggedIn === false) {
            setError('Erro: Usuário e/ou senha inválidos!');
            return;
        }

        if (setUserState !== undefined)
            setUserState(account);

        navigate('/');
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

                <p><button className='login_button unselectable' onClick={()  => setButtonClicked(buttonClicked + 1)}>Login</button></p>
            </>
        );
    }

    const loadForm = () => {
        if (!userState?.isLoggedIn)
            return loginForm();

        else 
            return (<p className='login-message'>You're already logged in, {userState.username}!</p>)
    }

    return (
        <div className='login-background'>
            <SimpleHeader />
            <div className='conteiner-middle-center conteiner-login'>
                <div className='item-middle-center item-login'>
                    <div className='login-container'>
                        {errorText !== '' && <p className='error'>{`${errorText}`}</p>}
                        
                        {!userState?.isLoggedIn && welcomeMessage()}
                        
                        {loadForm()}
                        
                        <Link to='/signup'><p className='link'>Are you new here?</p></Link>
                        <Link to='/recovery'><p className='link'>Forgot your password?</p></Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Login;