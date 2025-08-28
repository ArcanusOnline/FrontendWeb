import "./style.css";
import { FormDonar } from "../../components";

const DonacionesPage = () => {
  return (
    <>
      <div className="donaciones">
        <div className="donaciones-container">
          <h1 className="donaciones-title">
            Ayudanos a que Arcanus Online crezca
          </h1>

          <p className="donaciones-subtitle">
            Arcanus es un proyecto que pudo surgir y se mantiene online gracias
            al aporte y trabajo voluntario de muchas personas, sin buscar ningun
            tipo de compensacion economica. Las donaciones tienen como objetivo
            ayudar a que Arcanus pueda ser un juego autosustentable, y que
            ustedes, los usuarios, puedan contar con un Argentum estable y de
            calidad
          </p>
        </div>
        <FormDonar></FormDonar>
      </div>
    </>
  );
};

export { DonacionesPage };
