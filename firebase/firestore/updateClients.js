import firebase_app from "../config";
import { getFirestore, updateDoc, doc} from "firebase/firestore";


export default async function updateClients(clients) {
    const db = getFirestore(firebase_app);

    clients.forEach(async (client) => {
        const clientRef = doc(db, "Clients", client.id);
        await updateDoc(clientRef, {
            NOMBRE : client.NOMBRE,
            DIRECCION : client.DIRECCION,
            FRECUENCIA : client.FRECUENCIA,
            PAGO : client.PAGO,
            TELEFONO : client.TELEFONO,
            nextDate : client.nextDate
          });
    });

}