import React , {useState} from 'react';
import { Link , useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';
import logoImg from '../../Assets/logo.svg'


export default function NewIncident (){

    const history = useHistory();

    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [value , setValue] = useState('')

    const ongId = localStorage.getItem('ongId');
    

    async function handleNewIncident( e ){

        e.preventDefault();

        const data = {
            title, 
            description,
            value  
        }

        try {

            await api.post('incidents' , data , {
                headers: {
                    Authorization: ongId
                }

            })

            history.push('/profile');

        } catch ( err ){
            alert(`Erro ao cadastrar: ${err}`)
        }

    }

    return ( 
        <div className="new-incident-container">
        <div className="content">

            <section> 
                <img src={logoImg} alt='Logo Be The Hero'/>

                <h1> Cadastrar Novo Caso </h1>
                <p> Descreva o caso detalhadamente </p>

                <Link className='back-link' to='/profile'> <FiArrowLeft size={16} color="#e02041"/> Voltar para Home </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                    type='text'
                    placeholder="Titulo do Caso"
                    value={title}
                    onChange={e => setTitle( e.target.value )}
                /> 
                <textarea 
                    placeholder="Descricao"
                    value={description}
                    onChange={e => setDescription( e.target.value )}
                /> 
                <input 
                    placeholder="Valor em Reais"
                    value={value}
                    onChange={e => setValue( e.target.value )}
                /> 
    
                <button className='button'> Cadastrar </button>


            </form>

        </div>
        </div>
    
    )
}