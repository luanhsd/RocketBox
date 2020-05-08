import React from 'react';
import logo from '../../assets/logo.svg'
import { MdInsertDriveFile } from 'react-icons/md'
import './styles.css'

export default function Box() {
    return (
        <div id="box-container">
            <header>
                <img src={logo} alt="RocketBox" />
                <h1>Rocketseat</h1>
            </header>
            <ul>
                <li>
                    <a className="fileInfo" href="/">
                        <MdInsertDriveFile size={24} color="#A5CFFF" />
                        <strong>titulo arquivo</strong>
                    </a>
                    <span> há 3 minutos atras</span>
                </li>
                <li>
                    <a className="fileInfo" href="/">
                        <MdInsertDriveFile size={24} color="#A5CFFF" />
                        <strong>titulo arquivo</strong>
                    </a>
                    <span> há 3 minutos atras</span>
                </li>
                <li>
                    <a className="fileInfo" href="/">
                        <MdInsertDriveFile size={24} color="#A5CFFF" />
                        <strong>titulo arquivo</strong>
                    </a>
                    <span> há 3 minutos atras</span>
                </li>
            </ul>
        </div>
    )
}