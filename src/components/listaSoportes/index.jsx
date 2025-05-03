import { obtenerSoportes } from "../../querys/scripts";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";

const ListadoSoporte = () => {
  const [listaSoporte, setListaSoporte] = useState([]);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  async function cargarSoporte() {
    navigate(``, {
      state: { listaSoporte },
    });
  }

  function formatDate(dateString) {
    const date = new Date(dateString); 
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0'); 
    const seconds = String(date.getSeconds()).padStart(2, '0'); 
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; 
  }

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token !== "") {
      async function obtenerDatos() {
        try {
          const data = await obtenerSoportes(token);
          if (!data.hasOwnProperty("message")) {
            setListaSoporte(data);
          } else {
            setError(data.message);
          }
        } catch (error) {
          console.error("Error al obtener soportes:", error);
          setError(
            "Ocurrió un error al obtener los soportes. Intente más tarde."
          );
        }
      }

      obtenerDatos();
    }
  }, []);

  return (
    <>
      <div className="listaSoporteContainer">
        <h1>Soportes</h1>
        {listaSoporte.length > 0 ? (
          <table className="soportes-table">
            <thead>
              <tr>
                <th>Ticket #</th>
                <th>Asunto</th>
                <th>Fecha creacion</th>
                <th>Estado</th>
                <th>Ultima Actividad</th>
              </tr>
            </thead>
            <tbody>
              {listaSoporte.map((elem) => (
                <tr key={elem.id}>
                  <td>{elem.id}</td>
                  <td>
                    <NavLink
                      to={`/panel-usuario/soporte?ticket=${elem.id}`}
                      state={{ datos: elem }}
                      className="linksSoportes"
                    >
                      {elem.asunto}
                    </NavLink>
                  </td>
                  <td>{formatDate(elem.fecha_alta)}</td>
                  <td>{elem.estado}</td>
                  <td>{formatDate(elem.fecha_cambio_estado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{error}</p>
        )}
      </div>
    </>
  );  
};

export { ListadoSoporte };
