import { useRedireccionar } from "../../assets/functions";
const BotonRegresar = () => {
const redireccionar = useRedireccionar()

    return (
        <div className="botonRegresar">
            <button onClick={() => redireccionar("/")}>Regresar</button>
        </div>
    );
};

export { BotonRegresar };