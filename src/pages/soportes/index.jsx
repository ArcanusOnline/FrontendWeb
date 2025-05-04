import { ListadoSoporte } from "../../components"
import {Link} from "react-router"

const PaginaSoportes = () => {

    return(
        <>
        <div className="paginaSoporteContainer">
            <ListadoSoporte />
            <Link to="/panel-usuario/nuevoSoporte" className="botonNuevoSoporte">Nuevo Soporte</Link>
        </div>
        </>
    )
}

export {PaginaSoportes}