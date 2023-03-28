import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut } from "firebase/auth";
import { auth } from "./config";

export async function cadastrarUsuario(email, senha){
    // Indicar p/ Firebase que será cadastrado novo usuário com email e senha.

    const resultado = await createUserWithEmailAndPassword(auth, email, senha);
    return resultado.user;
}

export async function loginGoogle(){
    const provider = new GoogleAuthProvider();
    const resultado = await signInWithPopup(auth, provider);
    return resultado.user;
}

export async function logout(){
    // Deslogar o usuário atual do firebase
    await signOut(auth);
}