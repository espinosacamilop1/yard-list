'use client'
import React, { useState, useEffect} from 'react'
import { useAuthContext } from "../../context/AuthContect";
import { useRouter } from "next/navigation";
import getDocument from "../../../firebase/firestore/getData"
import { getWeekBeforeSunday, getUpcomingWeekFormatted, getClientNextDate } from '../../scripts/functions.js'
import Client from '../Client';
import updateClients from '../../../firebase/firestore/updateClients';
import '../../scss/nav-bar.scss';

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()
    
    const [clients, setClients] = useState([]); 
    const [component, setComponent] = useState("allClients"); //components to navigate
    const [checkedClients, setCheckedClients] = useState([]); 

    const upcomingWeekDatesFormatted = getUpcomingWeekFormatted();
    const pastWeekDatesFormatted = getWeekBeforeSunday();


    const getData = async () => {
        const data = await getDocument();
        
        data.forEach((doc) => {
            let currentClient = doc.data()
            currentClient.id = doc.id;
            setClients((prevClients) => [...prevClients, currentClient]);
        });       
    }
    
    React.useEffect(()=>{
        getData();
    },[])
    
    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const handleClientCheck = (client) => {
        if (checkedClients.includes(client)) {
            setCheckedClients(checkedClients.filter(c => c !== client));
        } else {
            setCheckedClients([...checkedClients, client]);
        }
    };

   
    const handleSubmit = async (event) => {
        event.preventDefault();

    // console.log(checkedClients)
        const updatedClients = checkedClients.map((checkedClient) => {
          switch (checkedClient.FRECUENCIA) {
              case "BI-WEEKLY":
                  checkedClient.nextDate = getClientNextDate(14,checkedClient.nextDate);
                  break;
              case "20 DAYS":
                  checkedClient.nextDate = getClientNextDate(20, checkedClient.nextDate);
                  break;
              case "MONTHLY":
                  checkedClient.nextDate = getClientNextDate(30, checkedClient.nextDate);
                  break;
              case "40 DAYS":
                  checkedClient.nextDate = getClientNextDate(40, checkedClient.nextDate);
                  break;
              default:
                  break;
          }
          return checkedClient;
      });

      updateClients(updatedClients);
    }


    if (component === 'allClients') {

        return (
            <div>
                <div className='nav-bar'>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('allClients')}>
                        Todos los Patios
                    </button>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('upcomingClients')}>
                        Proxima Semana
                    </button>
                    <button onClick={() => setComponent('thisWeekClients')}>
                        Esta Semana
                    </button>
                    <button>
                        <a href='/newClient'>Añadir Cliente</a>
                    </button>
                </div>

                <div class="list-labels-wrapper">
                    <h2 className='nombre'>Nombre</h2>
                    <h2 className='direccion'>Direccion</h2>
                    <h2 className='frecuencia'>Frecuencia</h2>
                    <h2 className='nextdate'>Proxima Fecha</h2>
                    <h2 className='telefono'>Telefono</h2>
                    <h2 className='pago'>Pago</h2>
                </div>

                <div className='client-wrapper'>
                {clients.map((client, index) => (
                    <Client key={index} {...client} />
                ))}</div>
                </div>
        )
    } else if (component === 'upcomingClients') {
        console.log(clients)

        return (
            <div>
                <div className='nav-bar'>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('allClients')}>
                        Todos los Patios
                    </button>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('upcomingClients')}>
                        Proxima Semana
                    </button>
                    <button onClick={() => setComponent('thisWeekClients')}>
                        Esta Semana
                    </button>
                    <button>
                        <a href='/newClient'>Añadir Cliente</a>
                    </button>

                <div>
                    {clients
                        .filter(client => upcomingWeekDatesFormatted.includes(client.nextDate))
                        .sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate))
                        .map((client, index) => (
                            <Client key={index} {...client} />
                        ))}
                </div>
            </div>
            </div>
        )
    } else if (component === 'thisWeekClients') {
        console.log(clients)

        return (
            <div>

                <div className='nav-bar'>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('allClients')}>
                        Todos los Patios
                    </button>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('upcomingClients')}>
                        Proxima Semana
                    </button>
                    <button onClick={() => setComponent('thisWeekClients')}>
                        Esta Semana
                    </button>
                    <button>
                        <a href='/newClient'>Añadir Cliente</a>
                    </button>
                </div>

                <div class="list-labels-wrapper">
                    <h2 className='nombre'>Nombre</h2>
                    <h2 className='direccion'>Direccion</h2>
                    <h2 className='frecuencia'>Frecuencia</h2>
                    <h2 className='nextdate'>Proxima Fecha</h2>
                    <h2 className='telefono'>Telefono</h2>
                    <h2 className='pago'>Pago</h2>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        {clients
                            .filter(client => pastWeekDatesFormatted.includes(client.nextDate))
                            .sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate))
                            .map((client, index) => {
                                return (
                                    <div key={index}>
                                        <label>Echo?</label>
                                        <input type='checkbox'
                                            checked={checkedClients.includes(client)}
                                            onChange={() => handleClientCheck(client)} />
                                        <Client key={index} {...client} />
                                    </div>
                                )
                            })}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Page;

