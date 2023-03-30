import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { addLivro, uploadCapaLivro } from "../../firebase/livros.js";

export function AdicionarLivro() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    function onSubmit(data){
        const imagem = data.imagem[0];
        if (imagem) {
            const toastId = toast.loading("Upload da imagem...", { position: "top-right" });
            uploadCapaLivro(imagem).then(url => {
                toast.dismiss(toastId);
                data.urlCapa = url;
                delete data.imagem;
                addLivro(data).then(() => {
                    toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
                    navigate("/livros");
                })
            })
        }
        else {
            delete data.imagem;
            addLivro(data).then(() => {
                toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
                navigate("/livros");
            })
        }
    }

    return (
        <Container className="p-3">
            <h1>Adicionar Livro</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel className="mb-3" label="Título" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        className={errors.titulo && "is-invalid"}
                        {...register("titulo", { required: "Título é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="text-danger">
                        {errors.titulo?.message}
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel className="mb-3" label="Autor" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        className={errors.autor && "is-invalid"}
                        {...register("autor", { required: "Autor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="text-danger">
                        {errors.autor?.message}
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel className="mb-3" label="Categoria" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        className={errors.categoria && "is-invalid"}
                        {...register("categoria", { required: "Categoria é obrigatória!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="text-danger">
                        {errors.categoria?.message}
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel className="mb-3" label="ISBN" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        className={errors.isbn && "is-invalid"}
                        {...register("isbn", { required: "ISBN é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}
                    />
                    <Form.Text className="text-danger">
                        {errors.isbn?.message}
                    </Form.Text>
                </FloatingLabel>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Imagem da capa</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif"
                        {...register("imagem")}                    
                    />
                </Form.Group>
                <Button type="submit" variant="success">Adicionar</Button>
            </Form>
        </Container>
    )
}