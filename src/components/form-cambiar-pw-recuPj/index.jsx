import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { cambioPasswordRecuperoPersonaje } from "../../querys/scripts";
import "./style.css";

const FormularioCambiarPasswordRecuPersonaje = () => {
  const [fields, setFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const enviarPasswords = async (e) => {
    e.preventDefault();
    if (fields.newPassword !== fields.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const data = await cambioPasswordRecuperoPersonaje(fields, token);
    setError(data.message);

    if (data.estado === 200) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <form
      className="form-container-cambiar-pw-pj-recu"
      onSubmit={enviarPasswords}
    >
      <h2 className="form-title-cambiar-pw-pj-recu">
        Restablecer Contraseña del Personaje
      </h2>

      <div className="form-field-cambiar-pw-pj-recu">
        <label htmlFor="newPassword" className="form-label-cambiar-pw-pj-recu">
          Nueva Contraseña:
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="form-input-cambiar-pw-pj-recu"
          value={fields.newPassword}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, newPassword: e.target.value }));
            setError("");
          }}
          required
        />
      </div>

      <div className="form-field-cambiar-pw-pj-recu">
        <label
          htmlFor="repeatPassword"
          className="form-label-cambiar-pw-pj-recu"
        >
          Repetir Contraseña:
        </label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          className="form-input-cambiar-pw-pj-recu"
          value={fields.confirmPassword}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, confirmPassword: e.target.value }));
            setError("");
          }}
          required
        />
      </div>

      {error && <p className="form-error-cambiar-pw-pj-recu">{error}</p>}

      <button type="submit" className="form-button-cambiar-pw-pj-recu">
        Cambiar Contraseña
      </button>
    </form>
  );
};

export { FormularioCambiarPasswordRecuPersonaje };
