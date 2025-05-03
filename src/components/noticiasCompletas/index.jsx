import { useState, useEffect } from "react";
import { extraerNoticias } from "../../querys/scripts";

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
    <div className="noticiasCompletas">
      {Array.isArray(noticias) ? (
        noticias.length > 0 ? (
          noticias.map((elem) => (
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
    </div>
  );
};

export { NoticiasCompletas };
