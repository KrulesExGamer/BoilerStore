import { Link } from 'react-router-dom'
import './SimpleHeader.css'
import '../shared_styles/alignment.css'
import logo from '../img/boilerstore-logo.svg';

const SimpleHeader = () => {
    return (
        <header className='SimpleHeader conteiner-middle-center'>
            <nav className='simple-navbar item-middle-center'>
                <div className='simple-navbar-center'>
                    <div className='logo-container'>
                        <Link to='/'>
                            <img className='boilerstore-logo' alt='BoilerStore Logo' src={logo} />
                        </Link>
                        <Link to='/'>
                            <h1 className='boilerstore-main-title'>BoilerStore</h1>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default SimpleHeader;