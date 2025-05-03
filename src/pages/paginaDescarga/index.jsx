import { useEffect } from "react";
import { comenzarDescarga } from "../../querys/scripts";

const PaginaDescarga = () => {
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
          await comenzarDescarga();
        }, 3000);
    
        return () => clearTimeout(timeoutId);
      }, []);

  return (
    <div className="containerDescargaPage">
      <h1>Su descarga comenzara pronto...</h1>
    </div>
  );
};

export { PaginaDescarga };