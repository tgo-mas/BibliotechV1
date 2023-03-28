import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    signOut } from "firebase/auth";
import { auth } from "./config";

export async function cadastrarUsuario(email, senha){
    const resultado = await createUserWithEmailAndPassword(auth, email, senha);
    return resultado.user;
}

export async function loginGoogle(){
    const provider = new GoogleAuthProvider();
    const resultado = await signInWithPopup(auth, provider);
    return resultado.user;
}

export async function loginUsuario(email, senha){
    const resultado = await signInWithEmailAndPassword(auth, email, senha);
    return resultado.user;
}

export async function logout(){
    // Deslogar o usuário atual do firebase
    await signOut(auth);
}