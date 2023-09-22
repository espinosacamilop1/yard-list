'use client'
import React, { useState, useEffect} from 'react'
import { useAuthContext } from "../../context/AuthContect";
import { useRouter } from "next/navigation";
import getDocument from "../../../firebase/firestore/getData"
import { getWeekBeforeSunday, getUpcomingWeekFormatted, getClientNextDate } from '../../scripts/functions.js'
import Client from '../Client';
import updateClients from '../../../firebase/firestore/updateClients';

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
                <div>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('allClients')}>
                        Todos los Patios
                    </button>
                    <button style={{ marginRight: '12px' }} onClick={() => setComponent('upcomingClients')}>
                        Esta Semana
                    </button>
                    <button onClick={() => setComponent('thisWeekClients')}>
                        Semana Pasada
                    </button>
                </div>
                {clients.map((client, index) => (
                    <Client key={index} {...client} />
                ))}</div>
        )
    } else if (component === 'upcomingClients') {
        return (
            <div>
                <button style={{ marginRight: '12px' }} onClick={() => setComponent('allClients')}>
                    Todos los Patios
                </button>
                <button style={{ marginRight: '12px' }} onClick={() => setComponent('upcomingClients')}>
                    Esta Semana
                </button>
                <button onClick={() => setComponent('thisWeekClients')}>
                    Semana Pasada
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
        )
    } else if (component === 'thisWeekClients') {
        return (
            <div>
                <button style={{ marginRight: '12px' }} onClick={() => setComponent('allClients')}>
                    Todos los Patios
                </button>
                <button style={{ marginRight: '12px' }} onClick={() => setComponent('upcomingClients')}>
                    Esta Semana
                </button>
                <button onClick={() => setComponent('thisWeekClients')}>
                    Semana Pasada
                </button>

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

