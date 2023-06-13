import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateAccount } from '../utils/apiCalls';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Recovery.css'

const Recovery = () => {
    const [email, setEmail] = useState('');
    const [errorText, setError] = useState('');
    const [success, setSucess] = useState(false);

    const checkRecovery = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        
        if (email === '' || !emailRegex.test(email)) {
            setError('Erro: Email inválido!');
            return;
        }

        else 
            setError('');


        if (validateAccount({task: 'recovery', email: email}))
            setSucess(true);

        else
            setError('Erro: Email não encontrado!');
    }

    return (
        <div className='conteiner-middle-center'><div className='item-middle-center'>
            <div className='recovery-container'>
                {errorText !== '' && <p className='error'>{`${errorText}`}</p>}
                
                {
                success === false &&
                <>
                <p className='recovery-message'>
                    Forgot your account’s password? Enter your email address and we’ll send you a recovery link.
                </p>
                <p>
                    <input className='recovery_input'
                        style={{marginRight: '20%'}}
                        onChange={(event)=>setEmail(event.target.value)} 
                        type='email'
                        placeholder='Email...'
                        id='email' />
                </p>
                <p>
                    <button className='recovery_button unselectable' onClick={checkRecovery}>Recovery</button>
                </p>
                </>
                }

                {
                success === true && (
                <>
                <p className='recovery-success'>Enviamos instruções de recuperação para o seu email.</p>
                <Link to='/login'><p className='link'>Clique aqui para voltar para a página de Login</p></Link>
                </>
                )}


            </div>
        </div></div>
    )
}



export default Recovery;