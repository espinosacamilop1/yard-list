import {getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebase_app from "../config";


export default async function deleteClient(client) {
    const db = getFirestore(firebase_app);

    await deleteDoc(doc(db, "Clients", client.id));
    window.location.reload();


}