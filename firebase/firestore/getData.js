import firebase_app from "../config";
import { getFirestore, doc, getDocs, query, collection } from "firebase/firestore";


export default async function getDoument() {
    const db = await getFirestore(firebase_app)
    const q = query(collection(db, "Clients"));
    const querySnapshot = await getDocs(q);

    return querySnapshot;
}
