import { useLocation } from "react-router";
import "./style.css";
const NoticiaIndividual = () => {
  const location = useLocation().state;
  const data = location?.datos;

  return (
    <div className="noticiasInicio">
      {data ? (
        <div className="noticias" key={data.id}>
          <h2>{data.titulo}</h2>
          <p>{data.cuerpo}</p>
          <hr className="divisorNoticia" />
          <p>{data.cuerpoCompleto}</p>
          <span>
            Autor: {data.autor} Fecha: {data.fecha}
          </span>
        </div>
      ) : location?.datos?.message ? (
        <h1>{location.datos.message}</h1>
      ) : (
        <h1>Todavía no hay noticias</h1>
      )}
    </div>
  );
};

export { NoticiaIndividual };
