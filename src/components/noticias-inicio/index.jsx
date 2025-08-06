import { useRedireccionar } from "../../assets/functions";
import { useState, useEffect } from "react";
import { extraerNoticias } from "../../querys/scripts";
import { NavLink } from "react-router";
import "./style.css";

const NoticiasInicio = () => {
  const redireccionar = useRedireccionar();
  const [noticias, setNoticias] = useState(null);

  useEffect(() => {
    async function cargarNoticias() {
      const data = await extraerNoticias();
      setNoticias(data);
    }
    cargarNoticias();
  }, []);

  return (
    <div className="contenedor-lista-noticias-inicio">
      {Array.isArray(noticias) ? (
        noticias.length > 0 ? (
          noticias.slice(0, 3).map((elem) => (
            <div
              className="tarjeta-noticia-lista-noticias-inicio"
              key={elem.id}
            >
              <NavLink
                to={`/ver-informacion-completa-noticia/noticia?numero=${elem.id}`}
                state={{ datos: elem }}
                className="link-noticia-lista-noticias-inicio"
              >
                <h2 className="titulo-noticia-lista-noticias-inicio">
                  {elem.titulo}
                </h2>
              </NavLink>
              <p className="resumen-noticia-lista-noticias-inicio">
                {elem.cuerpo.slice(0, 200) + " ..."}
              </p>
              <span className="meta-noticia-lista-noticias-inicio">
                Fecha: {elem.fecha} Hora: {elem.hora} - Por: {elem.autor}
              </span>
            </div>
          ))
        ) : (
          <h1 className="mensaje-vacio-lista-noticias-inicio">
            Todavía no hay noticias
          </h1>
        )
      ) : (
        noticias?.message && (
          <h1 className="mensaje-vacio-lista-noticias-inicio">
            {noticias.message}
          </h1>
        )
      )}

      <button
        className="boton-vermas-lista-noticias-inicio"
        onClick={() => redireccionar("/noticias")}
      >
        Ver más noticias
      </button>
    </div>
  );
};

export { NoticiasInicio };
