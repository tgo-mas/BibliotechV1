import { Outlet } from "react-router";
import { Menu } from "../../components/Menu/Menu";

export function Root() {
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