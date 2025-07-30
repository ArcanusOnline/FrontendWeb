import { useState } from "react";
import { showMiniStats } from "../../querys/scripts";
import { useNavigate } from "react-router";

const MiniStats = () => {
  let [visible, setVisible] = useState(false);
  let [nick, setNick] = useState("");
  let [error, setError] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const estadoForm = {
    display: !visible ? "none" : "block",
  };

  const estadoError = {
    display: !error ? "none" : "block",
  };

  function cambioarVisibilidad() {
    setVisible(!visible);
  }

  async function setDatos(e) {
    e.preventDefault();
    let response = await showMiniStats(nick);
    if (
      response.message == "No se encontro el personaje" ||
      response.message == "Por favor ingrese un nick valido" ||
      response.state == false
    ) {
      setErrorMsg(response.message);
      setError(!error);
      return;
    } else {
      setError(!error);
      navigate("/ver-personaje", { state: { response } });
      return;
    }
  }

  return (
    <>
      <div className="miniStatsContainer">
        <button onClick={cambioarVisibilidad}>
          Mini<br></br>Estadisticas
        </button>
        <form
          id="formStats"
          style={estadoForm}
          onSubmit={setDatos}
          className="miniStats-subform"
        >
          <fieldset>
            <legend>Buscar personaje</legend>

            <label htmlFor="nick">Nick</label>
            <input
              type="text"
              placeholder="Nick"
              id="nick"
              name="nick"
              onInput={(e) => {
                setNick(e.target.value);
                setErrorMsg("");
              }}
            />

            {errorMsg && <p className="error-message">{errorMsg}</p>}

            <input type="submit" value="Ver" />
          </fieldset>
        </form>
      </div>
    </>
  );
};

export { MiniStats };
