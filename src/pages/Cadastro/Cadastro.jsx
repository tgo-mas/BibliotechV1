import { Button, Container, Form, FormText } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import { cadastrarUsuario, loginGoogle } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Cadastro() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    function onSubmit(data) {
        const { email, senha } = data;
        cadastrarUsuario(email, senha)
            .then((user) => {
                toast.success(`Bem-vindo(a) ${user.email}!`, {
                    position: "bottom-right",
                    duration: 2500
                })
                navigate("/");
            })
            .catch((error) => {
                toast.error(`Um erro aconteceu. Código: ${error.code}`, {
                    position: "bottom-right",
                    duration: 2500
                })
            })

    }

    function onLoginGoogle() {
        loginGoogle()
            .then((user) => {
                toast.success(`Bem-vindo(a) ${user.email}!`, {
                    position: "bottom-right",
                    duration: 2500
                })
                navigate("/");
            })
            .catch((error) => {
                toast.error(`Um erro aconteceu. Código: ${error.code}`, {
                    position: "bottom-right",
                    duration: 2500
                })
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
                        className={errors.email && "is-invalid"}
                        {...register("email", { required: "O email é obrigatório" })}
                    />
                    <FormText className="invalid-feedback">
                        {errors.email?.message};
                    </FormText>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Sua senha"
                        className={errors.senha && "is-invalid"}
                        {...register("senha", { required: "A senha é obrigatória" })}
                    />
                    <FormText className="invalid-feedback">
                        {errors.senha?.message};
                    </FormText>
                </Form.Group>
                <Button type="submit" variant="success">
                    Cadastrar
                </Button>
            </Form>
        </Container>
    );
}
