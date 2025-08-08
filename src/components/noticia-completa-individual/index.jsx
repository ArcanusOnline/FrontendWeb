import { useLocation } from "react-router";
import { useRedireccionar } from "../../assets/functions";
import "./style.css";
const NoticiaIndividual = () => {
  const redireccionar = useRedireccionar();
  const location = useLocation().state;
  const data = location?.datos;
  const previusPath = location?.prevPath;
  return (
    <div className="contenedor-noticia-completa">
      {data ? (
        <div className="tarjeta-noticia-noticia-completa" key={data.id}>
          <h2 className="titulo-noticia-completa">{data.titulo}</h2>
          <p className="resumen-noticia-completa">{data.cuerpo}</p>
          <hr className="divisor-noticia-completa" />
          <div
            className="cuerpo-completo-noticia-completa"
            dangerouslySetInnerHTML={{ __html: data.cuerpoCompleto }}
          ></div>
          <div className="contenedor">
            <span className="autor-noticia-completa">
              Autor: {data.autor} | Fecha: {data.fecha}
            </span>
            <button
              className="return-button"
              onClick={() => redireccionar(previusPath)}
            >
              Volver
            </button>
          </div>
        </div>
      ) : location?.datos?.message ? (
        <h1 className="mensaje-error-noticia-completa">
          {location.datos.message}
        </h1>
      ) : (
        <h1 className="mensaje-error-noticia-completa">
          Todavía no hay noticias
        </h1>
      )}
    </div>
  );
};

export { NoticiaIndividual };
