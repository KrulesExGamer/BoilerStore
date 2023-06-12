import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Login.css'
import { validateAccount } from '../utils/validateAccount';

const Recovery = () => {
    const [email, setEmail] = useState("");

    const [errorText, setError] = useState("");

    const navigate = useNavigate();

    const checkRecovery = () => {
        if (email === "") {
            setError("Erro: Email inválido!");
            return;
        }


        if (validateAccount({task: "recovery", email: email}))
            navigate("/login")

        else
            setError("Erro: Email inválido!");
    }

    return (
        <div className='conteiner-middle-center'><div className='item-middle-center'>
            <div className='login-container'>
                {errorText != "" && <p className='error'>{`${errorText}`}</p>}
                
                <p style={{fontWeight: "bolder", margin: "0% 10% 0% 10%", textAlign: "left"}}>
                    Forgot your account’s password? Enter your email address and we’ll send you a recovery link.
                </p>
                <p>
                    <input className='login_input'
                        style={{marginRight: "20%"}}
                        onChange={(event)=>setEmail(event.target.value)} 
                        type="email"
                        placeholder='Email...'
                        id="email" />
                </p>
                <p>
                    <button className='login_button unselectable' onClick={checkRecovery}>Recovery</button>
                </p>
            </div>
        </div></div>
    )
}



export default Recovery;