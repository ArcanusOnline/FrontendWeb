import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { registrarCuenta } from "../../querys/scripts";
import ReCAPTCHA from "react-google-recaptcha"; // react-google-recaptcha wrapper
import "./style.css";
const recaptchaPublicKey = import.meta.env.VITE_RECAPTCHA_PUBLIC_KEY;

const RegisterPanel = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    NombreCuenta: "",
    Clave: "",
    Mail: "",
    Nombre: "",
    Apellido: "",
    Pais: "",
    Localidad: "",
    Provincia: "",
    FechaNacimiento: "",
    pin: "",
    captcha: "",
  });
  const [errorLog, setErrorLog] = useState("");
  const [error, setError] = useState(false);
  const [mostrarPin, setMostrarPin] = useState(false);
  const [mostrarPw, setMostrarPw] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(false);
    setFormData({ ...formData, [name]: value });
  };
  const handleCaptchaChange = (token) => {
    setFormData({ ...formData, captcha: token });
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!formData.NombreCuenta || !formData.Clave || !formData.Mail) {
      console.log("se setio el error");
      setError(true);
      setErrorLog("Por favor completá los campos obligatorios.");
      return;
    }
    if (!formData.captcha) {
      setError(true);
      setErrorLog("Por favor completa el reCAPTCHA.");
      return;
    }

    const dat = await registrarCuenta(formData);
    // handle errors
    if (dat.error) {
      // cuenta caracteres invalidos
      if (dat.message.includes("cuenta")) {
        setError(true);
        setErrorLog(
          `${dat.message}\nRecordá que el nombre de la cuenta no puede tener espacios`
        );
      }
      // pw invalid
      if (dat.message.includes("contraseña")) {
        setError(true);
        setErrorLog(
          `${dat.message}\nRecordá que la contraseña no puede tener espacios`
        );
      }
      // pin invalid
      if (dat.message.includes("pin")) {
        setError(true);
        setErrorLog(
          `${dat.message}\nRecordá que el pin no puede tener espacios`
        );
      }
      setError(true);
      setErrorLog(dat.message);
    }
    if (dat.estado === 1) {
      setMostrarMensaje(true);
      setMensajeConfirmacion(dat.message);
      setError(false);
      setErrorLog("");
      setFormData({
        NombreCuenta: "",
        Clave: "",
        Mail: "",
        Nombre: "",
        Apellido: "",
        Pais: "",
        Localidad: "",
        Provincia: "",
        FechaNacimiento: "",
        pin: "",
        captcha: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <>
      <div className="form-container-form-registrarse">
        <h1 className="form-title-form-registrarse">Registrarse</h1>
        <form onSubmit={handleSubmit} className="form-form-registrarse">
          <input
            className={`form-input-form-registrarse ${
              errorLog.includes(
                "El nombre de la cuenta contiene caracteres invalidos"
              )
                ? "input-error"
                : ""
            }`}
            type="text"
            name="NombreCuenta"
            placeholder="Nombre de cuenta"
            value={formData.NombreCuenta}
            onChange={handleChange}
            required
          />
          <div className="form-password-wrapper-form-registrarse">
            <input
              className={`form-input-form-registrarse ${
                errorLog.includes("contraseña") ? "input-error" : ""
              }`}
              type={mostrarPw ? "text" : "password"}
              name="Clave"
              placeholder="Clave"
              value={formData.Clave}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setMostrarPw((prev) => !prev)}
              className="toggle-btn-form-registrarse"
            >
              {mostrarPw ? "🙈" : "👁️"}
            </button>
          </div>
          <input
            className="form-input-form-registrarse"
            type="email"
            name="Mail"
            placeholder="Email"
            value={formData.Mail}
            onChange={handleChange}
            required
          />
          <input
            className="form-input-form-registrarse"
            type="text"
            name="Nombre"
            placeholder="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            required
          />
          <input
            className="form-input-form-registrarse"
            type="text"
            name="Apellido"
            placeholder="Apellido"
            value={formData.Apellido}
            onChange={handleChange}
            required
          />
          <input
            className="form-input-form-registrarse"
            type="text"
            name="Pais"
            placeholder="País"
            value={formData.Pais}
            onChange={handleChange}
            required
          />
          <input
            className="form-input-form-registrarse"
            type="text"
            name="Localidad"
            placeholder="Localidad"
            value={formData.Localidad}
            onChange={handleChange}
            required
          />
          <input
            className="form-input-form-registrarse"
            type="text"
            name="Provincia"
            placeholder="Provincia"
            value={formData.Provincia}
            onChange={handleChange}
            required
          />
          <input
            className="form-input-form-registrarse"
            type="date"
            name="FechaNacimiento"
            value={formData.FechaNacimiento}
            onChange={handleChange}
            required
          />
          <div className="form-password-wrapper-form-registrarse">
            <input
              className={`form-input-form-registrarse ${
                errorLog.includes("pin") ? "input-error" : ""
              }`}
              type={mostrarPin ? "text" : "password"}
              name="pin"
              placeholder="PIN"
              value={formData.pin}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setMostrarPin((prev) => !prev)}
              className="toggle-btn-form-registrarse"
            >
              {mostrarPin ? "🙈" : "👁️"}
            </button>
          </div>
          <ReCAPTCHA
            sitekey={recaptchaPublicKey}
            onChange={handleCaptchaChange}
          />
          {error && <p className="form-error-form-registro">{errorLog}</p>}
          <button className="form-btn-form-registrarse" type="submit">
            Registrarse
          </button>
          <p className="form-link-container-form-login">
            <Link to="/cuenta" className="form-link-form-login">
              ¿Ya tenes cuenta? Inicia sesion
            </Link>
          </p>
        </form>
      </div>
      {mostrarMensaje && (
        <div className="modal-overlay-mensaje-global">
          <div
            className="modal-mensaje-contenido"
            style={{ borderColor: "lightgreen" }}
          >
            <p style={{ color: "lightgreen" }}>{mensajeConfirmacion}</p>
          </div>
        </div>
      )}
    </>
  );
};

export { RegisterPanel };
