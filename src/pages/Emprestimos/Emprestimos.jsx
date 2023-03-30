import { Link } from "react-router-dom";
import { Button, Table, Badge, Container } from "react-bootstrap"
import { useEffect, useState } from "react";
import { getEmprestimos } from "../../firebase/emprestimos";
import { Loader } from "../../components/Loader/Loader";

export function Emprestimos() {

    const [emprestimos, setEmprestimos] = useState([]);

    useEffect(() => {
        getEmprestimos().then(dados => {
            setEmprestimos(dados);
        })
    }, [])

    return (
        <Container className="p-3" hover>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Empréstimos</h1>
                <Button as={Link} variant="success" to="/emprestimos/adicionar" type="success">Adicionar empréstimo</Button>
            </div>
            {emprestimos === null ?
                <Loader />
                :
                <Table>
                    <thead>
                        <tr>
                            <th>Leitor</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Livro</th>
                            <th>Data do Empréstimo</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emprestimos.map((item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.leitor}</td>
                                    <td>{item.email}</td>
                                    <td>{item.telefone}</td>
                                    <td>{item.livro.titulo}</td>
                                    <td>{item.dataEmprestimo.toDate().toLocaleDateString("pt-br")}</td>
                                    <td>
                                        <Badge bg={item.status === "Pendente" ? "warning" : "success"}>{item.status}</Badge>
                                    </td>
                                    <td>
                                        <Button
                                            as={Link}
                                            to={`/emprestimos/editar/${item.id}`}
                                            variant="warning"
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </Table>}
        </Container>
    )
}