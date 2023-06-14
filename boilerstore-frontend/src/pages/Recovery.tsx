import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { validateAccount } from '../utils/apiCalls';
import SimpleHeader from '../components/SimpleHeader';
import '../shared_styles/alignment.css';
import '../shared_styles/unselectable.css';
import './Recovery.css';
import { UserContext } from '../Context';

const Recovery = () => {
    const [email, setEmail] = useState('');
    const [errorText, setError] = useState('');
    const [success, setSucess] = useState(false);

    const {userState, setUserState} = useContext(UserContext);

    // Checks if the email provided is valid and exists in our database
    const checkRecovery = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        
        if (email === '' || !emailRegex.test(email)) {
            setError('Erro: Email inválido!');
            return;
        }

        else 
            setError('');

        if (email.toLocaleLowerCase() === userState?.userName?.toLocaleLowerCase())
            setSucess(true)

        else if (validateAccount({task: 'recovery', email: email}))
            setSucess(true);

        else
            setError('Erro: Email não encontrado!');
    }

    const recoveryForm = () => {
        return (
            <>
                <p className='recovery-message'>
                    Forgot your account’s password? Enter your email address and we’ll send you a recovery link.
                </p>
                <p>
                    <input className='recovery_input'
                        onChange={(event)=>setEmail(event.target.value)} 
                        type='email'
                        placeholder='Email...'
                        id='email' />
                </p>
                <p>
                    <button className='recovery_button unselectable' onClick={checkRecovery}>Recovery</button>
                </p>
            </>
        )
    }

    const recoverySuccess = () => {
        return (
            <>
                <p className='recovery-success'>Enviamos instruções de recuperação para o seu email.</p>
                <Link to='/login'><p className='link'>Clique aqui para voltar para a página de Login</p></Link>
            </>
        );
    }

    return (
        <div className='recovery-background'>
            <SimpleHeader />
            <div className='conteiner-middle-center conteiner-recovery'>
                <div className='item-middle-center item-recovery'>
                    <div className='recovery-container'>
                        {errorText !== '' && <p className='error'>{`${errorText}`}</p>}
                        {success === false && recoveryForm()}
                        {success === true && recoverySuccess()}
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Recovery;