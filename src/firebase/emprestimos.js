import {
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs, 
    updateDoc
} from "firebase/firestore";
import { emprestimosCollection } from "./collections";

export async function addEmprestimo(data){
    await addDoc(emprestimosCollection, data);
}
