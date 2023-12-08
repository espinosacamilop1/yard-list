'use client'
import React, {useState} from 'react';
import '../../scss/newClient.scss'
import addData from '../../../firebase/firestore/addData';

function newClient() {
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
        PAGO: '',})
    };
    
  return (
    <div>
        <div className='nav-bar'>
            <button>
                <a href='/admin'>Dashboard</a>
            </button>   
        </div>

        <form className='new-client-form' onSubmit={handleSubmit} >
            <label>Nombre</label>
            <input type='text' 
                    name='NOMBRE' 
                    value={client.NOMBRE}
                    onChange={handleInputChange}/>

            <label>Direccion</label>
            <input type='text' 
                name='DIRECCION' 
                value={client.DIRECCION}
                onChange={handleInputChange}/>

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

            <label>Proxima Fecha</label>
            <input type='date' 
                    name='nextDate'
                    value={client.nextDate}
                    onChange={handleInputChange}/>

            <label>Telefono</label>
            <input type='phone' 
                    name='TELEFONO'
                    value={client.TELEFONO}
                    onChange={handleInputChange}/>

            <label>Pago</label>
            <input type='text' 
                    name='PAGO'
                    value={client.PAGO}
                    onChange={handleInputChange}/>

            <button type='submit'>Añadir</button>
        </form>
    </div>
  )
}

export default newClient