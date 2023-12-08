import React, { useState } from 'react';
import updateData from '../../firebase/firestore/updateData';
import deleteClient from '../../firebase/firestore/deleteClient';
import '../scss/client.scss';

const Client = ({ id, NOMBRE, DIRECCION, FRECUENCIA, nextDate, TELEFONO, PAGO }) => {
  const [edit, setEdit] = useState(false);
  const [client, setClient] = useState({ id, NOMBRE, DIRECCION, FRECUENCIA, nextDate, TELEFONO, PAGO });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'date') {
      const [year, month, day] = value.split('-');
      
      const existingDate = new Date(client.nextDate);
      const newDate = new Date(existingDate);
      newDate.setFullYear(parseInt(year, 10));
      newDate.setMonth(parseInt(month, 10) - 1); // Corrected month value with -1
      newDate.setDate(parseInt(day, 10) -1);
  
      setClient((prevClient) => ({
        ...prevClient,
        nextDate: newDate.toISOString().split('T')[0], // Format to yyyy-mm-dd
      }));
    } else {
      setClient((prevClient) => ({
        ...prevClient,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    setEdit(false);
    updateData(client);
  };

  const handleDelete = () => {
    deleteClient(client);
  };

  return (
    <div className='card' style={{ backgroundColor: "white" }}>
      {edit ? (
        <div className='card-content-input'>
          <input
            style={{ color: "black" }}
            value={client.NOMBRE}
            name='NOMBRE'
            label="name"
            type='text'
            onChange={(event) => handleInputChange(event)}
          />
          <input
            style={{ color: "black" }}
            value={client.DIRECCION}
            name='DIRECCION'
            label="address"
            type='text'
            onChange={(event) => handleInputChange(event)}
          />
          <select
            style={{ color: "black" }}
            value={client.FRECUENCIA}
            name='FRECUENCIA'
            label="frequency"
            onChange={(event) => handleInputChange(event)}
          >
            <option value="BI-WEEKLY">BI-WEEKLY</option>
            <option value="20 DAYS">20 DAYS</option>
            <option value="MONTHLY">MONTHLY</option>
            <option value="40 DAYS">40 DAYS</option>
            <option value="ON CALL">ON CALL</option>
          </select>
          <input
            style={{ color: "black" }}
            value={client.nextDate}
            name='date'
            label="date"
            type='date'
            onChange={(event) => handleInputChange(event)}
          />
          <input
            style={{ color: "black" }}
            value={client.TELEFONO}
            name='TELEFONO'
            label="phone"
            type='text'
            onChange={(event) => handleInputChange(event)}
          />
          <input
            style={{ color: "black" }}
            value={client.PAGO}
            name='PAGO'
            label="payment"
            type='text'
            onChange={(event) => handleInputChange(event)}
          />
        </div>
      ) : (
        <div className='card-content'>
          <p className="nombre" style={{ color: "black" }}> <p className='hide'>Nombre: </p> {client.NOMBRE}</p>
          <p className="direccion" style={{ color: "black" }}>  <p className='hide'>Direccion: </p> {client.DIRECCION}</p>
          <p className="frecuencia" style={{ color: "black" }}>  <p className='hide'>Frecuencia: </p> {client.FRECUENCIA}</p>
          <p className="nextdate" style={{ color: "black" }}>  <p className='hide'>Proxima Fecha: </p> {client.nextDate}</p>
          <p className="telefono" style={{ color: "black" }}>  <p className='hide'>Telefono: </p> {client.TELEFONO}</p>
          <p className="page" style={{ color: "black" }}>  <p className='hide'>Pago: </p> {client.PAGO}</p>
        </div>
      )}

      <div className='button-container'>
        {edit ? (
          <>
            <button
              style={{ marginLeft: "12px" }}
              type='button'
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              style={{ marginLeft: "12px" }}
              type='button'
              onClick={() => setEdit(false)}
            >
              Cancelar
            </button>
            <button
              style={{ marginLeft: "12px", backgroundColor: "red" }}
              type='button'
              onClick={ handleDelete}

            >
              Borrar
            </button>
          </>
        ) : (
          <>
            <button
              style={{ marginLeft: "12px" }}
              type='button'
              onClick={() => {
                setEdit(true) 
              } }

            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Client;
