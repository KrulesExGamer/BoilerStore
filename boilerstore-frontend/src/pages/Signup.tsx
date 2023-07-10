import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateAccount, validateSignup } from '../utils/apiCalls';
import { UserContext } from '../Context';
import SimpleHeader from '../components/SimpleHeader';
import { UserAccount, UserState } from '../utils/types';
import '../shared_styles/alignment.css';
import '../shared_styles/unselectable.css';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorText, setError] = useState("");

    const [buttonClicked, setButtonClicked] = useState(0);

    const navigate = useNavigate();

    const {userState, setUserState} = useContext(UserContext);

    // Garantees that both the name and email are not already registered 
    useEffect(() => {
        const checkSignup = async () => {
            if (buttonClicked === 0)
                return;

            if (name === "" || email === "" || password === "" || firstName === "" || lastName === "") {
                setError("Erro: Há campos não preenchidos!");
                return;
            }
            
            const accountExists = await validateAccount({name: name, email: email})
            if (!accountExists) {
                const conta : UserAccount = {
                    username: name.trim().toLocaleLowerCase(),
                    email: email.trim().toLocaleLowerCase(),
                    password: password,
                    role: 'user',
                    firstName: firstName,
                    lastName: lastName
                }

                const login : UserState | undefined = await validateSignup(conta);

                if (login === undefined) {
                    setError("Erro: Houve um problema de conexão com o banco de dados!");
                    return;
                }

                startSession(login)
            }

            else 
                setError("Erro: Nome de usuário e/ou email já foram cadastrados!");
        }

        checkSignup()
    }, [buttonClicked])


    // Load the data into memory and starts user session
    const startSession = (login : UserState) => {
        if (setUserState !== undefined)
            setUserState(login);
            
        navigate('/');
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
                    <input className='login_input'
                        style={{marginLeft: "15%"}}
                        onChange={(event)=>setFirstName(event.target.value)} 
                        type="text"
                        placeholder='First name...'
                        id="firstName" />
                </p>
                <p>
                    <input className='login_input'
                        style={{marginRight: "15%"}}
                        onChange={(event)=>setLastName(event.target.value)} 
                        type="text"
                        placeholder='Last name...'
                        id="lastName" />
                </p>
                <p>
                    <button className='login_button unselectable' onClick={() => setButtonClicked(buttonClicked + 1)}>Sign Up</button>
                </p>
            </>
        );
    }

    const loadForm = () => {
        if (!userState?.isLoggedIn)
            return signupForm();

        else 
            return (<p className='signup-message'>You're already logged in, {userState.userName}!</p>)
    }

    return (
        <div className='signup-background'>
            <SimpleHeader />
            <div className='conteiner-middle-center'>
                <div className='item-middle-center item-signup'>
                    <div className='login-container'>
                        {errorText != "" && <p className='error'>{`${errorText}`}</p>}
                        
                        {!userState?.isLoggedIn && welcomeMessage()}
                        
                        {loadForm()}
                        
                        <Link to='/login'><p className='link'>Already have an account?</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Signup;