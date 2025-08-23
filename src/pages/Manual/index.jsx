import { useState } from "react";
import "./style.css"; // Asegurate que este nombre coincida
import { traerInformacion } from "./informacion.jsx";
import manualJSON from "../../assets/indiceManual.json";

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
        {manualJSON.manual.map(({ section, topics }) => (
          <div key={section} className="manual-section-horizontal">
            <button
              onClick={() => handleSectionClick(section)}
              className="section-button"
            >
              {section}
            </button>
            {activeSection === section && (
              <div className="topic-list-horizontal">
                {topics.map((topic) => (
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
          <p className="manual-placeholder">{manualJSON.placeholder}</p>
        )}
      </div>
    </div>
  );
};

export { Manual };
