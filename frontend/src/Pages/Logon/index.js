import React , {useState} from 'react';
import {FiLogIn} from 'react-icons/fi'
import {Link , useHistory } from 'react-router-dom';

import './style.css'

import logoImg from '../../Assets/logo.svg'
import heroesImg from '../../Assets/heroes.png'
import api from '../../services/api';

export default function Logon () {

    const [id , setId ] = useState('');
    const history =  useHistory();

    async function handleLogin ( e ) {

        e.preventDefault();

        try {
            
            const response = await api.post('session' , {id} );
            localStorage.setItem( 'ongId' , id );
            localStorage.setItem( 'ongName' , response.data.name );

            history.push('/profile');

        } catch {
            alert('Falha no Login, tente novamente. ')
        }

    }

    return (

        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt='Logo Be The Hero' />        

                <form onSubmit={handleLogin}> 
                    <h1> Faça seu Login </h1>

                    <input 
                        placeholder='Sua ID'
                        value={id}
                        onChange={ e => setId( e.target.value ) }
                    />
                    <button type='submit' className='button'> Entrar </button>

                    <Link className='back-link' to='/register'> <FiLogIn size={16} color="#e02041"/> Nao Tenho Cadastro </Link>
                </form>

            </section>

            <img src={heroesImg} alt='Imagem Heroes'/>

        </div>
    )

}