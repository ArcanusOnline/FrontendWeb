import "./style.css";
import reglas from "../../assets/reglasIndice.json";
const ReglasIndice = () => {
  return (
    <>
      <div className="reglasTitles">
        <h2>{reglas.titulo}</h2>
        <h3>{reglas.subtitulo}</h3>
      </div>
      <h4 id="inicioReglas">Índice</h4>

      <ol className="custom-list">
        {reglas.items.map((item, index) => (
          <li key={index} className="main-item">
            <a href={`#${item.id}`}>{item.texto}</a>

            {item.subItems && (
              <ol>
                {item.subItems.map((sub, subIndex) => (
                  <li key={subIndex} className="sub-item">
                    <a href={`#${sub.id}`}>{sub.texto}</a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </>
  );
};

export { ReglasIndice };
