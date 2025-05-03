import { ListadoSoporte } from "../../components"

const PaginaSoportes = () => {

    return(
        <>
        <div className="paginaSoporteContainer">
            <ListadoSoporte />
            <button>Nuevo Soporte</button>
        </div>
        </>
    )
}

export {PaginaSoportes}