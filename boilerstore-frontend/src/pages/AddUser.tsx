import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateAccount, validateSignup } from '../utils/apiCalls';
import { UserContext } from '../Context';
import SimpleHeader from '../components/SimpleHeader';
import { UserAccount, UserState } from '../utils/types';
import '../shared_styles/alignment.css';
import '../shared_styles/unselectable.css';
import './AddUser.css';

const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorText, setError] = useState("");

    const [buttonClicked, setButtonClicked] = useState(0);

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
                let role = 'user'
                if (isAdmin)
                    role = 'admin'

                const conta : UserAccount = {
                    username: name.trim().toLocaleLowerCase(),
                    email: email.trim().toLocaleLowerCase(),
                    password: password,
                    role: role,
                    firstName: firstName,
                    lastName: lastName
                }

                const login : UserState | undefined = await validateSignup(conta);

                if (login === undefined)
                    setError("Erro: Alguma coisa não está certa...")
                else
                    setError("Usuário criado")
            }

            else 
                setError("Erro: Nome de usuário e/ou email já foram cadastrados!");
        }

        checkSignup()
    }, [buttonClicked])

    const signupForm = () => {
        return (
            <>
                <p>
                    <input className='signup_input'
                        style={{marginRight: "15%"}}
                        onChange={(event)=>setName(event.target.value)} 
                        type="text"
                        placeholder='Username...'
                        id="name" />
                </p>
                <p>
                <input className='signup_input'
                        style={{marginLeft: "15%"}}
                        onChange={(event)=>setEmail(event.target.value)} 
                        type="text"
                        placeholder='Email...'
                        id="name" />
                </p>
                <p>
                    <input className='signup_input'
                        style={{marginRight: "15%"}}
                        onChange={(event)=>setPassword(event.target.value)} 
                        type="password" 
                        placeholder="Password" 
                        id="password" />
                </p>
                <p>
                    <input className='signup_input'
                        style={{marginLeft: "15%"}}
                        onChange={(event)=>setFirstName(event.target.value)} 
                        type="text"
                        placeholder='First name...'
                        id="firstName" />
                </p>
                <p>
                    <input className='signup_input'
                        style={{marginRight: "15%"}}
                        onChange={(event)=>setLastName(event.target.value)} 
                        type="text"
                        placeholder='Last name...'
                        id="lastName" />
                </p>
                <p>
                    <label className='signup_checkbox'> Is admin?
                        <input className='signup_checkbox'
                            style={{marginLeft: "15%"}}
                            onChange={()=>setIsAdmin(!isAdmin)} 
                            type="checkbox"
                            id="isAdmin" />
                    </label>
                </p>
                <p>
                    <button className='signup_button unselectable' onClick={() => setButtonClicked(buttonClicked + 1)}>Sign Up</button>
                </p>
            </>
        );
    }

    return (
        <div className='signup-background'>
            <SimpleHeader />
            <div className='conteiner-middle-center'>
                <div className='item-middle-center item-signup'>
                    <div className='signup-container'>
                        {errorText != "" && <p className='error'>{`${errorText}`}</p>}
                        
                        {signupForm()}                        
                    </div>
                </div>
            </div>
        </div>
    );
}



export default AddUser;