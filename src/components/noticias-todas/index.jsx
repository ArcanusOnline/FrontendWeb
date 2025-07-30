import { useState, useEffect } from "react";
import { extraerNoticias } from "../../querys/scripts";
import { NavLink } from "react-router";
import "./style.css";
const NoticiasCompletas = () => {
  const [noticias, setNoticias] = useState(null);

  useEffect(() => {
    async function cargarNoticias() {
      let data = await extraerNoticias();
      setNoticias(data);
    }
    cargarNoticias();
  }, []);

  return (
    <div className="contenedor-lista-todas-las-noticias">
      {Array.isArray(noticias) ? (
        noticias.length > 0 ? (
          noticias.map((elem) => (
            <div
              className="tarjeta-noticia-lista-todas-las-noticias"
              key={elem.id}
            >
              <NavLink
                to={`/ver-informacion-completa-noticia/noticia?numero=${elem.id}`}
                state={{ datos: elem }}
                className="link-noticia-lista-todas-las-noticias"
              >
                <h2 className="titulo-noticia-lista-todas-las-noticias">
                  {elem.titulo}
                </h2>
              </NavLink>
              <p className="cuerpo-noticia-lista-todas-las-noticias">
                {elem.cuerpo}
              </p>
              <span className="meta-noticia-lista-todas-las-noticias">
                Fecha: {elem.fecha} Hora: {elem.hora} - Por: {elem.autor}
              </span>
            </div>
          ))
        ) : (
          <h1 className="mensaje-vacio-lista-todas-las-noticias">
            Todavía no hay noticias
          </h1>
        )
      ) : (
        noticias?.message && (
          <h1 className="mensaje-vacio-lista-todas-las-noticias">
            {noticias.message}
          </h1>
        )
      )}
    </div>
  );
};

export { NoticiasCompletas };
