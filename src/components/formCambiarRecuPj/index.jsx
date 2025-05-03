import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { cambioPasswordRecuperoPersonaje } from "../../querys/scripts";

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
          navigate("/");
        }, 3000);
        return;
      }
      return;
    }
    setError("Las contraseñas no coinciden");
    return;
  }

  return (
    <>
      <form class="mmorpg-form" onSubmit={enviarPasswords}>
        <div class="mmorpg-form-group">
          <label for="newPassword" class="mmorpg-label">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            class="mmorpg-input"
            value={fields.newPassword}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, newPassword: e.target.value }));
            }}
            required
          />
        </div>

        <div class="mmorpg-form-group">
          <label for="repeatPassword" class="mmorpg-label">
            Repetir Contraseña:
          </label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            class="mmorpg-input"
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

        <button type="submit" class="mmorpg-button">
          Cambiar Contraseña
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export { FormularioCambiarPasswordRecuPersonaje };
