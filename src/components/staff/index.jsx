import "./style.css";
import { obtenerRangosGms } from "../../querys/scripts";
import { useState, useEffect } from "react";

const StaffCard = () => {
  const [tablaRangos, setTablaRangos] = useState([
    {
      rango: "Directores",
      users: ["Gonzalo (Aygron)", "Tomás (Nitherem)", "Brian (Naerib)"],
    },
    {
      rango: "Programacion del Juego",
      users: ["Gonzalo (Aygron)", "Axel", "Tomás (Nitherem)", "Brian (Naerib)"],
    },
    {
      rango: "Desarrollo Web",
      users: ["Brian (Naerib)", "Santiago (Sket)"],
    },
    { rango: "Diseño", users: ["Tomas (Beli)"] },
    { rango: "Semi-Dioses", users: [] },
    { rango: "Dioses", users: [] },
    { rango: "Consejeros", users: [] },
  ]);

  useEffect(() => {
    async function obtenerDatos() {
      let data = await obtenerRangosGms();
      console.log(data);
    }
    obtenerDatos();
  }, []);

  return (
    <>
      <div className="lista-staff">
        <h1>Staff</h1>
        {Array.isArray(tablaRangos) && tablaRangos.length > 0 ? (
          tablaRangos.map((elem, ind) => (
            <fieldset className="staffCuadro">
              <legend>{elem.rango}</legend>
              <ul>
                {elem.users.length > 0 ? (
                  elem.users.map((user, index) => <li key={index}>{user}</li>)
                ) : (
                  <li>Sin datos</li>
                )}
              </ul>
            </fieldset>
          ))
        ) : (
          <p>Sin info</p>
        )}
      </div>
    </>
  );
};

export { StaffCard };
