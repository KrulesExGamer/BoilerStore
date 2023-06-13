import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateAccount } from '../utils/apiCalls';
import { UserContext } from '../Context';
import SimpleHeader from '../components/SimpleHeader';
import { UserState } from '../utils/types';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Logoff.css'

const Logoff = () => {
    const navigate = useNavigate();

    const {userState, setUserState} = useContext(UserContext)

    const performLogin = () => {

    }

    const farewellMessage = () => {
        return (
            <p className='farewell'>
                ʕっ•ᴥ•ʔっ <br/>
                Bye-bye!! :)
            </p>
        );
    }

    const logoffButton = () => {
        return (
            <p><button className='login_button unselectable' onClick={performLogin}>Login</button></p>
        );
    }

    const loadButton = () => {
        if (!userState?.isLoggedIn)
            return logoffButton();

        else 
            return (<p className='login-message'>Você já está logado!</p>)
    }

    return (
        <div className='login-background'>
            <SimpleHeader />
            <div className='conteiner-middle-center conteiner-login'>
                <div className='item-middle-center item-login'>
                    <div className='login-container'>
                        {!userState?.isLoggedIn && farewellMessage()}
                        
                        {loadButton()}
                        
                        <Link to='/signup'><p className='link'>Are you new here?</p></Link>
                        <Link to='/recovery'><p className='link'>Forgot your password?</p></Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Logoff;