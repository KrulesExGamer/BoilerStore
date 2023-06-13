import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateAccount } from '../utils/apiCalls';
import { UserContext } from '../Context';
import SimpleHeader from '../components/SimpleHeader';
import '../shared_styles/alignment.css';
import '../shared_styles/unselectable.css';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setError] = useState("");

    const navigate = useNavigate();

    const {userState, setUserState} = useContext(UserContext);

    // Verifica se o email e/ou nome já estão cadastrados
    const checkSignup = () => {
        if (name === "" || email === "" || password === "") {
            setError("Erro: Há campos não preenchidos!");
            return false;
        }
        
        if (validateAccount({task: "signup", name: name, email: email}))
            return true;

        else {
            setError("Erro: Usuário e/ou email já foram cadastrados!");
            return false;
        }
    }

    const performSignup = () => {
        if (checkSignup()) {
            navigate('/');
        }
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
                    <button className='login_button unselectable' onClick={performSignup}>Sign Up</button>
                </p>
            </>
        );
    }

    const loadForm = () => {
        if (userState?.isLoggedIn)
        return signupForm();

    else 
        return (<p className='signup-message'>Você já está logado!</p>)
    }

    return (
        <div className='signup-background'>
            <SimpleHeader />
            <div className='conteiner-middle-center'>
                <div className='item-middle-center item-signup'>
                    <div className='login-container'>
                        {errorText != "" && <p className='error'>{`${errorText}`}</p>}
                        
                        {userState?.isLoggedIn && welcomeMessage()}
                        
                        {loadForm()}
                        
                        <Link to='/login'><p className='link'>Already have an account?</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Signup;