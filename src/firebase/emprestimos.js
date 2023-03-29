import {
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs, 
    updateDoc
} from "firebase/firestore";
import { emprestimosCollection } from "./collections";

export async function getEmprestimos(){
    const snapshot = await getDocs(emprestimosCollection);

    const emprestimos = [];

    snapshot.forEach(emprestimo => {
        emprestimos.push({ ...emprestimo.data(), id: emprestimo.id });
    })

    return emprestimos;
}

export async function addEmprestimo(data){
    await addDoc(emprestimosCollection, data);
}
