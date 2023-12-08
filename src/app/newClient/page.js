'use client'
import React, { useState } from 'react';
import '../../scss/newClient.scss'
import addData from '../../../firebase/firestore/addData';

function NewClient() {
    const [client, setClient] = useState({
        NOMBRE: '',
        DIRECCION: '',
        FRECUENCIA: 'BI-WEEKLY',
        nextDate: '',
        TELEFONO: '',
        PAGO: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addData(client);
        setClient({
            NOMBRE: '',
            DIRECCION: '',
            FRECUENCIA: 'BI-WEEKLY',
            nextDate: '',
            TELEFONO: '',
            PAGO: '',
        })
    };

    return (
        <div class="newClient">
            <div className='nav-bar'>
                <button>
                    <a href='/admin'>Dashboard</a>
                </button>
            </div>

            <form className='new-client-form' onSubmit={handleSubmit} >
                <div>
                    <label>Nombre</label>
                    <input type='text'
                        name='NOMBRE'
                        value={client.NOMBRE}
                        onChange={handleInputChange} />
                </div>
                <div>

                    <label>Direccion</label>
                    <input type='text'
                        name='DIRECCION'
                        value={client.DIRECCION}
                        onChange={handleInputChange} />
                </div>
                <div>

                    <label>Frecuencia</label>
                    <select
                        name='FRECUENCIA'
                        label="frequency"
                        value={client.FRECUENCIA}
                        onChange={handleInputChange}
                    >
                        <option value="BI-WEEKLY">BI-WEEKLY</option>
                        <option value="20 DAYS">20 DAYS</option>
                        <option value="MONTHLY">MONTHLY</option>
                        <option value="40 DAY">40 DAYS</option>
                        <option value="ON CALL">ON CALL</option>
                    </select>
                </div>
                <div>
                    <label>Proxima Fecha</label>
                    <input type='date'
                        name='nextDate'
                        value={client.nextDate}
                        onChange={handleInputChange} />
                </div>
                <div>
                    <label>Telefono</label>
                    <input type='phone'
                        name='TELEFONO'
                        value={client.TELEFONO}
                        onChange={handleInputChange} />
                </div>
                <div>


                    <label>Pago</label>
                    <input type='text'
                        name='PAGO'
                        value={client.PAGO}
                        onChange={handleInputChange} />
                </div>

                <button type='submit'>Añadir</button>
            </form>
        </div>
    )
}

export default NewClient