import { useRedireccionar } from "../../assets/functions";
import { useState, useEffect } from "react";
import { extraerNoticias } from "../../querys/scripts";

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
    <div className="noticiasInicio">
      {Array.isArray(noticias) ? (
        noticias.length > 0 ? (
          noticias.slice(0, 3).map((elem) => (
            <div className="noticias" key={elem.id}>
              <h2>{elem.titulo}</h2>
              <p>{elem.cuerpo}</p>
              <span>
                Autor: {elem.autor} Fecha: {elem.fecha}
              </span>
            </div>
          ))
        ) : (
          <h1>Todavía no hay noticias</h1>
        )
      ) : (
        noticias?.message && <h1>{noticias.message}</h1>
      )}

      <button onClick={() => redireccionar("/noticias")}>Ver más...</button>
    </div>
  );
};

export { NoticiasInicio };
