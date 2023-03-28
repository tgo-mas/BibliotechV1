import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";

export function Root() {

  const logado = useContext(AuthContext);

  if(!logado){
    return <Navigate to="/login"/>;
  }

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}