import { useEffect, useState } from "react";
import { Form, Button, Container, FloatingLabel } from "react-bootstrap";
import { getLivros, getLivro } from "../../firebase/livros";
import { getEmprestimo, updateEmprestimo } from "../../firebase/emprestimos";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export function EditarEmprestimo() {

    const [livros, setLivros] = useState([]);
    const navigator = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const { id } = useParams();

    function onSubmit(data) {
        getLivro(data.idLivro).then(livro => {
            delete data.idLivro;
            let emprestimo = { ...data, livro};
            updateEmprestimo(id, emprestimo).then(() => {
                toast.success(`Empréstimo editado com sucesso!`, {
                    position: "bottom-right",
                    duration: 2500
                });
                navigator("/emprestimos");
            })
        })
    }

    useEffect(() => {
        getLivros().then(resultados => setLivros(resultados))
        getEmprestimo(id).then(resultado => {
            resultado.idLivro = resultado.livro.id;
            reset(resultado);
        });
    }, [id, reset]);

    return (
        <Container className="p-3">
            <h1>Editar Empréstimo</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel
                    className="mb-3"
                    label="Leitor"
                >
                    <Form.Control
                        type="text"
                        className={errors.leitor && "is-invalid"}
                        {...register("leitor", {
                            required: "O campo Leitor é obrigatório!",
                            maxLength: { value: 255, message: "Tamanho máximo de 255 caracteres!" }
                        })}
                    />
                    <Form.Text className="invalid-feedback">
                        {errors.leitor?.message}
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3"
                    label="E-mail"
                >
                    <Form.Control
                        type="email"
                        className={errors.email && "is-invalid"}
                        {...register("email", {
                            required: "O campo email é obrigatório!",
                            maxLength: { value: 255, message: "Tamanho máximo de 255 caracteres!" }
                        })}
                    />
                    <Form.Text className="invalid-feedback">
                        {errors.email?.message}
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3"
                    label="Telefone"
                >
                    <Form.Control
                        type="tel"
                        className={errors.telefone && "is-invalid"}
                        {...register("telefone", {
                            required: "O campo telefone é obrigatório!",
                            maxLength: { value: 15, message: "Tamanho máximo de 15 caracteres!" }
                        })}
                    />
                    <Form.Text className="invalid-feedback">
                        {errors.telefone?.message}
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3"
                    label="Livro"
                >
                    <Form.Select
                        className={errors.livro && "is-invalid"}
                        {...register("idLivro", {
                            required: "O campo livro é obrigatório!",
                        })}>
                        {livros.map(livro => <option value={livro.id}>{livro.titulo}</option>)}
                    </Form.Select>
                    <Form.Text className="invalid-feedback">
                        {errors.livro?.message}
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3"
                    label="Status"
                >
                    <Form.Select
                        {...register("status")}
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Entregue">Entregue</option>
                    </Form.Select>
                    <Form.Text className="invalid-feedback">
                        {errors.status?.message}
                    </Form.Text>
                </FloatingLabel>
                <Button variant="success" type="submit">Salvar empréstimo</Button>
            </Form>
        </Container>
    );
}