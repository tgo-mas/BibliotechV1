import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpLKGOKc5KoS5Y-zwn8MFcwy9Ar95x7eA",
  authDomain: "bibliotech-tgo.firebaseapp.com",
  projectId: "bibliotech-tgo",
  storageBucket: "bibliotech-tgo.appspot.com",
  messagingSenderId: "144612093012",
  appId: "1:144612093012:web:a26a4447575bf8dde891c1"
};

// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);

const app = initializeApp(firebaseConfig);