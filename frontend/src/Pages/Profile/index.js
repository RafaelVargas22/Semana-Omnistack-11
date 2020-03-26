import React , {useState , useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api'
import './style.css';
import logoImg from '../../Assets/logo.svg';
import {FiPower , FiTrash2} from 'react-icons/fi';

export default function Profile (){

    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
  
    const [incidents , setIncidents] = useState([])

    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    async function handleDeleteIncident( id ){

        try {

            await api.delete(`incidents/${id}` , {
                headers : {
                    Authorization : ongId
                }
            })

            setIncidents( incidents.filter( incident => incident.id !== id ) )

        } catch ( err ){
            alert("Erro ao deletar caso. Tente Novamente !")

        }

    }

    useEffect( () => {
        api.get('profile' , { 
            headers: {
                Authorization: ongId,
            }
        }).then( response => {
            setIncidents(response.data)
        })
    } , [ongId] )

    return (
        <div className="profile-container">

            <header>
                <img src={logoImg} alt='Logo Be The Hero'/> 
                <span> Bem-Vindo, {ongName} </span>

                <Link className='button' to='/incidents/new'> Cadastrar novo Incidente </Link>
                <button type='button' onClick={handleLogout}> 
                    <FiPower size={18} color='#E02041'/>
                </button> 

            </header>

            <h1> Casos Cadastrados </h1>

            <ul>

              {incidents.map( incident => ( 
                    <li key={incident.id}>
                        <strong> CASO: </strong>
                        <p> {incident.title}</p>

                        <strong> DESCRIÇÃO: </strong>
                        <p> {incident.description}</p>

                        <strong> VALOR: </strong>
                        <p> {Intl.NumberFormat('pt-BR' , { style: 'currency' , currency: 'BRL'}).format(incident.value)} </p>

                        <button type='button' onClick={ () => handleDeleteIncident( incident.id)} > 
                        <FiTrash2 size={20} color='#a8a8a3'/>
                        </button>
                    </li>
                )
              )}
               
            </ul>


        </div>

    );

}