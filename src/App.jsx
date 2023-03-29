import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { AdicionarLivro } from "./pages/AdicionarLivro/AdicionarLivro";
import { Livros } from "./pages/Livros/Livros"
import { EditarLivro } from "./pages/EditarLivro/EditarLivro";

export function App() {

    const [logado, setLogado] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLogado(user);
        })
    }, []);

    return (
        <>
            <AuthContext.Provider value={logado}>
                <div><Toaster /></div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Root />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/livros" element={<Livros />} />
                            <Route path="/livros/adicionar" element={<AdicionarLivro />} />
                            <Route path="/livros/editar/:id" element={<EditarLivro />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        </>
    );
}