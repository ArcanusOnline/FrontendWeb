import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { cambioPasswordRecuperoPersonaje } from "../../querys/scripts";
import "./style.css"

const FormularioCambiarPasswordRecuPersonaje = () => {
  let [fields, setFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();
  let [error, setError] = useState("");

  let { token } = useParams();

  async function enviarPasswords(e) {
    e.preventDefault();
    if (fields.newPassword === fields.confirmPassword) {
      let data = await cambioPasswordRecuperoPersonaje(fields, token);
      setError(data.message);
      if (data.estado === 200) {
        setTimeout(() => {
          navigate("/"); // Redirige al usuario después de 3 segundos
        }, 3000);
        return;
      }
      return;
    } else {
      setError("Las contraseñas no coinciden");
      return;
    }
  }

  return (
    <>
      <form className="mmorpg-form" onSubmit={enviarPasswords}>
        <div className="mmorpg-form-group">
          <label htmlFor="newPassword" className="mmorpg-label">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="mmorpg-input"
            value={fields.newPassword}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, newPassword: e.target.value }));
            }}
            required
          />
        </div>

        <div className="mmorpg-form-group">
          <label htmlFor="repeatPassword" className="mmorpg-label">
            Repetir Contraseña:
          </label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            className="mmorpg-input"
            value={fields.confirmPassword}
            onChange={(e) => {
              setFields((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }));
            }}
            required
          />
        </div>

        <button type="submit" className="mmorpg-button">
          Cambiar Contraseña
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export { FormularioCambiarPasswordRecuPersonaje };
