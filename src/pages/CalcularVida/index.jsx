import { CalculadoraDeVida } from "../../components";
import "./style.css";

const CalculadoraVida = () => {
  return (
    <>
      <div className="calculadora-vida-container">
        <h1 className="calculadora-vida-title">Calculadora de vida</h1>
        <div className="calculadora-vida-content">
          <CalculadoraDeVida />
        </div>
      </div>
    </>
  );
};

export { CalculadoraVida };
