import { Spinner } from "react-bootstrap"

export function Loader() {
    return (
        <div className="display-flex justify-content-center align-items-center">
            <Spinner variant="success" />
            <h5>Carregando...</h5>
        </div>
    )
}