import { CalculadoraClases } from "../../components";

const CalculadoraVida = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          gap: "10px",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "3.5rem" }}>
          Calculadora de vida
        </h1>
        <CalculadoraClases />
      </div>
    </>
  );
};

export { CalculadoraVida };
