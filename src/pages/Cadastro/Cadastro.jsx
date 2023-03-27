import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import { useForm } from "react-hook-form";
import { loginGoogle } from "../../firebase/auth";

export function Cadastro() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        console.log(data);
    }

    function onLoginGoogle(){
        loginGoogle().then((user) => {
            console.log(user);
        })
    }

    return (
        <Container fluid className="my-5">
            <p className="text-center">
                <img src={logoIcon} width="256" alt="Logo do app" />
            </p>
            <h4>Faça parte da nossa plataforma</h4>
            <p className="text-muted">
                Já tem conta? <Link to="/login">Entre</Link>
            </p>
            <hr />
            <Button className="mb-3" variant="danger" onClick={onLoginGoogle}>
                <img src={googleIcon} width="32" alt="Logo do google" />
                Entrar com o Google
            </Button>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Seu email"
                        {...register("email", { required: "O email é obrigatório" })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Sua senha"
                        {...register("senha", { required: "A senha é obrigatória" })}
                    />
                </Form.Group>
                <Button type="submit" variant="success">
                    Cadastrar
                </Button>
            </Form>
        </Container>
    );
}
