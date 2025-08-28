import { Link } from "react-router";
import { useState } from "react";
import { useRedireccionar } from "../../assets/functions.js";
import "./style.css";
import { generarDonacion } from "../../querys/scripts.js";

const FormDonar = () => {
  const [fields, setFields] = useState({ valor: "" });
  const [errorLog, setErrorLog] = useState("");
  const [error, setError] = useState(false);
  const redireccionar = useRedireccionar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fields.valor) {
      setError(true);
      setErrorLog("Por favor ingresa un monto");
      return;
    }

    const data = await generarDonacion(fields.valor);

    if (data.error == 1) {
      setError(true);
      setErrorLog(data.msg);
      return;
    }
    window.location.href = data.link;
  };

  return (
    <div className="form-container-form-donaciones">
      <form
        onSubmit={handleSubmit}
        className="form-content-form-donaciones"
        autoComplete="on"
      >
        <div className="form-text-container">
          <h2 className="form-title-form-donaciones">Ingresa tu Aporte</h2>
          <p className="donaciones-subtitle">
            Cualquier monto nos ayuda a seguir creciendo. Muchas gracias por
            sumar tu granito de arena a Arcanus Online
          </p>
        </div>
        <div className="form-field-form-donaciones">
          <label className="form-label-form-donaciones">Monto</label>
          <input
            type="number"
            name="valor"
            autoComplete="valor"
            className="form-input-form-donaciones"
            onChange={(e) => {
              setError(false);
              setFields({ valor: e.target.value });
            }}
            required
          />
        </div>
        {error && <p className="form-error-form-donaciones">{errorLog}</p>}

        <button type="submit" className="form-button-form-donaciones">
          Donar
        </button>
      </form>
    </div>
  );
};

export { FormDonar };
