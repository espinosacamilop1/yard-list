import firebase_app from "../config";
import { getFirestore, setDoc, doc} from "firebase/firestore";
import clients from '../../public/csvjson.json'


export default async function addData(client) {
    try {
        const db = getFirestore(firebase_app);
    
        const timestamp = new Date().getTime();
        const documentId = timestamp.toString();
    
        await setDoc(doc(db, 'Clients', documentId), client);
    
        // Document added successfully
        console.log('Document added successfully');
        
        // You can also return a success message if needed
        return 'Document added successfully';
      } catch (error) {
        // Handle errors here
        console.error('Error adding document:', error);
    
        // You can return an error message or throw the error if needed
        throw error;
      }
    

}