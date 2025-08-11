import { useNavigate } from "react-router";

function useRedireccionar() {
  const navigate = useNavigate();

  const redireccionar = (ruta) => {
    navigate(ruta);
  };

  return redireccionar;
}

export { useRedireccionar };
