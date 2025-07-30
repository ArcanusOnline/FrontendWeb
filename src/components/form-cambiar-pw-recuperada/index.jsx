import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { cambioPasswordRecupero } from "../../querys/scripts";
import "./style.css";

const FormularioCambiarPasswordRecu = () => {
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

    const data = await cambioPasswordRecupero(fields, token);
    setError(data.message);

    if (data.estado === 200) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <form
      className="form-container-form-cambiar-pw-recu"
      onSubmit={enviarPasswords}
    >
      <h2 className="form-title-form-cambiar-pw-recu">
        Restablecer Contraseña
      </h2>

      <div className="form-field-form-cambiar-pw-recu">
        <label
          htmlFor="newPassword"
          className="form-label-form-cambiar-pw-recu"
        >
          Nueva Contraseña:
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="form-input-form-cambiar-pw-recu"
          value={fields.newPassword}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, newPassword: e.target.value }));
            setError("");
          }}
          required
        />
      </div>

      <div className="form-field-form-cambiar-pw-recu">
        <label
          htmlFor="repeatPassword"
          className="form-label-form-cambiar-pw-recu"
        >
          Repetir Contraseña:
        </label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          className="form-input-form-cambiar-pw-recu"
          value={fields.confirmPassword}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, confirmPassword: e.target.value }));
            setError("");
          }}
          required
        />
      </div>

      {error && <p className="form-error-form-cambiar-pw-recu">{error}</p>}

      <button type="submit" className="form-button-form-cambiar-pw-recu">
        Cambiar Contraseña
      </button>
    </form>
  );
};

export { FormularioCambiarPasswordRecu };
