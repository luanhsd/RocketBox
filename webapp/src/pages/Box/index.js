import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { MdInsertDriveFile } from 'react-icons/md'
import api from '../../services/api'
import socket from 'socket.io-client'
import { formatDistance } from 'date-fns'
import Dropzone from 'react-dropzone'
import { pt } from 'date-fns/locale'
import './styles.css'

export default function Box() {
    const [box, setBox] = useState('')
    let { id } = useParams();


    useEffect(() => {
        subscribeToNewFiles()
        api.get(`boxes/${id}`)
            .then(response => {
                console.log(response.data)
                setBox(response.data)
            })
    }, [id])

    function handleUpload(files) {
        files.forEach(file => {
            const data = new FormData();
            data.append('file', file)
            api.post(`boxes/${id}/files`, data)
        })
    }

    function subscribeToNewFiles() {
        const io = socket('http://localhost:3001')
        io.emit('connectRoom', id)
        io.on('file', data => {
            setBox({ box: { ...box, files: [data, ...box.files] } })
        })
    }

    return (
        <div id="box-container">
            <header>
                <img src={logo} alt="RocketBox" />
                <h1>{box.title}</h1>
            </header>

            <Dropzone onDrop={handleUpload}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Arraste arquivos ou clique aqui</p>
                    </div>
                )}
            </Dropzone>

            <ul>
                {box.files && box.files.map(file => (
                    < li key={file._id} >
                        <a className="fileInfo" href={file.url} target="_blank" rel="noopener noreferrer">
                            <MdInsertDriveFile size={24} color="#7159c1" />
                            <strong>{file.title}</strong>
                        </a>
                        <span>há {formatDistance(new Date(file.createdAt), new Date(), {
                            locale: pt
                        })}</span>
                    </li>
                ))}
            </ul>
        </div >
    )
}