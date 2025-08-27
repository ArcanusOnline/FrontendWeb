import { useState } from "react";
import { listarPersonajes } from "../../querys/scripts";

const ListarPersonajes = () => {
  let [visible, setVisible] = useState(false);
  let [email, setEmail] = useState("");
  let [error, setError] = useState(false);
  let [success, setSucces] = useState("");
  let [succsesMsg, setSuccesMsg] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");

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
    setSucces(false);
    setError(false);
    e.preventDefault();
    try {
      let response = await listarPersonajes(email);

      if (response.error == 0) {
        setSucces(true);
        setSuccesMsg("Se envio un email con el listado");
      } else {
        setError(true);
        setErrorMsg(response.message);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMsg("Error al enviar la solicitud");
    }
  }

  return (
    <>
      <div className="miniStatsContainer">
        <button onClick={cambioarVisibilidad}>
          Listar tus<br></br>Personajes
        </button>
        <form
          id="formStats"
          style={estadoForm}
          onSubmit={setDatos}
          className="miniStats-subform"
        >
          <fieldset>
            <label htmlFor="email">Ingresa el Email</label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              onInput={(e) => {
                setEmail(e.target.value);
              }}
            />

            {error && <p className="error-message">{errorMsg}</p>}
            {success && <p className="sucess-message">{succsesMsg}</p>}
            <input type="submit" value="Buscar" />
          </fieldset>
        </form>
      </div>
    </>
  );
};

export { ListarPersonajes };
