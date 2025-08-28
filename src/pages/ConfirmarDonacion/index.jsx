import { useParams } from "react-router";
import "./style.css";

const ConfirmarDonacion = () => {
  const { status } = useParams();
  return (
    <div className="confirm-donation-container">
      {status === "success" && (
        <div className="confirm-donation-text-container">
          <h1>✅ Pago exitoso</h1>
          <h2>Muchas gracias por aportar a Arcanus Online</h2>
        </div>
      )}
      {status === "failure" && (
        <div className="confirm-donation-text-container">
          <h1>❌ Pago rechazado</h1>
          <h2>
            Ocurrio un error al procesar el pago. <br></br> por favor, intentelo
            nuevamente
          </h2>
        </div>
      )}
      {status === "pending" && (
        <div className="confirm-donation-text-container">
          <h1>⏳ Pago pendiente</h1>
          <h2>Muchas gracias por aportar a Arcanus Online</h2>
        </div>
      )}
    </div>
  );
};

export { ConfirmarDonacion };
