import { useEffect, useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { getLivros, getLivro } from "../../firebase/livros";
import { useForm } from "react-hook-form";
import { addEmprestimo } from "../../firebase/emprestimos";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export function AdicionarEmprestimo() {

    const [livros, setLivros] = useState([]);
    const navigator = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    function onSubmit(data) {
        getLivro(data.idLivro).then(livro => {
            delete data.idLivro;
            let emprestimo = {...data, status: "Pendente", livro, dataEmprestimo: new Date()};
            addEmprestimo(emprestimo).then(() => {
                toast.success(`Empréstimo salvo com sucesso!`, {
                    position: "bottom-right",
                    duration: 2500
                });
                navigator("/emprestimos")
            })
        })
    }

    useEffect(() => {
        getLivros().then(resultados => setLivros(resultados))
    }, []);

    return (
        <div>
            <h1>Adicionar Empréstimo</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel
                    label="Leitor"
                    controlId="leitor"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        className={errors.leitor && "is-invalid"}
                        placeholder="leitor"
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
                    label="E-mail"
                    controlId="email"
                    className="mb-3"
                >
                    <Form.Control
                        type="email"
                        className={errors.email && "is-invalid"}
                        placeholder="email"
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
                    label="Telefone"
                    controlId="telefone"
                    className="mb-3"
                >
                    <Form.Control
                        type="tel"
                        className={errors.telefone && "is-invalid"}
                        placeholder="telefone"
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
                    label="Livro"
                    controlId="livro"
                    className="mb-3"
                >
                    <Form.Select
                        className={errors.livro && "is-invalid"}
                        placeholder="livro"
                        {...register("idLivro", {
                            required: "O campo livro é obrigatório!",
                        })}>
                        {livros.map(livro => <option value={livro.id}>{livro.titulo}</option>)}
                    </Form.Select>
                    <Form.Text className="invalid-feedback">
                        {errors.livro?.message}
                    </Form.Text>
                </FloatingLabel>
                <Button variant="success" type="submit">Salvar empréstimo</Button>
            </Form>
        </div>
    );
}