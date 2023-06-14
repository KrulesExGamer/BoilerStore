import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import SimpleHeader from '../components/SimpleHeader';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Logoff.css'

const Logoff = () => {
    const {userState, setUserState} = useContext(UserContext);

    const navigate = useNavigate();

    const searchParams = new URLSearchParams(useLocation().search);
    const username = searchParams.get('username');  

    // Performs the logoff
    const performLogoff = () => {
        if (setUserState !== undefined) {
            let name = userState?.userName;
            
            setUserState({isLoggedIn: false});

            navigate(`/logoff?username=${name}`);
        }
    }

    const farewellMessage = () => {
        return (
            <p className='logoff-message'>
                ʕっ•ᴥ•ʔっ <br/>
                Bye-bye, {username}!!
            </p>
        );
    }

    const loadButton = () => {
        if (userState?.isLoggedIn)
            return (<button className='logoff_button unselectable' onClick={performLogoff}>Confirm logoff</button>);

        else if (username === null)
            return (<Link to='/login'><p className='link'>You aren't logged in, why not do it now?</p></Link>)
    }

    return (
        <div className='logoff-background'>
            <SimpleHeader />
            <div className='conteiner-middle-center conteiner-logoff'>
                <div className='item-middle-center item-logoff'>
                    <div className='logoff-container'>
                        {userState?.isLoggedIn && <p className='logoff-message'>Already leaving, {userState.userName}? <FontAwesomeIcon icon={faSadTear} /> </p>}
                        {username !== null && farewellMessage()}
                        
                        {loadButton()}
                        
                        {username !== null && <Link to='/login'><p className='link'>Wanna login again?</p></Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Logoff;