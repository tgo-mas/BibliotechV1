import { addDoc, getDocs } from "firebase/firestore";
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