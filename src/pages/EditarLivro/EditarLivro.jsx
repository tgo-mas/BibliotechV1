import { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { getLivro, updateLivro, uploadCapaLivro } from "../../firebase/livros.js";

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
        const imagem = data.imagem[0];
        if(imagem) {
            const toastId = toast.loading("Upload da imagem...", {position: "top-right"});
            uploadCapaLivro(imagem).then(url => {
                toast.dismiss(toastId);
                data.urlCapa = url;
                delete data.imagem;
                updateLivro(id, data).then(() => {
                    toast.success("Livro editado com sucesso!", {duration: 2000, position: "bottom-right"})
                    navigate("/livros");
                })
            })
        }
        else {
            delete data.imagem;
            updateLivro(id, data).then(() => {
                toast.success("Livro editado com sucesso!", {duration: 2000, position: "bottom-right"})
                navigate("/livros");
            })
        }
        
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
                <Form.Group className="mb-3" controlId="titulo">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.titulo && "is-invalid"}
                        {...register("titulo", { required: "Título é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="invalid-feedback">
                        {errors.titulo?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="autor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.autor && "is-invalid"}
                        {...register("autor", { required: "Autor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="invalid-feedback">
                        {errors.autor?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="categoria">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.categoria && "is-invalid"}
                        {...register("categoria", { required: "Categoria é obrigatória!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="invalid-feedback">
                        {errors.categoria?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="isbn">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.isbn && "is-invalid"}
                        {...register("isbn", { required: "ISBN é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="invalid-feedback">
                        {errors.isbn?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="url">
                    <Form.Label>Imagem da capa</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".jpg,.png,.jpeg,.gif"
                        {...register("imagem", { required: "A imagem da capa é obrigatória!" })}
                    />
                </Form.Group>
                <Button type="submit" variant="success">Salvar</Button>
            </Form>
        </Container>
    )
}