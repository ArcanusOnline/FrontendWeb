import "./style.css";

const StaffCard = () => {
  return (
    <>
      <div className="lista-staff">
        <h1>Staff</h1>
        <fieldset className="staffCuadro">
          <legend>Adquisición</legend>
          <ul>
            <li>Pato (Valherie)</li>
          </ul>
        </fieldset>
        <fieldset className="staffCuadro">
          <legend>Programacion</legend>
          <ul>
            <li>Aygron</li>
            <li>Nitherem</li>
            <li>xSelket</li>
            <li>NaeriB</li>
          </ul>
        </fieldset>
        <fieldset className="staffCuadro">
          <legend>Web</legend>
          <ul>
            <li>Nitherem</li>
            <li>NaeriB</li>
          </ul>
        </fieldset>
      </div>
    </>
  );
};

export { StaffCard };
