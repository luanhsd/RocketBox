import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './styles.css';
import img from '../../assets/logo.svg'
import api from '../../services/api'

export default function Main() {
    const [title, setTitle] = useState('')
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await api.post(`boxes`, {
            title
        })

        history.push(`/box/${response.data._id}`)
    }

    return (
        <div id="main-container">
            <form onSubmit={handleSubmit}>
                <img src={img} alt="" />
                <input
                    placeholder="Criar um Box"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    )
}