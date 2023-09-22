import firebase_app from "../config";
import { getFirestore, setDoc, doc} from "firebase/firestore";
import clients from '../../public/csvjson.json'


export default async function addData() {
    const db = getFirestore(firebase_app);

    let y = 1
    // clients.forEach(async (client,y) => {
    //     const documentId = String(y);
    //     await setDoc(doc(db, "Clients", documentId), client);
    //     y++;
    //     console.log('success')
    // })


}