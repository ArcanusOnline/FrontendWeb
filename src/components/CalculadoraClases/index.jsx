import { useState } from "react";
import head1 from "/heads/1.png";
import head2 from "/heads/65.png";
import head3 from "/heads/97.png";
import head4 from "/heads/161.png";
import head5 from "/heads/129.png";
import { obtenerPromedio } from "../../assets/calculadoraVida";

const CalculadoraClases = () => {
  const [selectedRaza, setSelectedRaza] = useState("Humano");
  const [selectedClass, setSelectedClass] = useState("Asesino");
  const [promedio, setPromedio] = useState(0);
  const [totalVida, setTotalVida] = useState(0);
  const [vida, setVida] = useState(0);
  const [nivel, setNivel] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState("");
  const [promedioPersonaje, setPromedioPersonaje] = useState("");
  const [dataPersonaje, setDataPersonaje] = useState("");
  const [vidaPromedio, setvidaPromedio] = useState("");
  const [promedioReal, setPromedioReal] = useState("");

  const razas = [
    { nombre: "Humano", img: head1 },
    { nombre: "Elfo", img: head2 },
    { nombre: "Elfo Oscuro", img: head3 },
    { nombre: "Enano", img: head4 },
    { nombre: "Gnomo", img: head5 },
  ];

  function obtenerVidaPromedio() {
    const nuevoPromedio = obtenerPromedio(selectedClass, selectedRaza);
    const nuevoTotalVida = (vida - 20) / (nivel - 1);

    if (nivel >= 1 && nivel <= 47 && vida >= 15 && vida <= 550) {
      if (nuevoTotalVida >= nuevoPromedio) {
        setDataPersonaje(
          `${selectedClass} ${selectedRaza} nivel ${nivel} con ${vida} de vida`
        );
        setPromedioPersonaje(
          `El promedio de vida de tu personaje es ${(
            (vida - 20) /
            (nivel - 1)
          ).toFixed(1)}`
        );
        setMostrarResultado(
          `¡¡FELICITACIONES!! Tu vida supera la vida de un personaje normal de tu raza, clase y nivel!`
        );
        setvidaPromedio(
          `Tu personaje deberia tener ${(
            nuevoPromedio * (nivel - 1) +
            20
          ).toFixed(0)} de vida para estar en el promedio justo.`
        );
        setPromedioReal(
          `El promedio de vida que deberías tener es ${nuevoPromedio}`
        );
      } else {
        setMostrarResultado(
          `¡¡NO TE DESANIMES!! Tu vida está por debajo del promedio pero con un buen entrenamiento y un poco de suerte podrás alcanzar un mejor promedio.`
        );
        setPromedioReal(
          `El promedio de vida que deberías tener es ${nuevoPromedio}`
        );
        setDataPersonaje(
          `${selectedClass} ${selectedRaza} nivel ${nivel} con ${vida} de vida`
        );
        setPromedioPersonaje(
          `El promedio de vida de tu personaje es ${(
            (vida - 20) /
            (nivel - 1)
          ).toFixed(1)}`
        );
        setvidaPromedio(
          `Tu personaje deberia tener ${(
            nuevoPromedio * (nivel - 1) +
            20
          ).toFixed(0)} de vida para estar en el promedio justo.`
        );
      }
    } else {
      alert("Por favor ingrese datos válidos");
    }

    // Actualiza el estado después, sin depender de él para la lógica
    setPromedio(nuevoPromedio);
    setTotalVida(nuevoTotalVida);
  }

  return (
    <div>
      <div className="textoPromedio">
        <p>{dataPersonaje}</p>
        <p>{promedioPersonaje}</p>
        <p>{promedioReal}</p>
        <p>{vidaPromedio}</p>
        <p>{mostrarResultado}</p>
      </div>

      <div className="containerCalculadoraSeleccion">
        {/* RAZAS */}
        <div className="razas-container">
          <div className="titulo">Elegí tu Raza</div>
          {razas.map((raza) => (
            <label
              key={raza.nombre}
              className={`opcion ${
                selectedRaza === raza.nombre ? "seleccionado" : ""
              }`}
            >
              <input
                type="radio"
                name="raza"
                value={raza.nombre}
                checked={selectedRaza === raza.nombre}
                onChange={(e) => setSelectedRaza(e.target.value)}
              />
              <img src={raza.img} alt={"imagen"} className="raza-img" />
              <span>{raza.nombre}</span>
            </label>
          ))}
        </div>

        {/* CLASES */}
        <div className="clases-container">
          <div className="clases-titulo">Elegí tu Clase</div>
          <div>
            {[
              "Asesino",
              "Bardo",
              "Clerigo",
              "Paladin",
              "Carpintero",
              "Leñador",
              "Minero",
            ].map((clase) => (
              <label
                key={clase}
                className={`opcion ${
                  selectedClass === clase ? "seleccionado" : ""
                }`}
              >
                <input
                  type="radio"
                  name="clase"
                  value={clase}
                  checked={selectedClass === clase}
                  onChange={(e) => setSelectedClass(e.target.value)}
                />
                {clase}
              </label>
            ))}
          </div>

          <div>
            {[
              "Guerrero",
              "Mago",
              "Druida",
              "Cazador",
              "Ladron",
              "Pescador",
              "Pirata",
              "Herrero",
            ].map((clase) => (
              <label
                key={clase}
                className={`opcion ${
                  selectedClass === clase ? "seleccionado" : ""
                }`}
              >
                <input
                  type="radio"
                  name="clase"
                  value={clase}
                  checked={selectedClass === clase}
                  onChange={(e) => setSelectedClass(e.target.value)}
                />
                {clase}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="contenedorEntradasVida">
        <label>Vida:</label>
        <input
          type="number"
          name="vida"
          id="vida"
          min="1"
          max="500"
          onChange={(e) => setVida(e.target.value)}
        />

        <label>Nivel:</label>
        <input
          type="number"
          name="nivel"
          id="nivel"
          min="1"
          max="47"
          onChange={(e) => setNivel(e.target.value)}
        />

        <input type="submit" value="Calcular" onClick={obtenerVidaPromedio} />
      </div>
    </div>
  );
};

export { CalculadoraClases };
