import { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { getLivro, updateLivro } from "../../firebase/livros.js";

export function EditarLivro() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const { id } = useParams();

    const navigate = useNavigate();

    function onSubmit(data){
        updateLivro(id, data)
            .then(() => {
                toast.success(`${data.titulo} editado com sucesso!`, {
                    position: "bottom-right",
                    duration: 2500
                });
                navigate("/livros");
            });
    }

    useEffect(() => {
        getLivro(id).then(livro => {
            reset(livro);
        })
    }, [id, reset])

    return (
        <Container>
            <h1>Adicionar Livro</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.titulo && "is-invalid"}
                        {...register("titulo", { required: "Título é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="text-danger">
                        {errors.titulo?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.autor && "is-invalid"}
                        {...register("autor", { required: "Autor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="text-danger">
                        {errors.autor?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.categoria && "is-invalid"}
                        {...register("categoria", { required: "Categoria é obrigatória!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="text-danger">
                        {errors.categoria?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.isbn && "is-invalid"}
                        {...register("isbn", { required: "ISBN é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="text-danger">
                        {errors.isbn?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Imagem da capa</Form.Label>
                    <Form.Control
                        type="url"
                        className={errors.urlCapa && "is-invalid"}
                        {...register("urlCapa", { required: "O endereço da capa é obrigatório!" })}
                    />
                    <Form.Text className="text-danger">
                        {errors.urlCapa?.message}
                    </Form.Text>
                </Form.Group>
                <Button type="submit" variant="success">Salvar</Button>
            </Form>
        </Container>
    )
}