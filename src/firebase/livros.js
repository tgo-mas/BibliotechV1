import {
    addDoc,
    doc,
    getDoc,
    getDocs, 
    updateDoc
} from "firebase/firestore";
import { livrosCollection } from "./collections";

export async function addLivro(data) {
    await addDoc(livrosCollection, data);
}

export async function getLivros() {
    const snapshot = await getDocs(livrosCollection);

    const livros = [];

    snapshot.forEach(livro => {
        livros.push({ ...livro.data(), id: livro.id });
    })

    return livros;
}

export async function getLivro(id) {
    const snapshot = await getDoc(doc(livrosCollection, id));
    return { ...snapshot.data(), id: snapshot.id };
}

export async function updateLivro(id, data) {
    await updateDoc(doc(livrosCollection, id), data);
}

export async function deleteLivro(id) {
    await updateDoc(doc(livrosCollection, id));
}
