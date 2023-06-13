import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context';
import SimpleHeader from '../components/SimpleHeader';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Logoff.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logoff = () => {
    const {userState, setUserState} = useContext(UserContext);

    const navigate = useNavigate();

    const performLogoff = () => {
        if (setUserState !== undefined) {
            setUserState({isLoggedIn: false})
            navigate('/logoff?justout=true')
        }
    }

    const farewellMessage = () => {
        return (
            <p className='logoff-message'>
                ʕっ•ᴥ•ʔっ <br/>
                Bye-bye, {userState?.userName}!! :)
            </p>
        );
    }

    const loadButton = () => {
        if (userState?.isLoggedIn)
            return (<p><button className='logoff_button unselectable' onClick={performLogoff}>Confirm logoff</button></p>);

        else 
            return (<Link to='/login'><p className='link'>You aren't logged in, why not do it now?</p></Link>)
    }

    return (
        <div className='logoff-background'>
            <SimpleHeader />
            <div className='conteiner-middle-center conteiner-logoff'>
                <div className='item-middle-center item-logoff'>
                    <div className='logoff-container'>
                        {userState?.isLoggedIn && <p className='logoff-message'>Already leaving? <FontAwesomeIcon icon={faSadTear} /> </p>}
                        {!userState?.isLoggedIn && farewellMessage()}
                        
                        {loadButton()}
                        
                        {!userState?.isLoggedIn && <Link to='/login'><p className='link'>Wanna login again?</p></Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Logoff;