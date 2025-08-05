import "./style.css";
import { obtenerRangosGms } from "../../querys/scripts";
import { useState, useEffect } from "react";
import staffDatos from "../../assets/staffTabla.json";

const StaffCard = () => {
  const [tablaRangos, setTablaRangos] = useState(staffDatos);
  const [tablaDioses, setTablaDioses] = useState([]);
  const [tablaSemiDioses, setTablaSemiDioses] = useState([]);
  const [tablaConsejeros, setConsejeros] = useState([]);

  useEffect(() => {
    async function obtenerDatos() {
      let data = await obtenerRangosGms();
      const dioses = data.tablaRangos
        .filter((elem) => elem.Privilegio === 3)
        .map((elem) => elem.NickB);

      setTablaDioses([
        {
          rango: "Dioses",
          users: dioses,
        },
      ]);
      const semidioses = data.tablaRangos
        .filter((elem) => elem.Privilegio === 2)
        .map((elem) => elem.NickB);

      setTablaSemiDioses([
        {
          rango: "Semi-Dioses",
          users: semidioses,
        },
      ]);
      const consejeros = data.tablaRangos
        .filter((elem) => elem.Privilegio === 1)
        .map((elem) => elem.NickB);

      setConsejeros([
        {
          rango: "Consejeros",
          users: consejeros,
        },
      ]);
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
              <ul key={ind}>
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
        {Array.isArray(tablaDioses) && tablaDioses.length > 0 ? (
          tablaDioses.map((elem, ind) => (
            <fieldset className="staffCuadro">
              <legend>{elem.rango}</legend>
              <ul key={ind}>
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
        {Array.isArray(tablaSemiDioses) && tablaSemiDioses.length > 0 ? (
          tablaSemiDioses.map((elem, ind) => (
            <fieldset className="staffCuadro">
              <legend>{elem.rango}</legend>
              <ul key={ind}>
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
        {Array.isArray(tablaConsejeros) && tablaConsejeros.length > 0 ? (
          tablaConsejeros.map((elem, ind) => (
            <fieldset className="staffCuadro">
              <legend>{elem.rango}</legend>
              <ul key={ind}>
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
