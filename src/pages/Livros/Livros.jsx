import { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { getLivros, deleteLivro, getLivro } from "../../firebase/livros";

export function Livros() {

    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const buscar = async () => {
            const busca = await getLivros();
            setLivros(busca);
        }
        buscar();
    }, []);

    function removeLivro(id, titulo) {
        const confirma = window.confirm(`Tem certeza que deseja excluir o livro ${titulo}?`);
        if (confirma) {
            deleteLivro(id)
            toast.success(`${titulo} removido com sucesso!`, {
                position: "bottom-right",
                duration: 2500
            });
        } else {
            toast.error(`Operação cancelada!`, {
                position: "bottom-right",
                duration: 2500
            })
        }
    }

    return (
        <div className="livros">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Livros</h1>
                    <Button as={Link} to="/livros/adicionar" variant="success">
                        Adicionar Livro
                    </Button>
                </div>
                <hr />
                <Table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Categoria</th>
                            <th>ISBN</th>
                            <th>Capa</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => {
                            return (
                                <tr key={livro.id}>
                                    <td>{livro.titulo}</td>
                                    <td>{livro.autor}</td>
                                    <td>{livro.categoria}</td>
                                    <td>{livro.isbn}</td>
                                    <td><img style={{ width: '100px' }} src={livro.urlCapa} alt={livro.titulo} /></td>
                                    <td>
                                        <Button
                                            variant="success"
                                            title="Editar"
                                            as={Link}
                                            to={`/livros/editar/${livro.id}`}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                        <Button
                                            onClick={() => removeLivro(livro.id, livro.titulo)}
                                            variant="danger"
                                            title="Excluir"
                                        >
                                            <i className="bi bi-trash3-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}