import { useState } from "react";
import { useNavigate } from "react-router";
import { registrarCuenta } from "../../querys/scripts";
import "./style.css";

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
  });

  const [mostrarPin, setMostrarPin] = useState(false);
  const [mostrarPw, setMostrarPw] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim().toLowerCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.NombreCuenta || !formData.Clave || !formData.Mail) {
      alert("Por favor completá los campos obligatorios.");
      return;
    }
    const dat = await registrarCuenta(formData);
    if (dat.estado === 1) {
      navigate("/");
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
      });
    }
  };

  return (
    <div className="registro-container">
      <h1 className="registro-title">Registrarse</h1>
      <form onSubmit={handleSubmit} className="registro-form">
        <input
          className="registro-input"
          type="text"
          name="NombreCuenta"
          placeholder="Nombre de cuenta"
          value={formData.NombreCuenta}
          onChange={handleChange}
          required
        />
        <div style={{ position: "relative" }}>
          <input
            className="registro-input"
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
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {mostrarPw ? "🙈" : "👁️"}
          </button>
        </div>
        <input
          className="registro-input"
          type="email"
          name="Mail"
          placeholder="Email"
          value={formData.Mail}
          onChange={handleChange}
          required
        />
        <input
          className="registro-input"
          type="text"
          name="Nombre"
          placeholder="Nombre"
          value={formData.Nombre}
          onChange={handleChange}
          required
        />
        <input
          className="registro-input"
          type="text"
          name="Apellido"
          placeholder="Apellido"
          value={formData.Apellido}
          onChange={handleChange}
          required
        />
        <input
          className="registro-input"
          type="text"
          name="Pais"
          placeholder="País"
          value={formData.Pais}
          onChange={handleChange}
          required
        />
        <input
          className="registro-input"
          type="text"
          name="Localidad"
          placeholder="Localidad"
          value={formData.Localidad}
          onChange={handleChange}
          required
        />
        <input
          className="registro-input"
          type="text"
          name="Provincia"
          placeholder="Provincia"
          value={formData.Provincia}
          onChange={handleChange}
          required
        />
        <input
          className="registro-input"
          type="date"
          name="FechaNacimiento"
          value={formData.FechaNacimiento}
          onChange={handleChange}
          required
        />
        <div style={{ position: "relative" }}>
          <input
            className="registro-input"
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
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {mostrarPin ? "🙈" : "👁️"}
          </button>
        </div>
        <button className="registro-btn" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export { RegisterPanel };
