import { useState } from "react";
import { publicarPersonajeMAO } from "../../querys/scripts";
import { Modal } from "../../ui/Modales";
import { useAuth } from "../../useContext/useContext";
import "./style.css";

const PostearPersonajeMAO = ({
  visible,
  setVisible,
  nombreCuenta,
  personajes,
}) => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    accion: "",
    precio: "",
    moneda: "",
  });

  const [showResultModal, setShowResultModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Si cambia la acción, resetear precio y moneda
    if (field === "accion") {
      setFormData((prev) => ({ ...prev, precio: "", moneda: "" }));
    }
  };

  const handleCancelar = () => {
    setVisible(false);
    setFormData({
      nombre: "",
      accion: "",
      precio: "",
      moneda: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación para venta
    if (formData.accion === "venta") {
      if (!formData.precio || formData.precio <= 0) {
        setModalConfig({
          type: "error",
          message: "El precio debe ser mayor a 0.",
        });
        setShowResultModal(true);
        return;
      }
      if (!formData.moneda) {
        setModalConfig({
          type: "error",
          message: "Debes seleccionar un tipo de moneda.",
        });
        setShowResultModal(true);
        return;
      }
    }

    setIsLoading(true);

    try {
      const res = await publicarPersonajeMAO({
        nombre: formData.nombre,
        accion: formData.accion,
        precio: formData.precio,
        nombreCuenta,
        token,
      });

      // Cerrar formulario
      setVisible(false);

      // Mostrar modal de éxito
      setModalConfig({
        type: "success",
        message:
          res.message ||
          "Te enviamos un correo electrónico para confirmar la publicación.",
      });
      setShowResultModal(true);

      // Resetear formulario
      setFormData({
        nombre: "",
        accion: "",
        precio: "",
        moneda: "",
      });
    } catch (error) {
      console.error("Error al publicar:", error);

      // Cerrar formulario
      setVisible(false);

      // Mostrar modal de error
      setModalConfig({
        type: "error",
        message: error?.message || "Ocurrió un error al publicar el personaje.",
      });
      setShowResultModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
  };

  return (
    <>
      {/* Formulario */}
      {visible && (
        <div className="modal-overlay-postear-pj">
          <div className="modal-content-postear-pj">
            <form onSubmit={handleSubmit} className="form-wrapper">
              <h2 className="form-title">Publicar Personaje en MAO</h2>

              {/* Nombre del personaje */}
              <div className="form-field">
                <label htmlFor="nombre" className="form-label">
                  Personaje a publicar
                </label>
                <select
                  id="nombre"
                  name="nombre"
                  className="form-select"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  disabled={isLoading}
                  required
                >
                  <option value="">Seleccionar personaje...</option>
                  {personajes.map((p) => (
                    <option key={p.NickB} value={p.NickB}>
                      {p.NickB}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de operación */}
              <div className="form-field">
                <label htmlFor="accion" className="form-label">
                  Tipo de operación
                </label>
                <select
                  id="accion"
                  name="accion"
                  className="form-select"
                  value={formData.accion}
                  onChange={(e) => handleInputChange("accion", e.target.value)}
                  disabled={isLoading}
                  required
                >
                  <option value="">Seleccionar operación...</option>
                  <option value="venta">💰 Venta</option>
                  <option value="intercambio">🔄 Intercambio</option>
                </select>
              </div>

              {/* Moneda - Solo si es venta */}
              {formData.accion === "venta" && (
                <div className="form-field form-field-animate">
                  <label htmlFor="moneda" className="form-label">
                    Tipo de moneda
                  </label>
                  <select
                    id="moneda"
                    name="moneda"
                    className="form-select"
                    value={formData.moneda}
                    onChange={(e) =>
                      handleInputChange("moneda", e.target.value)
                    }
                    disabled={isLoading}
                    required
                  >
                    <option value="">Seleccionar moneda...</option>
                    <option value="oro">🪙 Oro (in-game)</option>
                    <option value="ars">💵 Dinero real (ARS)</option>
                  </select>
                </div>
              )}

              {/* Precio - Solo si es venta */}
              {formData.accion === "venta" && (
                <div className="form-field form-field-animate">
                  <label htmlFor="precio" className="form-label">
                    Precio
                  </label>
                  <input
                    id="precio"
                    type="number"
                    name="precio"
                    className="form-input"
                    value={formData.precio}
                    onChange={(e) =>
                      handleInputChange("precio", e.target.value)
                    }
                    placeholder="Ingresa el precio"
                    min="1"
                    disabled={isLoading}
                    required
                  />
                </div>
              )}

              {/* Botones */}
              <div className="form-buttons-postear-pj">
                <button
                  type="submit"
                  className="btn-publicar-pj"
                  disabled={isLoading}
                >
                  {isLoading ? "Publicando..." : "Publicar"}
                </button>
                <button
                  type="button"
                  className="btn-cancelar-postear-pj"
                  onClick={handleCancelar}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de resultado */}
      <Modal
        isOpen={showResultModal}
        type={modalConfig.type}
        title={
          modalConfig.type === "success"
            ? "¡Email enviado!"
            : modalConfig.type === "error"
              ? "Error"
              : "Advertencia"
        }
        message={modalConfig.message}
        onClose={handleCloseResultModal}
        buttonText="Entendido"
      />
    </>
  );
};

export { PostearPersonajeMAO };
