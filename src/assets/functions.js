import { useNavigate, useLocation } from "react-router";

function useRedireccionar() {
  const navigate = useNavigate();
  const location = useLocation();

  const redireccionar = (ruta, guardarOrigen = false) => {
    if (guardarOrigen) {
      navigate(`${ruta}?redirect=${encodeURIComponent(location.pathname)}`);
    } else {
      navigate(ruta);
    }
  };

  return redireccionar;
}

function colorBanderin(data) {
  if (data.EjercitoCaosB === 1) {
    return "rgb(141, 5, 5)"; // Rojo Caos
  } else if (data.EjercitoRealB === 1) {
    return "rgb(26, 194, 216)"; // Celeste Real
  } else if (data.PromedioB < 0) {
    return "rgb(255, 0, 0)"; // Reputación negativa
  } else {
    return "rgb(0, 130, 220)"; // Neutro
  }
}

export { useRedireccionar, colorBanderin };
