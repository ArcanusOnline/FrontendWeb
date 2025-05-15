import { useState } from "react";
import "./style.css"; // Asegurate que este nombre coincida
import { traerInformacion } from "./informacion.jsx";

const manualStructure = {
  Comenzando: [
    "Clases sociales",
    "Habilidades",
    "Controles",
    "Razas y atributos",
    "Crear un personaje",
    "Comandos",
  ],
  "Lo Basico": [
    "Vida y muerte",
    "Comida y bebida",
    "Un jugador con honor",
    "Leyes",
    "Subir de nivel",
    "Centinela",
    "Skills",
    "Supervivencia",
  ],
  Dinero: ["Introduccion", "Comercio", "Comercio seguro", "Bancos"],
  Profesiones: ["Talador", "Pescador", "Herrero", "Minero", "Carpintero"],
  Equipamiento: [
    "Vestimentas",
    "Armaduras",
    "Pociones",
    "Armas",
    "Tunicas",
    "Cascos y escudos",
    "Items magicos",
    "Magias",
  ],
  Entrenamiento: ["Criaturas hostiles", "Party", "Domar animales"],
  Facciones: ["Armada Real", "Legion Oscura"],
  Mundo: ["Ciudades", "Dungeons", "Mapa"],
  Avanzado: ["Clanes", "Navegacion", "Comandos", "Retos"],
};

const Manual = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeTopic, setActiveTopic] = useState("");

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
  };

  return (
    <div className="manual-container-column">
      <div className="manual-navbar-horizontal">
        {Object.keys(manualStructure).map((section) => (
          <div key={section} className="manual-section-horizontal">
            <button
              onClick={() => handleSectionClick(section)}
              className="section-button"
            >
              {section}
            </button>
            {activeSection === section && (
              <div className="topic-list-horizontal">
                {manualStructure[section].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicClick(topic)}
                    className="topic-button"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="manual-content">
        {activeTopic ? (
          <div>
            <h2 className="manual-title">{activeTopic}</h2>
            <div className="manual-text">{traerInformacion(activeTopic)}</div>
          </div>
        ) : (
          <p className="manual-placeholder">
            ✅ Arcanus Online Arcanus es un mundo más cercano a un meta-verso
            que a un videojuego, un espacio virtual donde podés compartir
            experiencias profundas con otros usuarios y ser parte de una
            historia para siempre. ¿Un videojuego o un programa de oficina
            medieval? La estética asusta, pero la jugabilidad gusta. Arcanus no
            es ostentoso en su presentación visual, se trata de un programa
            rústico que permite ingresar a un mundo orientado a lo
            medieval-fantástico, con bestias a las que eliminar, personajes con
            los que agruparse o luchar e impresionantes ciudades que parecen
            salidas de un libro lleno de magia y epicidad al mejor estilo
            Tolkien. Lo curioso es que el grueso de los jugadores parecen
            ignorar el aspecto mítico del juego para centrarse en la parte
            social: Ahí es donde se acerca un elfo con un báculo engarzado en la
            mano y te pregunta con la cortesía que le queda: "¿Qué onda perri,
            en qué andás?" Algo interesante de este videojuego - si se lo puede
            llamar video-juego a sabiendas de que parece más un estilo de
            video-vida - es la facilidad que provee para comunicarse entre
            usuarios, basta con presionar enter para escribir lo que quieras y
            volver a presionar enter para que el texto se sitúe sobre la cabeza
            del personaje, como podrán notar a continuación en el contexto de la
            invasión de bestias a la ciudad sur-portuaria de Nix. Arcanus no
            solo destaca por su facilidad para establecer vínculos entre los
            jugadores sino también por su libre sistema de combate pvp, basado
            en la habilidad manual con características mixtas de shooter,
            estrategia en tiempo real y role play. Lo cierto es que es difícil
            encasillar la mecánica de combate en un género preexistente dado que
            tiene aspectos marcadamente propios que al menos, el humilde autor
            de este artículo, no vio en ningún otro lado. Una vez mencionado el
            símil red-social que se genera, la particular mecánica de pvp que
            posee y la estética chocante que lo caracteriza, hay un tema más que
            debería mencionar para hacer justicia a la realidad: Es un juego con
            un marcado mercado alcista. El fenómeno económico de Arcanus
            coquetea con establecerse en la historia como uno de los primeros
            meta-versos donde todo tiene un valor pecuniario. Esto se dio de
            manera natural dado que el mercado del juego permite comprar,
            intercambiar y vender objetos o personajes libremente entre
            usuarios, lo cual derivó rápidamente en ofertas por dinero real y en
            grupos de jugadores que se dedican a producir los activos de mayor
            valor para venderlos a quienes no tienen el tiempo para conseguirlos
            por sus propios medios.
          </p>
        )}
      </div>
    </div>
  );
};

export { Manual };
