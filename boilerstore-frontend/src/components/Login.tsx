import React from 'react';
import '../shared_styles/alignment.css'
import '../shared_styles/unselectable.css'
import './Login.css'


const Login = () => {
    return (
        <div className='conteiner-middle-center'><div className='item-middle-center'>
            <div className='login-container'>
                <p><label htmlFor="name">Nome: </label><input type="text" name="name" id="name" /></p>
                <p><label htmlFor="email">Email: </label><input type="email" name="email" id="email" /></p>
                <p><label htmlFor="password">Senha: </label><input type="password" name="password" id="password" /></p>
                <p><button className='unselectable' onClick={()=>{}}>Fuck</button></p>
            </div>
        </div></div>
    )
}

export default Login;