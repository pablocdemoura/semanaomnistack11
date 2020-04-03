import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Profile() {
  const [incidentes, setIncidentes] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongNome = localStorage.getItem('ongNome');

  useEffect(() => {
    api.get('http://localhost:3333/profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidentes(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncidente(id) {
    try {
      await api.delete(`http://localhost:3333/incidentes/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      // Fira Code - Font Ligatures
      setIncidentes(incidentes.filter(incidente => incidente.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogoff() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongNome}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogoff} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidentes.map(incidente => (
          <li key={incidente.id}>
            <strong>CASO:</strong>
            <p>{incidente.titulo}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incidente.descricao}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidente.valor)}</p>

            <button onClick={() => handleDeleteIncidente(incidente.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
