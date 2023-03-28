import "./Menu.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { toast } from "react-hot-toast";

export function Menu() {

    const navigate = useNavigate();

    function onLogout() {
        logout().then(() => {
            toast.success(`Volte sempre! Deslogado com sucesso.`, {
                position: "bottom-right",
                duration: 2500
            })
            navigate("/login");
        });
    }
    
    return (
        <Navbar bg="success" variant="light" expand="lg">
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/">
                        <img src={logoIcon} width="32" alt="Logo" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link onClick={onLogout}>
                            <i className="bi bi-box-arrow-right"></i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}