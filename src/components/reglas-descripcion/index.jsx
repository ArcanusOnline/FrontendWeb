import "./style.css";
import data from "../../assets/reglasDesc.json";

const ReglasDesc = () => {
  return (
    <>
      <div className="container">
        {data.cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-header">
              <h2 id={card.id}>{card.titulo}</h2>
              <button className="index-btn">
                <a href="#inicioReglas">Índice</a>
              </button>
            </div>

            <div className="card-body">
              {card.sections.map((section) => (
                <div className="card-section" key={section.id}>
                  {section.titulo && <h3 id={section.id}>{section.titulo}</h3>}

                  <div className="card-subsection">
                    {section.parrafos.map((p, i) => {
                      // Separar el índice del resto del texto usando un regex
                      const match = p.match(/^(\d+(\.\d+)*)(.*)$/);
                      // match[1] = índice, match[3] = resto del texto
                      return (
                        <p key={i}>
                          {match ? (
                            <>
                              <span className="indice">{match[1]}</span>
                              {match[3]}
                            </>
                          ) : (
                            p
                          )}
                        </p>
                      );
                    })}
                  </div>

                  <button className="index-btn">
                    <a href="#inicioReglas">Índice</a>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export { ReglasDesc };
